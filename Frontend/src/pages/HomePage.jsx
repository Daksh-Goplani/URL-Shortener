import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-600 font-semibold">Fast. Reliable. Beautiful.</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Shorten links that are easy to share and track.
            </h1>
            <p className="text-slate-600 max-w-2xl text-lg sm:text-xl">
              Create short URLs instantly, share them with your audience, and monitor engagement from your dashboard.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Auto copy</p>
                <p className="text-sm text-slate-500 mt-2">Copy your short URLs in one click and keep working faster.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Responsive design</p>
                <p className="text-sm text-slate-500 mt-2">Use the tool from any device with a clean mobile-first experience.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-2xl border border-slate-200">
            <UrlForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage