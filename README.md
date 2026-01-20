# NexGen Scaleup - AI-First Growth Platform

A comprehensive digital platform combining Agency Portfolio, Learning Management System (LMS), and WhatsApp Automation SaaS.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)
![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748)

## 🚀 Features

### 🎨 Agency Marketing Site
- **Premium Dark Theme** with animated gradients and 3D effects
- **Hero Section** with cinematic typography
- **Services Grid** with tilt/parallax effects
- **Case Studies** horizontal scroll showcase
- **Lead Capture** with multi-step forms
- **Admin Kanban Board** for pipeline management

### 🎓 Academy Platform (LMS)
- **Course Catalog** with filtering and search
- **Course Builder** with modules and lessons
- **Lesson Player** with video, notes, and resources
- **Quiz Engine** with instant grading and confetti celebrations
- **Progress Tracking** for students
- **Student Dashboard** with enrollment management

### 📱 WhatsApp Automation SaaS
- **Analytics Dashboard** with real-time charts (Recharts)
- **Campaign Manager** with 3-step wizard and live phone preview
- **Contact Management** with advanced data table (filtering, sorting, selection)
- **Template Manager** with Meta API status badges
- **Unified Inbox** for customer conversations
- **Automation Workflows** trigger visualizer
- **Settings** for WhatsApp Cloud API configuration

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.4 (App Router)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Database:** PostgreSQL + Prisma ORM (SQLite for dev)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation
- **State:** Zustand

## 📋 Prerequisites

- Node.js 20+ and npm
- PostgreSQL (or use SQLite for local development)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/nexgen-scaleup.git
cd nexgen-scaleup
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and configure your database connection. For local development with SQLite:

```
DATABASE_URL="file:./dev.db"
```

### 4. Initialize the database

```bash
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
nexgen-scaleup/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (marketing)/       # Agency marketing site
│   │   ├── academy/           # LMS student area
│   │   ├── admin/             # Admin panels
│   │   └── dashboard/         # WhatsApp SaaS dashboard
│   ├── components/
│   │   ├── academy/           # LMS components
│   │   ├── admin/             # Admin components
│   │   ├── dashboard/         # SaaS components
│   │   ├── marketing/         # Marketing components
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── db/                # Prisma client
│       └── utils.ts           # Utilities
├── prisma/
│   └── schema.prisma          # Database schema
└── public/                    # Static assets
```

## 🗺️ Key Routes

### Marketing Site
- `/` - Landing page
- `/services` - Services overview
- `/about` - About page

### Academy (LMS)
- `/courses` - Course catalog
- `/academy/dashboard` - Student dashboard
- `/courses/[slug]/learn/lesson/[id]` - Lesson player

### Admin
- `/admin/courses` - Course management
- `/admin/leads` - Leads Kanban board

### SaaS Dashboard
- `/dashboard` - Analytics overview
- `/dashboard/campaigns` - Campaign wizard
- `/dashboard/contacts` - Contact management
- `/dashboard/templates` - WhatsApp templates
- `/dashboard/inbox` - Message inbox
- `/dashboard/automations` - Workflow triggers
- `/dashboard/settings` - Configuration

## 🎨 Design System

- **Primary Color:** Purple (#6D28D9)
- **Accent Color:** Green (#22C55E)
- **Fonts:** Inter (body), Sora (headings)
- **Dark Mode:** Fully supported

## 🧪 Testing

The application has undergone comprehensive E2E testing including:
- ✅ Form validation and submissions
- ✅ Multi-step wizards
- ✅ Data table interactions (filtering, sorting, selection)
- ✅ Responsive design (mobile + desktop)
- ✅ Navigation and routing

## 📦 Database Schema

The Prisma schema includes models for:
- **Users** - Authentication and profiles
- **Courses, Modules, Lessons** - Academy content
- **Quizzes** - Interactive assessments
- **Enrollments, Progress** - Student tracking
- **Leads** - Marketing pipeline
- **Contacts, Messages** - WhatsApp automation
- **Templates, Campaigns** - Marketing automation

## 🔐 Environment Variables

See `.env.example` for all required environment variables including:
- Database connection
- Authentication (NextAuth)
- WhatsApp Cloud API
- Stripe (payments)
- Mux (video)
- Email (Resend)

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy!

### Database

For production, use:
- **Neon** - Serverless PostgreSQL
- **Supabase** - PostgreSQL with realtime
- **PlanetScale** - MySQL alternative

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 🐛 Known Issues

- Recharts dimension warning (benign, doesn't affect functionality)

## ⭐ Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Framer Motion](https://www.framer.com/motion/)
