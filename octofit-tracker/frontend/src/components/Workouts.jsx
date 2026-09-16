import ResourcePage from './ResourcePage.jsx'
import { formatDate, getLinkedName } from './resourceApi.js'

const columns = [
  {
    key: 'user',
    label: 'User',
    render: (workout) => getLinkedName(workout.userId),
  },
  {
    key: 'title',
    label: 'Workout',
    render: (workout) => workout.title,
  },
  {
    key: 'category',
    label: 'Category',
    render: (workout) => workout.category,
  },
  {
    key: 'scheduledFor',
    label: 'Scheduled',
    render: (workout) => formatDate(workout.scheduledFor),
  },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (workout) => `${workout.durationMinutes} min`,
  },
  {
    key: 'targetArea',
    label: 'Target Area',
    render: (workout) => workout.targetArea,
  },
  {
    key: 'coachTip',
    label: 'Coach Tip',
    render: (workout) => workout.coachTip,
  },
]

function Workouts() {
  return (
    <ResourcePage
      resource="workouts"
      title="Workouts"
      description="Scheduled training plans with coaching prompts and target areas."
      columns={columns}
      emptyMessage="No workouts are available yet."
    />
  )
}

export default Workouts