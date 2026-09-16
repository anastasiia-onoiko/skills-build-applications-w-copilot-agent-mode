import ResourcePage from './ResourcePage.jsx'
import { getLinkedName } from './resourceApi.js'

const endpointTemplate = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

const columns = [
  {
    key: 'rank',
    label: 'Rank',
    render: (entry) => entry.rank,
  },
  {
    key: 'user',
    label: 'User',
    render: (entry) => getLinkedName(entry.userId),
  },
  {
    key: 'team',
    label: 'Team',
    render: (entry) => getLinkedName(entry.teamId),
  },
  {
    key: 'score',
    label: 'Score',
    render: (entry) => entry.score,
  },
  {
    key: 'streakDays',
    label: 'Streak',
    render: (entry) => `${entry.streakDays} days`,
  },
  {
    key: 'totalWorkouts',
    label: 'Workouts',
    render: (entry) => entry.totalWorkouts,
  },
]

function Leaderboard() {
  return (
    <ResourcePage
      resource="leaderboard"
      title="Leaderboard"
      description="Ranked performance across members and teams, sorted by current standing."
      columns={columns}
      emptyMessage="No leaderboard entries are available yet."
      endpointTemplate={endpointTemplate}
    />
  )
}

export default Leaderboard