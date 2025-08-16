# Render Deployment Guide for The Written Hug

## Prerequisites

1. Create a Render account at https://render.com
2. Connect your GitHub/GitLab repository to Render

## Deployment Steps

### 1. Create a New Web Service

1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect your repository
4. Configure the service:

### 2. Service Configuration

**Basic Settings:**
- **Name**: written-hug
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Starter (Free) or higher

### 3. Environment Variables

Add the following environment variables in Render dashboard:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-key>
BREVO_API_KEY=<your-brevo-api-key>
ADMIN_EMAIL=onaamikaonaamika@gmail.com
ADMIN_FROM_EMAIL=onaamikasadguru@gmail.com
```

### 4. Advanced Settings

- **Auto-Deploy**: Enable (optional)
- **Branch**: main
- **Root Directory**: Leave blank (uses project root)

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. The deployment URL will be provided once complete

## Post-Deployment

1. Test all features:
   - Form submissions
   - Admin login
   - Email notifications
   - Admin dashboard functionality

2. Update CORS settings if needed for your domain

## Notes

- The application uses Supabase for database (no additional database setup required)
- Email service uses Brevo (configured via API key)
- Static assets are served from the built application
- Background music will be included in the build

## Troubleshooting

1. **Build failures**: Check that all dependencies are in package.json
2. **Environment variables**: Ensure all secrets are properly set
3. **Database issues**: Verify Supabase keys and permissions
4. **Email issues**: Check Brevo API key and configuration

## Support

For deployment issues, refer to Render documentation or contact their support.