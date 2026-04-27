# 🔧 Quick CI/CD Setup Guide

Follow these steps to enable automated deployment:

## Step 1: Create Vercel Project

```bash
# Option A: Use Vercel CLI
npm i -g vercel
vercel login
vercel

# Option B: Use Vercel Dashboard
# Go to https://vercel.com/new
# Import: molaraiche/comptable-ai-chat
```

## Step 2: Get Required IDs

After creating the project, get these values:

### Vercel Token
```
1. Visit: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "GitHub Actions"
4. Copy the token
```

### Project ID & Org ID
```bash
# In your project directory, run:
vercel link

# Then check the .vercel/project.json file:
cat .vercel/project.json

# You'll see:
# {
#   "projectId": "prj_xxxxx",
#   "orgId": "team_xxxxx"
# }
```

## Step 3: Add GitHub Secrets

Go to: `https://github.com/molaraiche/comptable-ai-chat/settings/secrets/actions`

Click "New repository secret" and add:

### 1. VERCEL_TOKEN
```
Value: [paste your Vercel token]
```

### 2. VERCEL_ORG_ID
```
Value: [paste your orgId from .vercel/project.json]
```

### 3. VERCEL_PROJECT_ID
```
Value: [paste your projectId from .vercel/project.json]
```

### 4. NEXT_PUBLIC_API_URL
```
Value: https://your-api-endpoint.com/webhook/ask
```

## Step 4: Test the Pipeline

```bash
# Make a small change
echo "# Test CI/CD" >> README.md

# Commit and push
git add .
git commit -m "Test CI/CD pipeline"
git push

# Watch the deployment
# Go to: https://github.com/molaraiche/comptable-ai-chat/actions
```

## Step 5: Verify Deployment

1. Check GitHub Actions tab - should see green checkmarks ✅
2. Check Vercel dashboard - should see new deployment
3. Visit your production URL - should see the app running

## ✅ Done!

Your CI/CD pipeline is now active. Every push to master will automatically:

1. ✅ Run linting and type checks
2. ✅ Build the application
3. ✅ Deploy to Vercel production
4. ✅ Update your live site

## 🔄 Workflow

```
Push to master → GitHub Actions → Build & Test → Deploy to Vercel → Live! 🚀
```

## 📊 Monitor Deployments

- **GitHub Actions:** https://github.com/molaraiche/comptable-ai-chat/actions
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Production URL:** Will be shown in Vercel dashboard

## 🆘 Need Help?

Check the full guide: [DEPLOYMENT.md](DEPLOYMENT.md)
