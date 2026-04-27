# Contributing to Comptable AI Chat

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/comptable-ai-chat.git
   cd comptable-ai-chat
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/molaraiche/comptable-ai-chat.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create environment file**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### 1. Create a Feature Branch

```bash
# Update your main branch
git checkout master
git pull upstream master

# Create a new branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run all checks
npm run validate

# Individual checks
npm run lint          # Check code style
npm run lint:fix      # Auto-fix style issues
npm run type-check    # Check TypeScript types
npm run build         # Test production build
```

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve RTL text alignment issue"
git commit -m "docs: update installation instructions"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill in the PR template
5. Submit the PR

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Use functional components with hooks
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Use template literals for string interpolation

**Good:**
```typescript
const handleClick = () => {
  console.log('Clicked');
};

const message = `Hello, ${name}!`;
```

**Bad:**
```typescript
function handleClick() {
  console.log('Clicked');
}

var message = 'Hello, ' + name + '!';
```

### React Components

- One component per file
- Use descriptive component names
- Extract reusable logic into custom hooks
- Keep components small and focused

**Good:**
```typescript
export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="message">
      {message.text}
    </div>
  );
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Group related classes together
- Use responsive modifiers consistently
- Extract repeated patterns into components

**Good:**
```typescript
<button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">
  Submit
</button>
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test:

- ✅ Desktop browsers (Chrome, Firefox, Safari)
- ✅ Mobile browsers (iOS Safari, Chrome)
- ✅ Dark mode (if applicable)
- ✅ RTL text (Arabic)
- ✅ Keyboard navigation
- ✅ Screen reader compatibility

### Automated Testing

```bash
# Run all checks
npm run validate

# Check for console statements
grep -r "console\." app/
```

## 📚 Documentation

### When to Update Documentation

Update documentation when you:

- Add new features
- Change existing functionality
- Add new configuration options
- Update dependencies
- Change deployment process

### Documentation Files

- `README.md` - Main project documentation
- `.github/CI_CD_GUIDE.md` - CI/CD pipeline guide
- `.github/CONTRIBUTING.md` - This file
- Code comments - Complex logic explanation

## 🐛 Bug Reports

### Before Submitting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version
4. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Before Submitting

1. Check existing feature requests
2. Ensure it aligns with project goals
3. Consider implementation complexity

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features.

**Additional context**
Any other relevant information.
```

## 🔍 Code Review Process

### What We Look For

- ✅ Code quality and readability
- ✅ Adherence to style guidelines
- ✅ Proper error handling
- ✅ Performance considerations
- ✅ Security best practices
- ✅ Documentation updates
- ✅ Test coverage

### Review Timeline

- Initial review: Within 2-3 days
- Follow-up reviews: Within 1-2 days
- Merge: After approval and CI passes

## 🎯 Priority Areas

We especially welcome contributions in:

- 🌍 Internationalization improvements
- ♿ Accessibility enhancements
- 📱 Mobile experience optimization
- 🎨 UI/UX improvements
- 📚 Documentation
- 🐛 Bug fixes
- ⚡ Performance optimizations

## 🚫 What Not to Do

- Don't commit directly to master
- Don't include unrelated changes
- Don't commit sensitive data
- Don't ignore CI failures
- Don't skip documentation updates
- Don't use offensive language

## 📞 Getting Help

Need help? Here's how to reach us:

- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 📧 Email: [contact info]
- 🌐 Website: https://molaraiche.com

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Thank you for contributing to Comptable AI Chat! Your efforts help make this project better for everyone.

---

**Happy Coding! 🚀**
