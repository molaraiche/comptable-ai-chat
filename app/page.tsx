'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const EXAMPLE_QUESTIONS = [
  "Comment calculer la TVA au Maroc ?",
  "Quelles sont les obligations fiscales d'une SARL ?",
  "Quelle est la différence entre l'IS et l'IR ?"
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState<number>(3);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('comptable-ai-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading messages from localStorage:', error);
        }
      }
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('comptable-ai-dark-mode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }

    // Check remaining questions on mount
    checkRemainingQuestions();
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('comptable-ai-dark-mode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check remaining questions
  const checkRemainingQuestions = async () => {
    try {
      const response = await fetch('/api/check-limit');
      const data = await response.json();
      setRemainingQuestions(data.remaining);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error checking limit:', error);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('comptable-ai-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectRTL = (text: string): boolean => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  const clearHistory = () => {
    setShowClearModal(true);
  };

  const confirmClearHistory = () => {
    setMessages([]);
    localStorage.removeItem('comptable-ai-messages');
    setShowClearModal(false);
  };

  const cancelClearHistory = () => {
    setShowClearModal(false);
  };

  const handleSend = async (questionText?: string) => {
    const question = questionText || input.trim();
    if (!question || isLoading) return;

    // Check rate limit first
    try {
      const limitCheck = await fetch('/api/check-limit', { method: 'POST' });
      const limitData = await limitCheck.json();
      
      if (!limitData.allowed) {
        setShowLimitModal(true);
        return;
      }
      
      setRemainingQuestions(limitData.remaining);
    } catch (error) {
      console.error('Error checking limit:', error);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'YOUR_API_ENDPOINT_HERE';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON or plain text
      const contentType = response.headers.get('content-type');
      let responseText = '';
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        responseText = data.response || data.answer || data.message || 'Désolé, je n\'ai pas pu traiter votre demande.';
      } else {
        // Handle plain text response
        responseText = await response.text();
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', error);
      }
      
      let errorText = 'Désolé, une erreur s\'est produite. ';
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorText += 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
      } else if (error instanceof Error) {
        errorText += 'Veuillez réessayer.';
      } else {
        errorText += 'Veuillez réessayer.';
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20'
    } flex flex-col`}>
      {/* Clear History Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-emerald-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-emerald-200 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">Effacer l'historique</h3>
                <p className="text-sm text-emerald-600">Cette action est irréversible</p>
              </div>
            </div>
            
            <p className="text-emerald-800 mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir effacer tout l'historique des conversations ? Toutes vos questions et réponses seront définitivement supprimées.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={cancelClearHistory}
                className="flex-1 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl transition-colors border-2 border-emerald-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmClearHistory}
                className="flex-1 px-4 py-3 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-emerald-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-amber-200 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">Limite atteinte</h3>
                <p className="text-sm text-amber-600">Version de test</p>
              </div>
            </div>
            
            <p className="text-emerald-800 mb-4 leading-relaxed">
              Vous avez atteint la limite de <strong>3 questions</strong> pour cette session de test.
            </p>
            
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800">
                💡 <strong>Astuce :</strong> Cette limitation est temporaire pour la version bêta. Contactez-nous pour un accès complet.
              </p>
            </div>
            
            <button
              onClick={() => setShowLimitModal(false)}
              className="w-full px-4 py-3 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`backdrop-blur-md border-b shadow-sm sticky top-0 z-10 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/80 border-emerald-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>
                Comptable AI
              </h1>
              <p className={`text-xs transition-colors ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Assistant Comptable Marocain
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Delete Button */}
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-emerald-300 hover:text-emerald-200 hover:bg-gray-800'
                    : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50'
                }`}
                title="Effacer l'historique"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden md:inline">Effacer</span>
              </button>
            )}

            {/* Questions Remaining Badge */}
            <div 
              className={`relative group flex items-center gap-1.5 px-2 sm:px-3 py-1.5 border-2 rounded-lg transition-colors cursor-help ${
                isDarkMode
                  ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-amber-600'
                  : 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200'
              }`}
              title="Questions restantes"
            >
              <svg className="w-4 h-4 text-amber-600 sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                {remainingQuestions}/3
              </span>
              
              {/* Tooltip */}
              <div className={`absolute top-full right-0 mt-2 px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-100 border border-gray-700'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}>
                <div className="font-medium mb-1">Questions restantes : {remainingQuestions}/3</div>
                <div className="text-xs opacity-75">Réinitialisation dans 72h</div>
                {/* Arrow */}
                <div className={`absolute -top-1 right-4 w-2 h-2 rotate-45 ${
                  isDarkMode ? 'bg-gray-800 border-l border-t border-gray-700' : 'bg-white border-l border-t border-gray-200'
                }`}></div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-amber-400' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
              title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 overflow-hidden flex flex-col pb-20">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>
                  Bienvenue sur Comptable AI
                </h2>
                <p className={`max-w-md transition-colors ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  Votre assistant comptable intelligent basé sur le Plan Comptable Marocain
                </p>
              </div>

              <div className="w-full max-w-2xl space-y-3">
                <p className={`text-sm font-medium text-center transition-colors ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                  Questions suggérées :
                </p>
                <div className="grid gap-3">
                  {EXAMPLE_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className={`p-4 border-2 rounded-xl text-left transition-all duration-200 shadow-sm hover:shadow-md group ${
                        isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-750 border-gray-700 hover:border-emerald-600'
                          : 'bg-white hover:bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isDarkMode
                            ? 'bg-gray-700 group-hover:bg-gray-600'
                            : 'bg-emerald-100 group-hover:bg-emerald-200'
                        }`}>
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className={`font-medium transition-colors ${isDarkMode ? 'text-emerald-100' : 'text-emerald-900'}`}>
                          {question}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-slide-up ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600'
                      : 'bg-gradient-to-br from-emerald-600 to-emerald-700'
                  }`}>
                    {message.sender === 'user' ? (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md transition-colors ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-white text-emerald-900 border border-emerald-100'
                    }`}
                    dir={detectRTL(message.text) ? 'rtl' : 'ltr'}
                  >
                    {message.sender === 'user' ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      <div className="text-sm leading-relaxed prose prose-sm prose-emerald max-w-none">
                        <ReactMarkdown
                          components={{
                            // Customize markdown rendering
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-emerald-800">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="ml-2">{children}</li>,
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-emerald-800">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-emerald-800">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-emerald-800">{children}</h3>,
                            code: ({ children }) => <code className="bg-emerald-50 px-1 py-0.5 rounded text-emerald-700 font-mono text-xs">{children}</code>,
                            pre: ({ children }) => <pre className="bg-emerald-50 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
                            blockquote: ({ children }) => <blockquote className="border-l-4 border-emerald-300 pl-3 italic my-2">{children}</blockquote>,
                            a: ({ href, children }) => <a href={href} className="text-emerald-600 hover:text-emerald-700 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-slide-up">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className={`backdrop-blur-md border-2 rounded-2xl shadow-lg p-4 transition-colors ${
          isDarkMode
            ? 'bg-gray-900/95 border-gray-700'
            : 'bg-white/80 border-emerald-200'
        }`}>
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question en français ou en arabe... اطرح سؤالك"
              className={`flex-1 resize-none bg-transparent border-none outline-none text-sm max-h-32 transition-colors ${
                isDarkMode
                  ? 'text-gray-100 placeholder-gray-500'
                  : 'text-emerald-900 placeholder-emerald-400'
              }`}
              rows={1}
              disabled={isLoading}
              dir="auto"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className={`text-xs text-center mt-4 px-4 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-emerald-600'}`}>
          Basé sur le Plan Comptable Marocain et la Loi de Finances
        </p>
      </main>

      {/* Footer */}
      <footer className={`backdrop-blur-md border-t mt-auto transition-colors ${
        isDarkMode
          ? 'bg-gray-900/95 border-gray-700'
          : 'bg-white/80 border-emerald-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Left: Beta + Copyright */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold rounded-full shadow-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                BÊTA
              </span>
              <span className={`hidden sm:inline transition-colors ${isDarkMode ? 'text-gray-500' : 'text-emerald-600'}`}>|</span>
              <a
                href="https://molaraiche.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium hover:underline hidden sm:inline transition-colors ${
                  isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
                }`}
              >
                © {new Date().getFullYear()} Molaraiche
              </a>
            </div>

            {/* Center: Sources */}
            <div className="flex items-center gap-2">
              <span className={`font-medium hidden md:inline transition-colors ${isDarkMode ? 'text-gray-400' : 'text-emerald-600'}`}>
                Sources:
              </span>
              <a
                href="https://drive.google.com/file/d/1C0XIL0RHSO_QBZHrSiu2SlFWh8jJ_r2M/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-emerald-400'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                }`}
                title="Loi de Finances 2026"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">LF 2026</span>
              </a>
              <a
                href="https://drive.google.com/file/d/1_HKe8QAXyls5QLqpV7YKaJT7H3P-fi5O/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-emerald-400'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                }`}
                title="Plan Comptable Marocain"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">PCM</span>
              </a>
            </div>

            {/* Right: Mobile Copyright */}
            <a
              href="https://molaraiche.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-medium hover:underline sm:hidden transition-colors ${
                isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              © Molaraiche
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
