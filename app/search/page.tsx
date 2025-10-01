"use client"

import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      {query && <p className="text-gray-400">Searching for: {query}</p>}
      <p className="text-gray-400 mt-4">Search results page - Coming soon</p>
    </div>
  )
}
