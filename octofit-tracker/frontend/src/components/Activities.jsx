import ResourcePage from './ResourcePage.jsx'
import { formatDate, formatLabel, getLinkedName } from './resourceApi.js'

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
    />
  )
}

export default Activities