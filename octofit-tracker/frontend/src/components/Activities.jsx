import ResourcePage from './ResourcePage.jsx'
import { formatDate, formatLabel, getLinkedName } from './resourceApi.js'

const endpointTemplate = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`

const columns = [
  {
    key: 'user',
    label: 'User',
    render: (activity) => getLinkedName(activity.userId),
  },
  {
    key: 'type',
    label: 'Activity',
    render: (activity) => activity.type,
  },
  {
    key: 'intensity',
    label: 'Intensity',
    render: (activity) => formatLabel(activity.intensity),
  },
  {
    key: 'duration',
    label: 'Duration',
    render: (activity) => `${activity.durationMinutes} min`,
  },
  {
    key: 'calories',
    label: 'Calories',
    render: (activity) => activity.caloriesBurned,
  },
  {
    key: 'completedAt',
    label: 'Completed',
    render: (activity) => formatDate(activity.completedAt),
  },
]

function Activities() {
  return (
    <ResourcePage
      resource="activities"
      title="Activities"
      description="Recent workouts with duration, effort level, and calories burned."
      columns={columns}
      emptyMessage="No activities are available yet."
      endpointTemplate={endpointTemplate}
    />
  )
}

export default Activities