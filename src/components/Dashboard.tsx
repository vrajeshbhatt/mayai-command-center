import { useEffect } from 'react'
import { useCommandStore } from '../stores/commandStore'
import type { Log } from '../lib/supabase'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#6b7280', '#facc15', '#ef4444', '#4ade80']

export default function Dashboard() {
  const { 
    tasks, 
    projects, 
    ideas, 
    logs, 
    systemStatus, 
    currentActivity,
    isLoading 
  } = useCommandStore()

  useEffect(() => {
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      useCommandStore.getState().fetchAll()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Calculate stats
  const taskStats = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {})

  const projectStats = projects.reduce<Record<string, number>>((acc, proj) => {
    acc[proj.status] = (acc[proj.status] || 0) + 1
    return acc
  }, {})

  const taskData = Object.entries(taskStats).map(([name, value]) => ({ name, value }))
  const projectData = Object.entries(projectStats).map(([name, value]) => ({ name, value }))

  if (isLoading) {
    return <div className="text-center py-20 text-mayai-accent">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-4xl font-bold text-mayai-accent">{tasks.length}</div>
          <div className="text-gray-400">Total Tasks</div>
          <div className="text-sm text-mayai-success mt-1">
            {taskStats['Done'] || 0} Done | {taskStats['In Progress'] || 0} Active
          </div>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-mayai-accent">{projects.length}</div>
          <div className="text-gray-400">Projects</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-mayai-accent">{ideas.length}</div>
          <div className="text-gray-400">Ideas</div>
        </div>

        <div className="card text-center">
          <div className="text-4xl font-bold text-mayai-accent">{logs.length}</div>
          <div className="text-gray-400">Recent Logs</div>
        </div>
      </div>

      {/* Current Activity */}
      <div className="card">
        <h2 className="text-xl font-bold text-mayai-accent mb-4">Current Activity</h2>
        <div className="text-lg">{currentActivity}</div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          <div>Active Tasks: {systemStatus?.active_tasks || 0}</div>
          <div>Pending Ideas: {systemStatus?.pending_ideas || 0}</div>
          <div>Active Projects: {systemStatus?.active_projects || 0}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-bold text-mayai-accent mb-4">Task Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-mayai-accent mb-4">Project Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="card">
        <h3 className="text-lg font-bold text-mayai-accent mb-4">Live Activity Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-sm">
          {logs.slice(0, 20).map((log: Log) => (
            <div key={log.id} className="flex gap-2 border-b border-gray-800 pb-1">
              <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className={
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'SUCCESS' ? 'text-green-400' :
                log.level === 'WARNING' ? 'text-yellow-400' :
                'text-blue-400'
              }>
                [{log.level}]
              </span>
              <span className="text-mayai-accent">{log.source}:</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
