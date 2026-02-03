export interface Task {
  id: string
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Blocked' | 'Done'
  priority: 'High' | 'Medium' | 'Low'
  due_date?: string
  created_at: string
  completed_at?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  progress: number
  start_date?: string
  target_date?: string
  created_at: string
}

export interface Idea {
  id: string
  title: string
  description: string
  status: 'New' | 'Under Review' | 'Approved' | 'In Development' | 'Implemented' | 'Archived'
  category: 'Feature' | 'Improvement' | 'Integration' | 'Automation' | 'Research' | 'Other'
  priority: 'Must Have' | 'Should Have' | 'Nice to Have' | 'Someday'
  impact: 'High' | 'Medium' | 'Low'
  effort: 'Quick Win' | 'Medium' | 'Large'
  votes: number
  created_at: string
}

export interface BrainEntry {
  id: string
  title?: string
  content: string
  entry_type: 'VrajPref' | 'MayaiNote' | 'Idea' | 'Learning' | 'Decision' | 'Note'
  topic?: string
  created_at: string
}

export interface Log {
  id: string
  timestamp: string
  level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
  message: string
  source: string
  topic_module?: string
}

export interface SystemStatus {
  id: number
  status: string
  last_heartbeat: string
  active_tasks: number
  pending_ideas: number
  active_projects: number
  current_activity: string
  updated_at: string
}

export interface DashboardStats {
  tasks: Record<string, number>
  projects: Record<string, number>
  ideas: Record<string, number>
  recent_logs: number
}
