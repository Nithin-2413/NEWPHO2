# Overview

This is a full-stack web application for a heartfelt message delivery service called "The Written Hug". The platform specializes in crafting and delivering personalized, emotional messages including love letters, gratitude notes, apologies, and celebration messages. Built with a modern tech stack, it features a beautiful React frontend with extensive UI components, an Express.js backend with Supabase database integration, and a Gmail-like admin system for managing client communications.

# User Preferences

Preferred communication style: Simple, everyday language.

## Recent Migration (August 16, 2025)
### Latest Updates (August 16, 2025)
- **ANIMATED STAR BACKGROUND**: Added beautiful animated star background with z-index 5 on hero page combining shooting stars and moving colorful particles
- **COSMIC PREMIUM BACKGROUND**: Implemented subtle cosmic gradient background across all pages with gentle animation and premium opacity levels for enhanced visual appeal
- **MIGRATION COMPLETED (August 16, 2025)**: Successfully migrated project from Replit Agent to standard Replit environment
- **ENVIRONMENT SETUP**: All required API keys configured (Supabase, Brevo email service)
- **SERVER RUNNING**: Express.js server successfully running on port 5000 with full functionality
- **ANIMATED STAR BACKGROUND**: Added beautiful animated star background with z-index 5 on hero page combining shooting stars and moving colorful particles
- Fixed package dependencies (tsx, typescript, vite, esbuild)
- Added all required environment variables for Supabase and Brevo email service
- **EMAIL SUBJECTS & PREVIEWS UPDATED**:
  - Admin notification: Subject "We got a Kabootar from {name}", Preview "Wakeup Chipmunk"
  - User confirmation: Subject "CEO - The Written Hug", Preview "Thanks for letting our kabootar carry your words to us"
  - Reply emails: Subject "CEO - The Written Hug", Preview "Written Hug Sent a Kabootar"
- **BACKGROUND MUSIC REPLACED**: 
  - Updated to new audio file (WhatsApp Audio 2025-08-15 at 12.09.54 AM_1755197391594.mp4)
  - Increased volume to 35% across all pages
  - Removed fade transitions - simple loop functionality only
  - Applied to all pages: Index, AdminDashboard, AdminConversation
- **CRITICAL FIX**: Completely resolved email template issue by replacing Brevo templates with direct HTML content
- **EMAIL IMAGES UPDATED**: Replaced local images with beautiful Cloudinary header images for all email templates
- **NEW EMAIL DESIGN**: Updated all email templates to match user's custom HTML design with elegant styling
- **CLOUDINARY OPTIMIZATION**: Implemented optimized Cloudinary URLs with transformations (w_700,c_scale,q_auto:best,f_auto) for faster loading
- **COMMON FOOTER**: Standardized footer image across all email templates while maintaining unique header images per template type
- **EMAIL WIDTH FIX**: Fixed email template image width consistency issues - all images now properly constrained to content width
- **CAPSULE BUTTONS**: Made all admin interface buttons capsule-shaped for better UI consistency (login page, dashboard, and conversation view)
- **BACKGROUND MUSIC REPLACED**: 
  - Updated to new audio file (WhatsApp Audio 2025-08-15 at 12.09.54 AM_1755197391594.mp4)
  - Increased volume to 35% across all pages
  - Removed fade transitions - simple loop functionality only
  - Applied to all pages: Index, AdminDashboard, AdminConversation
- **SENDER NAME UPDATE**: Changed reply sender from "sonuhoney" to "CEO-The Written Hug" across all admin interfaces
- **CONVERSATION UI**: Updated conversation history messages with capsule-shaped buttons for consistent design
- **RENDER DEPLOYMENT READY**: Prepared application for Render hosting with proper build scripts and deployment configuration
- Email system fully functional with beautiful designs: admin notifications, user confirmations, and reply emails
- Enhanced admin dashboard with improved background elements: reduced opacity, sparse layout, smooth floating animations
- Changed admin dashboard "Website" button to "Written Hug" for better branding
- Server running successfully on port 5000 with Express.js and Vite integration
- All API endpoints tested and confirmed working (submission, admin dashboard, reply system)

### Email Template Images (Cloudinary Optimized)
- Footer: Black minimalist banner - `https://res.cloudinary.com/dwmybitme/image/upload/w_700,c_scale,q_auto:best,f_auto/v1755175867/Black_Minimalist_Linkedin_Banner_tmtk7h.png`
- Admin Header: Green watercolor wedding banner - `https://res.cloudinary.com/dwmybitme/image/upload/w_700,c_scale,q_auto:best,f_auto/v1755175843/Green_Watercolor_Elegant_Wedding_Banner_Landscape_tjpw6a.jpg`
- User Header: Pink and white floral wedding banner - `https://res.cloudinary.com/dwmybitme/image/upload/w_700,c_scale,q_auto:best,f_auto/v1755175842/Pink_and_White_Floral_Wedding_Banner_5_gqw6u8.jpg`
- Reply Header: Pink and white floral banner for orders page - `https://res.cloudinary.com/dwmybitme/image/upload/w_700,c_scale,q_auto:best,f_auto/v1755175889/Pink_and_White_Floral_Wedding_Banner_tosxqh.png`

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables and Google Fonts integration
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with TypeScript and ESM modules
- **Framework**: Express.js for HTTP server and API routes
- **Development**: TSX for TypeScript execution in development
- **Build**: ESBuild for production bundling
- **Middleware**: Custom logging middleware for API request tracking

## Data Storage
- **Database**: PostgreSQL with Supabase as the serverless provider
- **ORM**: Direct Supabase client integration for real-time operations
- **Schema**: Form submissions (written_hug) and conversation replies (hug_replies) tables
- **Connection**: Supabase client with service role key for admin operations
- **Admin System**: Gmail-like interface for managing submissions and client communications

## Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Schema**: Basic user model with username and hashed password fields
- **Storage Abstraction**: Interface-based design allowing for multiple storage implementations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection driver for Neon Database
- **drizzle-orm & drizzle-kit**: Type-safe ORM with migration capabilities
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Design
- **@radix-ui/***: Comprehensive set of accessible UI primitives (30+ components)
- **tailwindcss**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library for React components

### Form & Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation

### Development Tools
- **vite**: Modern build tool with HMR and TypeScript support
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration

### External Services
- **Supabase**: Database and real-time functionality for form submissions and admin management
- **Mailjet**: Email service for automated notifications to admin and reply emails to clients
- **Google Fonts**: Typography with Inter and Great Vibes font families
- **Custom Admin Dashboard**: Gmail-like interface accessible at /admin with conversation management

The application follows a monorepo structure with shared TypeScript configurations, centralized schema definitions, and clear separation between client, server, and shared code. The build system supports both development and production environments with proper static asset handling and API routing.