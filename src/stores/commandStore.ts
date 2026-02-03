import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Task, Project, Idea, BrainEntry, Log, SystemStatus } from '../lib/supabase'

interface CommandState {
  tasks: Task[]
  projects: Project[]
  ideas: Idea[]
  brainEntries: BrainEntry[]
  logs: Log[]
  systemStatus: SystemStatus | null
  isLoading: boolean
  currentActivity: string
  
  initialize: () => void
  fetchAll: () => Promise<void>
  addTask: (title: string, description: string, priority: string) => Promise<void>
  updateTaskStatus: (id: string, status: string) => Promise<void>
  addProject: (name: string, description: string) => Promise<void>
  addIdea: (title: string, description: string) => Promise<void>
  addBrainEntry: (content: string, type: string, title?: string) => Promise<void>
  setCurrentActivity: (activity: string) => Promise<void>
}

export const useCommandStore = create<CommandState>((set, get) => ({
  tasks: [],
  projects: [],
  ideas: [],
  brainEntries: [],
  logs: [],
  systemStatus: null,
  isLoading: false,
  currentActivity: 'Idle',

  initialize: () => {
    get().fetchAll()
    
    supabase
      .channel('command-center')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        get().fetchAll()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        get().fetchAll()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, () => {
        get().fetchAll()
      })
      .subscribe()
  },

  fetchAll: async () => {
    set({ isLoading: true })
    
    try {
      const [tasksRes, projectsRes, ideasRes, brainRes, logsRes, statusRes] = await Promise.all([
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('ideas').select('*').order('created_at', { ascending: false }),
        supabase.from('brain').select('*').order('created_at', { ascending: false }),
        supabase.from('logs').select('*').order('timestamp', { ascending: false }).limit(50),
        supabase.from('system_status').select('*').single()
      ])

      set({
        tasks: (tasksRes.data as Task[]) || [],
        projects: (projectsRes.data as Project[]) || [],
        ideas: (ideasRes.data as Idea[]) || [],
        brainEntries: (brainRes.data as BrainEntry[]) || [],
        logs: (logsRes.data as Log[]) || [],
        systemStatus: statusRes.data as SystemStatus,
        currentActivity: (statusRes.data as SystemStatus)?.current_activity || 'Idle'
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  addTask: async (title, description, priority) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description, priority, status: 'Todo' }])
      .select()
    
    if (!error && data) {
      set(state => ({ tasks: [data[0] as Task, ...state.tasks] }))
      await get().setCurrentActivity(`Created task: ${title}`)
    }
  },

  updateTaskStatus: async (id, status) => {
    const updates: any = { status }
    if (status === 'Done') {
      updates.completed_at = new Date().toISOString()
    }
    
    await supabase.from('tasks').update(updates).eq('id', id)
    await get().fetchAll()
  },

  addProject: async (name, description) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, description, status: 'Planning', progress: 0 }])
      .select()
    
    if (!error && data) {
      set(state => ({ projects: [data[0] as Project, ...state.projects] }))
      await get().setCurrentActivity(`Created project: ${name}`)
    }
  },

  addIdea: async (title, description) => {
    const { data, error } = await supabase
      .from('ideas')
      .insert([{ title, description, status: 'New', votes: 0 }])
      .select()
    
    if (!error && data) {
      set(state => ({ ideas: [data[0] as Idea, ...state.ideas] }))
      await get().setCurrentActivity(`Added idea: ${title}`)
    }
  },

  addBrainEntry: async (content, type, title) => {
    const { data, error } = await supabase
      .from('brain')
      .insert([{ content, entry_type: type, title }])
      .select()
    
    if (!error && data) {
      set(state => ({ brainEntries: [data[0] as BrainEntry, ...state.brainEntries] }))
    }
  },

  setCurrentActivity: async (activity) => {
    await supabase
      .from('system_status')
      .update({ current_activity: activity, updated_at: new Date().toISOString() })
      .eq('id', 1)
    
    set({ currentActivity: activity })
  }
}))
