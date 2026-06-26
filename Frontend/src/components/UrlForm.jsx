import { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from 'react-redux'
import { useQueryClient } from "@tanstack/react-query";

function UrlForm({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customSlug, setCustomSlug] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)
  const queryClient = useQueryClient()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("")

    try {
      const response = await createShortUrl(url, customSlug.trim() || undefined)
      setShortUrl(response.shortUrl);
      queryClient.invalidateQueries(['userUrls'])
      setCopied(false);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to shorten URL. Please try again.')
      setShortUrl("")
      setCopied(false)
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
      >
        <label
          htmlFor="url"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Enter URL
        </label>

        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        />

        <button
          type="submit"
          className="w-full mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Shorten URL 🚀
        </button>
      </form>

      {isAuthenticated && (
        <div className="mt-4">
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {errorMessage && (
        <div className="max-w-xl mx-auto mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {shortUrl && (
        <div className="max-w-xl mx-auto mt-6">
          <div className="rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                ✅
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  URL Shortened Successfully
                </h2>
                <p className="text-sm text-slate-500">
                  Your link is ready to share
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-blue-600 font-medium shadow-sm hover:text-blue-700 hover:underline truncate"
              >
                {shortUrl}
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${copied
                  ? "bg-green-600 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105"
                  }`}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UrlForm;