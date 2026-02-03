# Quick Supabase Setup Guide

## Step 1: Open Supabase Dashboard
1. Go to: https://app.supabase.com/project/vfximbrvzkmcsupqbkgq
2. Sign in with your account

## Step 2: Create Tables
1. Click on **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy and paste the entire contents of this file: `D:\Mayai\web\supabase\migrations\001_initial_schema.sql`
4. Click **"Run"**

This will create all the tables:
- ✅ tasks
- ✅ projects  
- ✅ ideas
- ✅ brain
- ✅ logs
- ✅ system_status
- ✅ discussions

## Step 3: Enable Realtime (Important!)
1. Go to **"Database"** → **"Replication"**
2. Turn ON the switch for "Realtime"
3. Make sure all tables are listed under "Source"

## Step 4: Get Your API Keys
1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://vfximbrvzkmcsupqbkgq.supabase.co`
   - **anon public**: starts with `eyJ...`

## Step 5: Update Your .env File
Edit `D:\Mayai\web\.env`:
```
VITE_SUPABASE_URL=https://vfximbrvzkmcsupqbkgq.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-from-step-4
```

## Step 6: Restart and Test
1. Stop the dev server (Ctrl+C)
2. Run: `npm run dev`
3. Refresh the page
4. Try adding a task!

---

## 🔧 Alternative: I Can Help You Do It

Want me to:
1. **Create a simpler setup script** that does it automatically?
2. **Add mock data** so you can see how it looks?
3. **Set up a local SQLite fallback** so it works offline first?

Let me know what you prefer!
