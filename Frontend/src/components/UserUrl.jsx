import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const backendUrl = import.meta.env.VITE_BACKEND_URL 
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-slate-500 my-6 p-6 bg-slate-50 rounded-3xl border border-slate-200">
        <svg className="w-14 h-14 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-xl font-semibold">No URLs found</p>
        <p className="mt-1 text-sm">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  const urlList = [...urls.urls].reverse();

  return (
    <div className="bg-slate-50 rounded-[2rem] p-6 shadow-inner border border-slate-200">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Your Shortened Links</h2>
          <p className="text-sm text-slate-500 mt-1">Quickly copy urls, follow links, and view click counts.</p>
        </div>
      </div>

      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-slate-200 rounded-3xl overflow-hidden border border-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {urlList.map((url) => (
              <tr key={url._id} className="hover:bg-slate-50">
                <td className="px-6 py-4 align-top w-1/2">
                  <div className="text-sm text-slate-900 break-words max-w-xs">
                    {url.fullUrl}
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <a
                    href={`${backendUrl}/${url.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900 hover:underline break-words"
                  >
                    {`${backendUrl.replace(/^https?:\/\//, '')}/${url.shortUrl}`}
                  </a>
                </td>
                <td className="px-6 py-4 align-top">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </span>
                </td>
                <td className="px-6 py-4 align-top">
                  <button
                    type="button"
                    onClick={() => handleCopy(`${backendUrl}/${url.shortUrl}`, url._id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition duration-200 ${
                      copiedId === url._id
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {copiedId === url._id ? 'Copied!' : 'Copy URL'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {urlList.map((url) => (
          <div key={url._id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm text-slate-500">Original URL</div>
            <div className="mb-4 text-sm text-slate-900 break-words">{url.fullUrl}</div>
            <div className="mb-3 text-sm text-slate-500">Short URL</div>
            <a
              href={`${backendUrl}/${url.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 block text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline break-words"
            >
              {`${backendUrl.replace(/^https?:\/\//, '')}/${url.shortUrl}`}
            </a>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(`${backendUrl}/${url.shortUrl}`, url._id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold text-white transition duration-200 ${
                  copiedId === url._id
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {copiedId === url._id ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserUrl