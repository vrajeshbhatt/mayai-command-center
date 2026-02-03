import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, FolderOpen, Lightbulb, Brain as BrainIcon, Activity } from 'lucide-react'
import { useCommandStore } from './stores/commandStore'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import Projects from './components/Projects'
import Ideas from './components/Ideas'
import Brain from './components/Brain'
import Logs from './components/Logs'

function App() {
  const { initialize, currentActivity } = useCommandStore()

  useEffect(() => {
    initialize()
  }, [])

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/ideas', icon: Lightbulb, label: 'Ideas' },
    { path: '/brain', icon: BrainIcon, label: 'Brain' },
    { path: '/logs', icon: Activity, label: 'Logs' },
  ]

  return (
    <Router basename="/mayai-command-center">
      <div className="min-h-screen bg-mayai-bg">
        {/* Header */}
        <header className="bg-mayai-header border-b-2 border-mayai-accent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-mayai-accent">Mayai Command Center</h1>
              <span className="text-gray-400">| {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="text-mayai-success text-sm">
              Current: {currentActivity}
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-mayai-card border-b border-mayai-accent/20">
          <div className="flex items-center justify-center gap-2 p-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-mayai-accent text-black'
                      : 'text-white hover:bg-mayai-accent/20'
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/brain" element={<Brain />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
