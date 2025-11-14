# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the Zero Error Esports website.

## Prerequisites
- A Google account
- Access to Google Cloud Console

## Step-by-Step Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown (top left, next to "Google Cloud")
3. Click **"NEW PROJECT"**
4. Enter project name: `Zero Error Esports` (or your preferred name)
5. Click **"CREATE"**
6. Wait for the project to be created, then select it

### 2. Enable Google+ API

1. In the Google Cloud Console, make sure your project is selected
2. Go to **APIs & Services** > **Library**
3. Search for "Google+ API"
4. Click on it and press **"ENABLE"**

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **"External"** (unless you have a Google Workspace)
3. Click **"CREATE"**
4. Fill in the required fields:
   - **App name**: `Zero Error Esports`
   - **User support email**: Your email address
   - **App logo**: (Optional) Upload your logo
   - **Developer contact information**: Your email address
5. Click **"SAVE AND CONTINUE"**
6. On the "Scopes" page, click **"SAVE AND CONTINUE"** (default scopes are sufficient)
7. On the "Test users" page, you can add test users or click **"SAVE AND CONTINUE"**
8. Review the summary and click **"BACK TO DASHBOARD"**

### 4. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**
4. Choose **"Web application"** as the application type
5. Enter a name: `Zero Error Esports Web Client`
6. Under **"Authorized JavaScript origins"**, add:
   ```
   http://localhost:3000
   ```
   (Add your production URL when deploying, e.g., `https://yourdomain.com`)
   
7. Under **"Authorized redirect URIs"**, add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   (Add your production callback URL when deploying, e.g., `https://yourdomain.com/api/auth/callback/google`)

8. Click **"CREATE"**

### 5. Copy Your Credentials

1. A modal will appear with your **Client ID** and **Client Secret**
2. Copy these values and update your `.env.local` file:

```env
GOOGLE_CLIENT_ID="your-actual-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-actual-client-secret-here"
```

3. **IMPORTANT**: Keep these credentials secure and never commit them to version control

### 6. Test the Integration

1. Restart your development server:
   ```bash
   pnpm dev
   ```

2. Visit `http://localhost:3000/login`
3. Click "Continue with Google"
4. You should be redirected to Google's login page
5. After signing in, you should be redirected back to your app at `/ze-club`

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- No trailing slashes
- Check for typos

### Error: "Access blocked: This app's request is invalid"
- Make sure you've completed the OAuth consent screen configuration
- Add your email as a test user if the app is not published

### Users getting "This app isn't verified" warning
- This is normal for apps in development
- Click "Advanced" → "Go to [Your App] (unsafe)" to proceed during testing
- For production, you'll need to go through Google's app verification process

## Production Deployment

When deploying to production:

1. Go back to **APIs & Services** > **Credentials** in Google Cloud Console
2. Edit your OAuth 2.0 Client ID
3. Add your production URLs:
   - **Authorized JavaScript origins**: `https://yourdomain.com`
   - **Authorized redirect URIs**: `https://yourdomain.com/api/auth/callback/google`
4. Update your production environment variables with the same Client ID and Secret

## Security Notes

- Never share your Client Secret publicly
- Keep your `.env.local` file in `.gitignore`
- Rotate credentials if they are ever exposed
- Use different OAuth clients for development and production environments

## Support

If you encounter issues:
1. Check the [NextAuth.js documentation](https://next-auth.js.org/providers/google)
2. Review [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)
3. Check the browser console and server logs for error messages
