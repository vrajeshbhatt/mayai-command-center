export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string
          due_date: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string
          due_date?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          priority: string
          progress: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          priority?: string
          progress?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          priority?: string
          progress?: number
          created_at?: string
        }
      }
      ideas: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          category: string
          votes: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          category?: string
          votes?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          category?: string
          votes?: number
          created_at?: string
        }
      }
      brain: {
        Row: {
          id: string
          title: string | null
          content: string
          entry_type: string
          created_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          content: string
          entry_type?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          content?: string
          entry_type?: string
          created_at?: string
        }
      }
      logs: {
        Row: {
          id: string
          timestamp: string
          level: string
          message: string
          source: string
          topic_module: string | null
        }
        Insert: {
          id?: string
          timestamp?: string
          level?: string
          message: string
          source?: string
          topic_module?: string | null
        }
        Update: {
          id?: string
          timestamp?: string
          level?: string
          message?: string
          source?: string
          topic_module?: string | null
        }
      }
      system_status: {
        Row: {
          id: number
          status: string
          current_activity: string
          active_tasks: number
          pending_ideas: number
          active_projects: number
          updated_at: string
        }
        Insert: {
          id?: number
          status?: string
          current_activity?: string
          active_tasks?: number
          pending_ideas?: number
          active_projects?: number
          updated_at?: string
        }
        Update: {
          id?: number
          status?: string
          current_activity?: string
          active_tasks?: number
          pending_ideas?: number
          active_projects?: number
          updated_at?: string
        }
      }
    }
  }
}
