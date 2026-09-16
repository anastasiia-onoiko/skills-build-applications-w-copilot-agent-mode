import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import {
  apiBaseUrl,
  isInferredCodespaceName,
  isLocalApiFallback,
} from './components/resourceApi.js'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function getEnvMessage() {
  if (isInferredCodespaceName) {
    return 'VITE_CODESPACE_NAME is not set. The app inferred the Codespaces host from the current URL; define it in .env.local for a stable API target.'
  }

  if (isLocalApiFallback) {
    return 'VITE_CODESPACE_NAME is not set. The app is using the local fallback at http://localhost:8000/api.'
  }

  return null
}

function App() {
  const envMessage = getEnvMessage()

  return (
    <div className="app-shell">
      <header className="app-hero">
        <div className="container py-5">
          <div className="hero-panel">
            <div className="brand-lockup">
              <img src={logo} className="brand-mark" width="84" height="84" alt="Octofit Tracker logo" />
              <div>
                <p className="eyebrow">React 19 Presentation Tier</p>
                <h1>Octofit Tracker</h1>
                <p className="hero-copy">
                  Browse users, teams, activities, leaderboard standings, and personalized workouts through route-based views backed by the Express API.
                </p>
              </div>
            </div>
            <div className="hero-meta">
              <span className="badge rounded-pill text-bg-light">Bootstrap UI</span>
              <span className="badge rounded-pill text-bg-light">react-router-dom</span>
              <span className="badge rounded-pill text-bg-light">Paginated response safe</span>
            </div>
            <div className="api-target">
              <span>API target</span>
              <code>{apiBaseUrl}</code>
            </div>
            {envMessage ? (
              <div className="alert alert-warning env-alert mb-0" role="alert">
                {envMessage}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="container pb-5">
        <nav className="nav nav-pills route-nav mb-4" aria-label="Octofit sections">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
