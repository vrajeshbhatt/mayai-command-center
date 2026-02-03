import { useState } from 'react'
import { useCommandStore } from '../stores/commandStore'
import type { Project } from '../lib/supabase'
import { Plus, FolderOpen } from 'lucide-react'

export default function Projects() {
  const { projects, addProject, isLoading } = useCommandStore()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    await addProject(name, desc)
    setName('')
    setDesc('')
  }

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">Add New Project</h2>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name..."
            className="input flex-1"
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description..."
            className="input flex-1"
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project: Project) => (
          <div key={project.id} className="card">
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen className="text-mayai-accent" />
              <h3 className="font-bold">{project.name}</h3>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">{project.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm px-2 py-1 bg-mayai-accent/20 rounded">{project.status}</span>
              <span className="text-sm text-gray-400">{project.progress}%</span>
            </div>
            
            <div className="mt-3 h-2 bg-mayai-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-mayai-accent transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
