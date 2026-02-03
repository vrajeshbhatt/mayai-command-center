import { useCommandStore } from '../stores/commandStore'
import type { Log } from '../lib/supabase'
import { Activity, RefreshCw } from 'lucide-react'

const levelColors: Record<string, string> = {
  'DEBUG': 'text-gray-400',
  'INFO': 'text-blue-400',
  'WARNING': 'text-yellow-400',
  'ERROR': 'text-red-400',
  'SUCCESS': 'text-green-400'
}

export default function Logs() {
  const { logs, fetchAll, isLoading } = useCommandStore()

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-mayai-accent flex items-center gap-2">
          <Activity size={24} />
          Activity Logs
        </h2>
        
        <button
          onClick={() => fetchAll()}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="card">
        <div className="space-y-2 max-h-[600px] overflow-y-auto font-mono text-sm">
          {logs.map((log: Log) => (
            <div
              key={log.id}
              className="flex gap-3 p-3 bg-mayai-bg rounded border border-mayai-accent/10 hover:border-mayai-accent/30 transition-colors"
            >
              <span className="text-gray-500 shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              
              <span className={`font-bold shrink-0 ${levelColors[log.level]}`}>
                [{log.level}]
              </span>
              
              <span className="text-mayai-accent shrink-0">{log.source}:</span>
              
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
          
          {logs.length === 0 && (
            <div className="text-center py-10 text-gray-500">No logs found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
