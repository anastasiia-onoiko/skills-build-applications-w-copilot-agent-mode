import ResourcePage from './ResourcePage.jsx'
import { formatLabel, getLinkedName } from './resourceApi.js'

const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (user) => user.name,
  },
  {
    key: 'email',
    label: 'Email',
    render: (user) => user.email,
  },
  {
    key: 'fitnessLevel',
    label: 'Fitness Level',
    render: (user) => formatLabel(user.fitnessLevel),
  },
  {
    key: 'weeklyGoal',
    label: 'Weekly Goal',
    render: (user) => `${user.weeklyGoal} workouts`,
  },
  {
    key: 'favoriteActivity',
    label: 'Favorite Activity',
    render: (user) => user.favoriteActivity,
  },
  {
    key: 'team',
    label: 'Team',
    render: (user) => getLinkedName(user.teamId, 'No team'),
  },
]

function Users() {
  return (
    <ResourcePage
      resource="users"
      title="Users"
      description="Profiles, goals, and team assignments for each Octofit member."
      columns={columns}
      emptyMessage="No users are available yet."
    />
  )
}

export default Users