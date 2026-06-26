import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl border border-slate-200">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600 font-semibold">Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">Manage your short URLs</h1>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">Shorten URLs, copy them quickly, and track clicks all in one place.</p>
          </div>
          <UrlForm/>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-2xl border border-slate-200">
          <UserUrl/>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage