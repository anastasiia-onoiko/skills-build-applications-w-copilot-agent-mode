const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() ?? ''

function inferCodespaceName() {
  if (typeof window === 'undefined') {
    return ''
  }

  const match = window.location.hostname.match(/^(.*)-5173\.app\.github\.dev$/)

  return match?.[1] ?? ''
}

const inferredCodespaceName = inferCodespaceName()
const resolvedCodespaceName = configuredCodespaceName || inferredCodespaceName

export const isInferredCodespaceName = !configuredCodespaceName && Boolean(inferredCodespaceName)
export const isLocalApiFallback = !resolvedCodespaceName
export const apiBaseUrl = resolvedCodespaceName
  ? `https://${resolvedCodespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getResourceUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

function readNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}

function readMeta(payload, items) {
  if (!payload || Array.isArray(payload)) {
    return {
      count: items.length,
      page: null,
      pageSize: null,
      totalItems: null,
      totalPages: null,
    }
  }

  return {
    count: items.length,
    page: readNumber(payload.page),
    pageSize: readNumber(payload.pageSize ?? payload.limit),
    totalItems: readNumber(payload.totalItems ?? payload.total ?? payload.count),
    totalPages: readNumber(payload.totalPages ?? payload.pages),
  }
}

export async function fetchResource(resource, signal) {
  const response = await fetch(getResourceUrl(resource), { signal })

  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new Error(payload?.message ?? `Request failed with status ${response.status}`)
  }

  const items = readItems(payload)

  return {
    items,
    meta: readMeta(payload, items),
  }
}

export function formatDate(value) {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function formatLabel(value) {
  if (!value || typeof value !== 'string') {
    return '—'
  }

  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

export function getLinkedName(value, fallback = '—') {
  if (!value) {
    return fallback
  }

  if (typeof value === 'string') {
    return value
  }

  return value.name ?? value.title ?? value.email ?? fallback
}