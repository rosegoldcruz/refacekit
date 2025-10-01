"use client"

export function updateQueryParams(params: Record<string, string | null>) {
  if (typeof window === "undefined") return

  const url = new URL(window.location.href)

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, value)
    }
  })

  window.history.pushState({}, "", url.toString())
}

export function updateHash(hash: string) {
  if (typeof window === "undefined") return
  window.location.hash = hash
}

export function getQueryParam(key: string): string | null {
  if (typeof window === "undefined") return null
  const url = new URL(window.location.href)
  return url.searchParams.get(key)
}

export function getHash(): string {
  if (typeof window === "undefined") return ""
  return window.location.hash.slice(1)
}
