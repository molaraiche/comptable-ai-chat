# Comptable AI Chat 🇲🇦

Open-source chat interface for AI-powered Moroccan accounting assistant. Supports French and Arabic. Built with Next.js.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black.svg)
![CI/CD](https://github.com/molaraiche/comptable-ai-chat/workflows/CI%2FCD%20Pipeline/badge.svg)

## ✨ Features

- 🤖 **AI-Powered Responses** - Intelligent accounting assistance based on Moroccan regulations
- 🌍 **Bilingual Support** - Full support for French and Arabic with automatic RTL detection
- 🎨 **Moroccan Design** - Beautiful UI inspired by Moroccan colors (emerald green & gold)
- 💾 **Persistent History** - Chat history saved locally in browser
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ✨ **Rich Text Formatting** - Markdown support for styled responses (bold, lists, code blocks)
- 🚀 **Fast & Modern** - Built with Next.js 15 and Tailwind CSS v4

## 🎯 Use Cases

Perfect for:
- Moroccan accountants seeking quick answers
- Business owners with tax questions
- Students learning Moroccan accounting
- Anyone needing help with Moroccan fiscal regulations

## 📚 Data Sources

This assistant is based on:
- **Loi de Finances 2026** - Latest Moroccan finance law
- **Plan Comptable Marocain** - Moroccan accounting standards

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/molaraiche/comptable-ai-chat.git
   cd comptable-ai-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/webhook/ask
```

The application will use this environment variable to connect to your AI backend.

### Expected API Format

**Request:**
```json
{
  "question": "Comment calculer la TVA au Maroc ?"
}
```

**Response:**
Plain text or JSON with `response`, `answer`, or `message` field.

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Markdown:** react-markdown
- **Icons:** Heroicons (inline SVG)

## 📁 Project Structure

```
comptable-ai-chat/
├── app/
│   ├── page.tsx          # Main chat interface
│   ├── layout.tsx        # Root layout with metadata
│   ├── globals.css       # Global styles
│   └── icon.svg          # Favicon
├── ideas/                # Additional documentation
├── public/               # Static assets
└── README.md            # This file
```

## 🎨 Design System

### Colors
- **Primary:** Emerald Green (#047857, #059669)
- **Accent:** Gold/Amber (#fbbf24, #f59e0b)
- **Background:** Soft gradients (slate → emerald → amber)

### Typography
- **Font:** Inter (Google Fonts)
- **Arabic Support:** Full RTL with proper rendering

## 🌟 Key Features Explained

### Bilingual Chat
Type in French or Arabic - the interface automatically detects the language and adjusts text direction (RTL for Arabic).

### Markdown Support
AI responses support rich formatting:
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- Numbered lists with `1. 2. 3.`
- Bullet lists with `- item`
- Code blocks with `` `code` ``

### Persistent History
Chat conversations are saved in browser localStorage and automatically restored on page refresh.

### Clear History
Click the trash icon in the header to clear all conversation history (with confirmation modal).

## 📱 Responsive Design

- **Mobile:** Optimized touch targets, compact layout
- **Tablet:** Balanced spacing and readability
- **Desktop:** Full-width experience with max-width constraint

## 🚀 Deployment

### Automated CI/CD

This project includes automated CI/CD with GitHub Actions:

- ✅ **Automatic deployment** to Vercel on push to master
- ✅ **Preview deployments** for pull requests
- ✅ **Automated testing** and linting
- ✅ **Code quality checks**

See [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md) for setup instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/molaraiche/comptable-ai-chat)

1. Click the button above
2. Connect your GitHub account
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Manual Deployment

#### Build for Production

```bash
npm run build
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created with ❤️ by [Molaraiche](https://molaraiche.com/)

## 🐛 Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/molaraiche/comptable-ai-chat/issues).

## 📞 Support

For questions or support, please visit [molaraiche.com](https://molaraiche.com/)

---

**Note:** This is a beta version. Features and functionality may change.

## � Acknowledgments

- Based on **Loi de Finances 2026** and **Plan Comptable Marocain**
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

Made with 🇲🇦 for Moroccan accountants
