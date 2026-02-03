import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfximbrvzkmcsupqbkgq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeGltYnJ2emttY3N1cHFia2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjAwMjksImV4cCI6MjA4NTYzNjAyOX0.Mj4kq-SxU04-TX0QvcrXJF5vw0RGd83RsvYJlweXhEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Task {
  id: string
  title: string
  description: string | null
  status: 'Todo' | 'In Progress' | 'Blocked' | 'Done'
  priority: 'High' | 'Medium' | 'Low'
  due_date: string | null
  created_at: string
  completed_at: string | null
}

export interface Project {
  id: string
  name: string
  description: string | null
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  progress: number
  created_at: string
}

export interface Idea {
  id: string
  title: string
  description: string | null
  status: 'New' | 'Under Review' | 'Approved' | 'In Development' | 'Implemented' | 'Archived'
  category: 'Feature' | 'Improvement' | 'Integration' | 'Automation' | 'Research' | 'Other'
  votes: number
  created_at: string
}

export interface BrainEntry {
  id: string
  title: string | null
  content: string
  entry_type: 'VrajPref' | 'MayaiNote' | 'Idea' | 'Learning' | 'Decision' | 'Note'
  created_at: string
}

export interface Log {
  id: string
  timestamp: string
  level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
  message: string
  source: string
}

export interface SystemStatus {
  id: number
  status: string
  current_activity: string
  active_tasks: number
  pending_ideas: number
  active_projects: number
  updated_at: string
}
