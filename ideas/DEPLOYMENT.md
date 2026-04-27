# 🚀 Deployment Guide - Comptable AI

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Comptable AI"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Done!** Your app will be live at `your-app.vercel.app`

### Environment Variables (Optional)

If you want to use a custom API endpoint:

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL` = `your-custom-endpoint`

---

## Deploy to Netlify

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repo

---

## Deploy to Your Own Server

### Build for Production

```bash
npm run build
npm start
```

### Using PM2 (Process Manager)

```bash
npm install -g pm2
npm run build
pm2 start npm --name "comptable-ai" -- start
```

### Using Docker

Create a `Dockerfile`:

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

Build and run:
```bash
docker build -t comptable-ai .
docker run -p 3000:3000 comptable-ai
```

---

## Custom Domain

### On Vercel:
1. Go to your project settings
2. Domains → Add Domain
3. Follow DNS configuration instructions

### On Netlify:
1. Domain settings → Add custom domain
2. Update your DNS records

---

## Performance Optimization

The app is already optimized with:
- ✅ Server-side rendering (Next.js)
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS optimization with Tailwind
- ✅ TypeScript for type safety

---

## Monitoring

Consider adding:
- **Vercel Analytics** (built-in)
- **Google Analytics**
- **Sentry** for error tracking
- **LogRocket** for session replay

---

## Security Checklist

- ✅ HTTPS enabled (automatic on Vercel/Netlify)
- ✅ No sensitive data in frontend
- ✅ API endpoint uses HTTPS
- ⚠️ Consider adding rate limiting on your API
- ⚠️ Add CORS configuration on your webhook endpoint

---

**Your Comptable AI is ready for production! 🎉**
