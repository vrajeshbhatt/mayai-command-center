import { useState } from 'react'
import { useCommandStore } from '../stores/commandStore'
import type { Task } from '../lib/supabase'
import { Plus, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react'

const statusIcons = {
  'Done': CheckCircle,
  'In Progress': Clock,
  'Blocked': AlertCircle,
  'Todo': Circle
}

const priorityColors = {
  'High': 'text-red-400',
  'Medium': 'text-yellow-400',
  'Low': 'text-blue-400'
}

export default function Tasks() {
  const { tasks, addTask, updateTaskStatus, isLoading } = useCommandStore()
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('Medium')

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    
    await addTask(newTaskTitle, newTaskDesc, newTaskPriority)
    setNewTaskTitle('')
    setNewTaskDesc('')
    setNewTaskPriority('Medium')
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await updateTaskStatus(taskId, newStatus)
  }

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Add Task Form */}
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">Add New Task</h2>
        <form onSubmit={handleAddTask} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="input w-full"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <input
              type="text"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              placeholder="Description..."
              className="input w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Priority</label>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              className="input"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add Task
          </button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">All Tasks ({tasks.length})</h2>
        
        <div className="space-y-2">
          {tasks.map((task: Task) => {
            const StatusIcon = statusIcons[task.status as keyof typeof statusIcons] || Circle
            
            return (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 bg-mayai-bg rounded-lg border border-mayai-accent/10 hover:border-mayai-accent/30 transition-colors"
              >
                <button
                  onClick={() => handleStatusChange(task.id, task.status === 'Done' ? 'Todo' : 'Done')}
                  className="text-mayai-accent hover:text-mayai-success transition-colors"
                >
                  <StatusIcon size={20} />
                </button>
                
                <div className="flex-1">
                  <div className={`font-medium ${task.status === 'Done' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </div>
                  {task.description && (
                    <div className="text-sm text-gray-400">{task.description}</div>
                  )}
                </div>
                
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="input text-sm"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Done">Done</option>
                </select>
                
                <span className={`text-sm font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {task.priority}
                </span>
                
                <span className="text-sm text-gray-500">
                  {new Date(task.created_at).toLocaleDateString()}
                </span>
              </div>
            )
          })}
          
          {tasks.length === 0 && (
            <div className="text-center py-10 text-gray-500">No tasks yet. Add one above!</div>
          )}
        </div>
      </div>
    </div>
  )
}
