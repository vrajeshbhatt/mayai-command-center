# Mayai Command Center

[![Deploy to GitHub Pages](https://github.com/vrajeshbhatt/mayai-command-center/actions/workflows/deploy.yml/badge.svg)](https://github.com/vrajeshbhatt/mayai-command-center/actions/workflows/deploy.yml)

A modern, real-time collaboration platform for AI-human teamwork. Built with React, TypeScript, Tailwind CSS, and Supabase.

![Dashboard Preview](https://via.placeholder.com/800x400/0f0f23/00d4ff?text=Mayai+Command+Center)

## ✨ Features

- **Real-time Dashboard**: Live updates using Supabase Realtime subscriptions
- **Task Management**: Full CRUD with status tracking (Todo, In Progress, Blocked, Done)
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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Supabase account (free tier works!)

### Installation

```bash
# Clone the repository
git clone https://github.com/vrajeshbhatt/mayai-command-center.git
cd mayai-command-center

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

Open http://localhost:3000 to view the app.

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 🗄️ Database Setup

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Enable Realtime for all tables in Database → Replication

## 🚀 Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages.

### Setup

1. Fork/clone this repository
2. Go to Settings → Secrets and variables → Actions
3. Add your Supabase credentials:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Go to Settings → Pages → Source: GitHub Actions
5. Push to main branch - it will deploy automatically!

Your site will be available at: `https://yourusername.github.io/mayai-command-center/`

## 📊 Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   GitHub Pages  │────▶│  React + Vite   │────▶│    Supabase     │
│   (Frontend)    │◀────│  (Dashboard)    │◀────│  (PostgreSQL)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │  Real-time      │────▶│   Row Level     │
                        │  Subscriptions  │     │   Security      │
                        └─────────────────┘     └─────────────────┘
```

## 🎯 Roadmap

- [x] Real-time dashboard
- [x] Task/Project/Idea management
- [x] Activity logging
- [ ] GitHub OAuth authentication
- [ ] Push notifications
- [ ] Mobile PWA
- [ ] Voice interface
- [ ] AI integrations

## 📄 License

MIT License - feel free to use for personal or commercial projects!

## 🙏 Acknowledgments

Built with ❤️ by [Vraj](https://github.com/vrajeshbhatt) and Mayai

---

## 💡 Support

For issues or questions, please open an issue on GitHub.
