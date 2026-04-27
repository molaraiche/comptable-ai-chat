# 🚀 Deployment Guide

## Automated CI/CD Setup

This project uses GitHub Actions for continuous integration and deployment to Vercel.

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Already set up at `molaraiche/comptable-ai-chat`

## Setup Instructions

### 1. Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `molaraiche/comptable-ai-chat`
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 2. Get Vercel Credentials

#### Get Vercel Token:
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `GitHub Actions`
4. Copy the token

#### Get Vercel Project ID:
1. Go to your project settings on Vercel
2. Copy the **Project ID** from the project settings

#### Get Vercel Org ID:
1. Go to your team/account settings
2. Copy the **Team ID** (or **User ID** if personal account)

### 3. Add GitHub Secrets

Go to your GitHub repository:
`https://github.com/molaraiche/comptable-ai-chat/settings/secrets/actions`

Add these secrets:

| Secret Name | Description | Where to Find |
|------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel authentication token | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel organization/user ID | Project Settings → General |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Project Settings → General |
| `NEXT_PUBLIC_API_URL` | Your API endpoint URL | Your n8n webhook URL |

### 4. Configure Vercel Environment Variables

In your Vercel project settings, add:

**Environment Variable:**
- **Key:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://your-api-endpoint.com/webhook/ask`
- **Environments:** Production, Preview, Development

## CI/CD Pipeline

### Workflow Triggers

The CI/CD pipeline runs on:
- ✅ Push to `master` or `main` branch → Deploy to Production
- ✅ Pull Request → Deploy Preview + Run Tests
- ✅ Every commit → Lint & Type Check

### Pipeline Stages

#### 1. **Lint & Type Check**
- Runs ESLint
- TypeScript type checking
- Ensures code quality

#### 2. **Build Test**
- Builds the Next.js application
- Verifies no build errors
- Uploads build artifacts

#### 3. **Deploy Production** (master/main only)
- Deploys to Vercel production
- Available at your production URL
- Automatic HTTPS

#### 4. **Deploy Preview** (Pull Requests)
- Creates preview deployment
- Unique URL for each PR
- Test before merging

### Status Badges

Add to your README:

```markdown
![CI/CD](https://github.com/molaraiche/comptable-ai-chat/workflows/CI%2FCD%20Pipeline/badge.svg)
![Code Quality](https://github.com/molaraiche/comptable-ai-chat/workflows/Code%20Quality/badge.svg)
```

## Manual Deployment

### Deploy to Vercel (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Deployment Checklist

Before deploying:

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] API endpoint accessible
- [ ] No console.log statements in production code
- [ ] Build succeeds locally
- [ ] Dependencies up to date

## Monitoring

After deployment:

1. **Check Vercel Dashboard** - Monitor deployments
2. **Check GitHub Actions** - View pipeline status
3. **Test Production URL** - Verify functionality
4. **Monitor Logs** - Check for errors

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find previous working deployment
5. Click "..." → "Promote to Production"

## Troubleshooting

### Build Fails

```bash
# Check locally first
npm run build

# Check logs in GitHub Actions
# Go to Actions tab → Select failed workflow → View logs
```

### Environment Variables Not Working

1. Verify secrets are set in GitHub
2. Check Vercel environment variables
3. Ensure variable names match exactly
4. Redeploy after adding variables

### Deployment Stuck

1. Check Vercel status: [vercel-status.com](https://www.vercel-status.com/)
2. Check GitHub Actions status
3. Try manual deployment with Vercel CLI

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Actions Docs:** [docs.github.com/actions](https://docs.github.com/en/actions)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Your CI/CD pipeline is ready! 🚀**

Every push to master will automatically deploy to production.
