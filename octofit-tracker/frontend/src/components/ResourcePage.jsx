import { useEffect, useState } from 'react'
import { fetchResource, getResourceUrl } from './resourceApi.js'

const emptyMeta = {
  count: 0,
  page: null,
  pageSize: null,
  totalItems: null,
  totalPages: null,
}

function getSummary(meta) {
  if (meta.page && meta.totalPages) {
    const totalItemsLabel = meta.totalItems ? ` of ${meta.totalItems}` : ''

    return `Page ${meta.page} of ${meta.totalPages}${totalItemsLabel}`
  }

  if (meta.totalItems) {
    return `${meta.totalItems} total records`
  }

  return `${meta.count} loaded`
}

function renderCell(column, item) {
  const value = column.render(item)

  if (value === null || value === undefined || value === '') {
    return '—'
  }

  return value
}

function ResourcePage({ resource, title, description, columns, emptyMessage }) {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(emptyMeta)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setError('')

      try {
        const result = await fetchResource(resource, controller.signal)

        setItems(result.items)
        setMeta(result.meta)
      } catch (loadError) {
        if (controller.signal.aborted) {
          return
        }

        setItems([])
        setMeta(emptyMeta)
        setError(
          loadError instanceof Error ? loadError.message : `Unable to load ${resource}`,
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      controller.abort()
    }
  }, [resource])

  return (
    <section className="card resource-card">
      <div className="card-body">
        <div className="resource-head">
          <div>
            <h2>{title}</h2>
            <p className="resource-description">{description}</p>
            <p className="status-note mb-0">
              Endpoint: <code>{getResourceUrl(resource)}</code>
            </p>
          </div>
          <span className="badge rounded-pill text-bg-dark">{getSummary(meta)}</span>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {isLoading ? <div className="alert alert-secondary mb-0">Loading {title.toLowerCase()}...</div> : null}

        {!isLoading && !error && items.length === 0 ? (
          <div className="alert alert-light border mb-0">{emptyMessage}</div>
        ) : null}

        {!isLoading && !error && items.length > 0 ? (
          <div className="table-responsive">
            <table className="table align-middle resource-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id ?? JSON.stringify(item)}>
                    {columns.map((column) => (
                      <td key={column.key}>{renderCell(column, item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ResourcePage