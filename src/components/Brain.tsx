import { useState } from 'react'
import React from 'react'
import { useCommandStore } from '../stores/commandStore'
import type { BrainEntry } from '../lib/supabase'
import { Plus, User, Bot, Lightbulb, BookOpen, Scale } from 'lucide-react'

const typeIcons: Record<string, React.ElementType> = {
  'VrajPref': User,
  'MayaiNote': Bot,
  'Idea': Lightbulb,
  'Learning': BookOpen,
  'Decision': Scale
}

const typeColors: Record<string, string> = {
  'VrajPref': 'text-purple-400 bg-purple-400/10',
  'MayaiNote': 'text-blue-400 bg-blue-400/10',
  'Idea': 'text-yellow-400 bg-yellow-400/10',
  'Learning': 'text-green-400 bg-green-400/10',
  'Decision': 'text-red-400 bg-red-400/10'
}

export default function Brain() {
  const { brainEntries, addBrainEntry, isLoading } = useCommandStore()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Note')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await addBrainEntry(content, type, title)
    setContent('')
    setTitle('')
  }

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">Add Brain Entry</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="flex gap-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input"
            >
              <option value="VrajPref">VrajPref</option>
              <option value="MayaiNote">MayaiNote</option>
              <option value="Idea">Idea</option>
              <option value="Learning">Learning</option>
              <option value="Decision">Decision</option>
              <option value="Note">Note</option>
            </select>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)..."
              className="input flex-1"
            />
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content..."
            rows={4}
            className="input w-full"
          />
          
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Entry
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {brainEntries.map((entry: BrainEntry) => {
          const Icon = typeIcons[entry.entry_type] || Brain
          const colorClass = typeColors[entry.entry_type] || 'text-gray-400 bg-gray-400/10'
          
          return (
            <div key={entry.id} className="card">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${colorClass}`}>{entry.entry_type}</span>
                    {entry.title && <span className="font-bold">{entry.title}</span>}
                  </div>
                  
                  <p className="text-gray-300">{entry.content}</p>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(entry.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
