import { useState } from 'react'
import { useCommandStore } from '../stores/commandStore'
import type { Idea } from '../lib/supabase'
import { Plus, Lightbulb, ThumbsUp } from 'lucide-react'

export default function Ideas() {
  const { ideas, addIdea, isLoading } = useCommandStore()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addIdea(title, desc)
    setTitle('')
    setDesc('')
  }

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  const statusColors: Record<string, string> = {
    'New': 'bg-gray-500/20 text-gray-300',
    'Under Review': 'bg-yellow-500/20 text-yellow-300',
    'Approved': 'bg-green-500/20 text-green-300',
    'In Development': 'bg-blue-500/20 text-blue-300',
    'Implemented': 'bg-purple-500/20 text-purple-300',
    'Archived': 'bg-gray-700 text-gray-400'
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">Submit New Idea</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Idea title..."
            className="input w-full"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your idea..."
            rows={3}
            className="input w-full"
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Submit Idea
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea: Idea) => (
          <div key={idea.id} className="card">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-mayai-accent shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold mb-1">{idea.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{idea.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[idea.status] || 'bg-gray-500/20'}`}>
                    {idea.status}
                  </span>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <ThumbsUp size={14} />
                    <span>{idea.votes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
