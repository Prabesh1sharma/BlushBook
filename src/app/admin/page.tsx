'use client';

import { useState } from 'react';
import { encodeNames, VALENTINE_DAYS } from '@/utils/encoding';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [encodedToken, setEncodedToken] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
    }
  };

  const handleGenerateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!from.trim() || !to.trim()) {
      setError('Please fill in both From and To fields');
      return;
    }

    const encoded = encodeNames(from.trim(), to.trim());
    setEncodedToken(encoded);
    setCopiedSlug(null);
  };
  
  const copyToClipboard = (url: string, slug: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md w-full animate-fadeIn">
          <h1
            className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-pink-700 mb-2 font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-pink-700 mb-2 font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="romantic-btn w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const dayLinks = encodedToken
    ? VALENTINE_DAYS.map((day) => ({
        ...day,
        infoUrl: `${baseUrl}/valentine/${day.slug}`,
        wishUrl: `${baseUrl}/valentine/${day.slug}/${encodedToken}`,
      }))
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="glass-card p-8 max-w-2xl w-full animate-fadeIn">
        <h1
          className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Generate Valentine Week Links
        </h1>
        <p className="text-center text-pink-700 mb-6 text-sm">
          Enter the names once and get separate links for each Valentine Week day:
          one page to explain the day and one page to wish them.
        </p>

        <form onSubmit={handleGenerateUrl} className="space-y-4">
          <div>
            <label htmlFor="from" className="block text-pink-700 mb-2 font-semibold">
              From (Who is sending the wishes)
            </label>
            <input
              id="from"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800"
              placeholder="Enter sender's name"
              required
            />
          </div>

          <div>
            <label htmlFor="to" className="block text-pink-700 mb-2 font-semibold">
              To (Who will receive the wishes)
            </label>
            <input
              id="to"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-gray-800"
              placeholder="Enter recipient's name"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="romantic-btn w-full"
          >
            Generate URL
          </button>
        </form>

        {encodedToken && dayLinks.length > 0 && (
          <div className="mt-6 p-4 bg-white/60 rounded-lg border-2 border-pink-200 space-y-4">
            <div>
              <p className="text-pink-700 font-semibold mb-1">
                Encoded names token:
              </p>
              <p className="text-xs break-all bg-white/70 px-3 py-2 rounded border border-pink-100">
                {encodedToken}
              </p>
            </div>

            <p className="text-sm text-pink-700">
              Share these links with your special one. Each day has:
              <span className="font-semibold"> “Know about the day”</span> and
              <span className="font-semibold"> “Wish page”</span> with their names.
            </p>

            <div className="max-h-80 overflow-auto space-y-3">
              {dayLinks.map((day) => (
                <div
                  key={day.slug}
                  className="border border-pink-100 rounded-lg p-3 bg-white/80"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{day.emoji}</span>
                      <div>
                        <p className="font-semibold text-pink-700">
                          {day.name}
                        </p>
                        <p className="text-xs text-pink-500">{day.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="font-semibold text-pink-700 mb-1">
                        Know what this day means:
                      </p>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          readOnly
                          value={day.infoUrl}
                          className="flex-1 px-2 py-1 rounded border border-pink-200 bg-white text-[11px]"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(day.infoUrl, `${day.slug}-info`)
                          }
                          className="px-3 py-1 bg-pink-500 text-white rounded text-[11px] hover:bg-pink-600"
                        >
                          {copiedSlug === `${day.slug}-info`
                            ? 'Copied!'
                            : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-pink-700 mb-1">
                        Wish page (with names):
                      </p>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          readOnly
                          value={day.wishUrl}
                          className="flex-1 px-2 py-1 rounded border border-pink-200 bg-white text-[11px]"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(day.wishUrl, `${day.slug}-wish`)
                          }
                          className="px-3 py-1 bg-rose-500 text-white rounded text-[11px] hover:bg-rose-600"
                        >
                          {copiedSlug === `${day.slug}-wish`
                            ? 'Copied!'
                            : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

