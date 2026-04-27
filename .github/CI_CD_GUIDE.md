# CI/CD Pipeline Guide

## 📋 Overview

This project uses a modern, efficient CI/CD pipeline powered by GitHub Actions and Vercel. The pipeline ensures code quality, security, and successful builds before deployment.

## 🔄 Workflow Structure

### Pipeline Stages

```
┌─────────────────────────────────────────────────────────┐
│                    Push to master/main                   │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼─────┐            ┌─────▼──────┐
   │ Quality  │            │  Security  │
   │  Checks  │            │   Audit    │
   └────┬─────┘            └─────┬──────┘
        │                         │
        └────────────┬────────────┘
                     │
              ┌──────▼──────┐
              │    Build    │
              │ Application │
              └──────┬──────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼────┐          ┌──────▼────────┐
    │ Upload  │          │   Vercel      │
    │Artifacts│          │Auto-Deployment│
    └─────────┘          └───────────────┘
```

## 🎯 Jobs Breakdown

### 1. Quality Checks (`quality`)
**Purpose:** Ensure code quality and type safety

**Steps:**
- ✅ ESLint validation
- ✅ TypeScript type checking
- ✅ Console statement detection (warning only)

**Duration:** ~2-3 minutes

**Failure Impact:** Blocks deployment

### 2. Security Audit (`security`)
**Purpose:** Identify security vulnerabilities

**Steps:**
- 🔒 npm audit (moderate level)
- ⚠️  Non-blocking (warnings only)

**Duration:** ~1 minute

**Failure Impact:** Warning only, doesn't block

### 3. Build Application (`build`)
**Purpose:** Verify production build succeeds

**Steps:**
- 🏗️  Next.js production build
- 📦 Artifact upload (master branch only)

**Duration:** ~3-5 minutes

**Failure Impact:** Blocks deployment

### 4. Deployment Status (`deployment-status`)
**Purpose:** Provide deployment information

**Steps:**
- 📊 Display deployment details
- 🌐 Show production URL

**Duration:** <1 minute

**Runs:** Only on master branch pushes

### 5. Summary (`summary`)
**Purpose:** Aggregate all results

**Steps:**
- 📈 Display all job statuses
- ✅ Final pass/fail determination

**Duration:** <1 minute

**Runs:** Always (even on failure)

## 🚀 Deployment Flow

### Automatic Deployment (Recommended)

1. **Push to master branch**
   ```bash
   git push origin master
   ```

2. **GitHub Actions runs CI pipeline**
   - Quality checks
   - Security audit
   - Build verification

3. **Vercel auto-deploys** (via Git integration)
   - Triggered by push to master
   - Uses Vercel's build system
   - Deploys to production

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 🔧 Configuration

### Environment Variables

**Required for CI:**
- `NEXT_PUBLIC_API_URL` - Set in workflow file

**Required for Vercel:**
- `NEXT_PUBLIC_API_URL` - Set in Vercel dashboard

### GitHub Secrets (Optional)

If you want to add Vercel deployment to GitHub Actions:

```yaml
secrets:
  VERCEL_TOKEN: <your-vercel-token>
  VERCEL_ORG_ID: <your-org-id>
  VERCEL_PROJECT_ID: <your-project-id>
```

## 📊 Performance Optimizations

### Caching Strategy

1. **npm cache** - Speeds up dependency installation
2. **Build artifacts** - Retained for 7 days
3. **Concurrency control** - Cancels outdated runs

### Timeout Settings

- Quality: 10 minutes
- Security: 5 minutes
- Build: 15 minutes
- Status: 2 minutes

## 🛠️ Local Development

### Run CI checks locally

```bash
# Full validation
npm run validate

# Individual checks
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run build         # Production build

# Fix issues
npm run lint:fix      # Auto-fix ESLint issues
```

### Pre-commit Checks

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run lint && npm run type-check
```

## 📈 Monitoring

### GitHub Actions Dashboard

View workflow runs:
```
https://github.com/molaraiche/comptable-ai-chat/actions
```

### Vercel Dashboard

View deployments:
```
https://vercel.com/molaraiche/comptable-ai
```

## 🐛 Troubleshooting

### Build Fails

**Problem:** Build fails in CI but works locally

**Solutions:**
1. Check environment variables
2. Clear cache: `npm run clean && npm install`
3. Verify Node.js version matches CI (18.x)

### Lint Errors

**Problem:** ESLint errors block deployment

**Solutions:**
1. Run `npm run lint:fix` locally
2. Fix remaining errors manually
3. Commit and push

### Type Errors

**Problem:** TypeScript errors in CI

**Solutions:**
1. Run `npm run type-check` locally
2. Fix type errors
3. Ensure `tsconfig.json` is committed

### Deployment Not Triggered

**Problem:** Vercel doesn't deploy automatically

**Solutions:**
1. Check Vercel Git integration
2. Verify branch is connected
3. Check Vercel deployment logs

## 🔐 Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Regular audits** - Review `npm audit` warnings
3. **Dependency updates** - Keep packages up to date
4. **Code review** - All PRs should be reviewed

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🤝 Contributing

When contributing:

1. Create a feature branch
2. Make your changes
3. Run `npm run validate` locally
4. Create a pull request
5. Wait for CI checks to pass
6. Request review

## 📝 Changelog

### v2.0.0 (Current)
- ✅ Consolidated workflows into single pipeline
- ✅ Added concurrency control
- ✅ Improved caching strategy
- ✅ Added comprehensive logging
- ✅ Optimized job dependencies

### v1.0.0 (Previous)
- ✅ Separate quality and CI workflows
- ✅ Basic Vercel deployment
- ✅ Manual deployment steps

---

**Last Updated:** 2025-01-27
**Maintained by:** [Molaraiche](https://github.com/molaraiche)
