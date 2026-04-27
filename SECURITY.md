# Security Policy

## 🔒 Security Measures

This application implements several security measures to protect users and data:

### 1. Environment Variables
- ✅ API URLs stored in `.env.local` (not committed to git)
- ✅ `.env*` files are gitignored
- ✅ Example template provided in `.env.example`

### 2. Security Headers
- ✅ **X-Frame-Options**: Prevents clickjacking attacks
- ✅ **X-Content-Type-Options**: Prevents MIME-type sniffing
- ✅ **X-XSS-Protection**: Enables browser XSS protection
- ✅ **Strict-Transport-Security**: Forces HTTPS connections
- ✅ **Content-Security-Policy**: Restricts resource loading
- ✅ **Referrer-Policy**: Controls referrer information
- ✅ **Permissions-Policy**: Disables unnecessary browser features

### 3. Rate Limiting
- ✅ 3 questions per IP address
- ✅ 72-hour reset period
- ✅ Server-side enforcement
- ✅ Prevents API abuse

### 4. Data Privacy
- ✅ No user authentication required
- ✅ No personal data collected
- ✅ Chat history stored locally (browser localStorage)
- ✅ No server-side message storage
- ✅ No tracking or analytics

### 5. API Security
- ✅ CORS enabled for specific domain
- ✅ HTTPS-only connections
- ✅ No API keys exposed in frontend
- ✅ Rate limiting on API calls

### 6. Frontend Security
- ✅ React's built-in XSS protection
- ✅ No `dangerouslySetInnerHTML` usage
- ✅ Input sanitization via React
- ✅ Markdown rendering with safe defaults

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please email:
**security@molaraiche.com**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Do not** open public issues for security vulnerabilities.

## 🔐 Best Practices for Deployment

### Environment Variables
```bash
# Never commit these files:
.env.local
.env.production.local
.env.development.local

# Always use environment variables for:
- API endpoints
- API keys
- Secret tokens
- Database URLs
```

### Vercel Deployment
1. Add environment variables in Vercel dashboard
2. Set `NEXT_PUBLIC_API_URL` in project settings
3. Enable automatic HTTPS
4. Use Vercel's built-in DDoS protection

### Self-Hosting
1. Use a reverse proxy (nginx, Caddy)
2. Enable HTTPS with Let's Encrypt
3. Configure firewall rules
4. Set up rate limiting at proxy level
5. Regular security updates

## 🛡️ Security Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] `.env.local` not committed to git
- [ ] HTTPS enabled
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] CSP policy reviewed
- [ ] Dependencies updated
- [ ] No console.log in production
- [ ] Error messages don't expose sensitive info
- [ ] API endpoint secured

## 📋 Security Audit Log

| Date | Version | Changes |
|------|---------|---------|
| 2025-04-27 | 1.0.0 | Initial security implementation |

## 🔄 Regular Maintenance

### Weekly
- [ ] Check for dependency updates
- [ ] Review rate limit logs
- [ ] Monitor error logs

### Monthly
- [ ] Run `npm audit`
- [ ] Update dependencies
- [ ] Review security headers
- [ ] Check CSP violations

### Quarterly
- [ ] Full security audit
- [ ] Penetration testing
- [ ] Review access logs
- [ ] Update security policies

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Vercel Security](https://vercel.com/docs/security)

## ⚖️ Compliance

This application:
- ✅ Does not collect personal data (GDPR compliant)
- ✅ Uses localStorage (user's device only)
- ✅ No cookies used
- ✅ No third-party tracking
- ✅ Transparent data usage

## 🔒 Encryption

- ✅ HTTPS enforced (TLS 1.3)
- ✅ Secure WebSocket connections
- ✅ No sensitive data in URLs
- ✅ No sensitive data in localStorage

---

**Last Updated**: April 27, 2025  
**Version**: 1.0.0  
**Maintained by**: [Molaraiche](https://molaraiche.com/)
