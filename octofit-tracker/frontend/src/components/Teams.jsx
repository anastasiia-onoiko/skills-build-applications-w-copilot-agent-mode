import ResourcePage from './ResourcePage.jsx'

const endpointTemplate = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`

const columns = [
  {
    key: 'name',
    label: 'Team',
    render: (team) => team.name,
  },
  {
    key: 'city',
    label: 'City',
    render: (team) => team.city,
  },
  {
    key: 'focus',
    label: 'Focus',
    render: (team) => team.focus,
  },
  {
    key: 'captainName',
    label: 'Captain',
    render: (team) => team.captainName,
  },
  {
    key: 'memberCount',
    label: 'Members',
    render: (team) => team.memberCount,
  },
]

function Teams() {
  return (
    <ResourcePage
      resource="teams"
      title="Teams"
      description="Community squads organized by city, focus area, and captain leadership."
      columns={columns}
      emptyMessage="No teams are available yet."
      endpointTemplate={endpointTemplate}
    />
  )
}

export default Teams