# 🚀 Vercel Deployment Guide

This guide will help you deploy PlayInvest to Vercel in minutes.

## Quick Deploy

### Option 1: One-Click Deploy (Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import" and select your GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Click "Deploy" - that's it! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy**
   ```bash
   vercel login
   vercel
   ```

   For production deployment:
   ```bash
   vercel --prod
   ```

## Environment Variables (Optional)

The app works without any environment variables. However, if you want to enable OpenAI-powered mentoring features:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, Development (select all)

4. Redeploy your application

## Build Configuration

Vercel automatically detects:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

No additional configuration needed!

## Post-Deployment Checklist

- [ ] Test the deployed application
- [ ] Verify all routes work correctly:
  - [ ] Landing page (`/`)
  - [ ] Quiz (`/quiz`)
  - [ ] Dashboard (`/dashboard`)
  - [ ] Playground (`/playground`)
  - [ ] Settings (`/settings`)
- [ ] Test API endpoints:
  - [ ] `/api/mentor` (should work with or without API key)
  - [ ] `/api/tts`
- [ ] Verify environment variables (if using OpenAI)

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version is 18+ (Vercel uses 20.x by default)
- Check build logs in Vercel dashboard

### API Routes Not Working
- Verify routes are in `app/api/` directory
- Check Vercel function logs in the dashboard
- Ensure environment variables are set correctly

### Environment Variables Not Working
- Make sure variables are added to the correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Variable names are case-sensitive

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- Check build logs in your Vercel dashboard

---

Your app should now be live! 🎉

