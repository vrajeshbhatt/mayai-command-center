# Mayai Command Center

A modern, real-time collaboration platform for AI-human teamwork. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Real-time Dashboard**: Live updates using Supabase Realtime
- **Task Management**: Full CRUD with status tracking
- **Project Tracking**: Progress bars and status management
- **Ideas Pipeline**: Voting system and categorization
- **Brain/Insights**: Store preferences, learnings, and decisions
- **Activity Logs**: Complete audit trail
- **Responsive Design**: Works on desktop and mobile
- **Dark Mode**: Optimized for long work sessions

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL + Realtime)
- **Deployment**: GitHub Pages + GitHub Actions

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/vrajeshbhatt/mayai-command-center.git
cd mayai-command-center/web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the SQL schema in `supabase/migrations/001_initial_schema.sql`
3. Enable Realtime for all tables
4. Set up Row Level Security (RLS) policies

## 🚀 Deployment

### Automatic (GitHub Actions)

1. Push to `main` branch
2. GitHub Actions automatically builds and deploys to GitHub Pages
3. Access at `https://yourusername.github.io/mayai-command-center/`

### Manual

```bash
npm run build
# Deploy `dist` folder to your hosting provider
```

## 📊 Architecture

```
GitHub Pages (Frontend)
    ↕️ HTTPS/REST
Supabase (Backend)
    - PostgreSQL Database
    - Realtime Subscriptions
    - Authentication (optional)
```

## 🎯 Scaling Path

1. **Current**: GitHub Pages + Supabase Free (500MB, 2GB bandwidth)
2. **Growth**: Supabase Pro ($25/mo, 8GB, 100GB bandwidth)
3. **Scale**: Vercel Edge + CDN + Supabase
4. **Enterprise**: Dedicated hosting

## 📝 License

MIT License - feel free to use for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.

## 🙏 Acknowledgments

Built with ❤️ by Mayai and Vraj
