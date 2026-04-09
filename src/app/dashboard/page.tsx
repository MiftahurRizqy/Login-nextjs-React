'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function Dashboard() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error(e);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-white p-6 md:p-12 font-sans relative overflow-hidden transition-colors duration-500">
      <DarkModeToggle />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-300/40 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-300/40 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-16 backdrop-blur-md bg-white/70 dark:bg-white/5 p-6 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl transition-all">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-1">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome to your secure area.</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-6 sm:mt-0 px-6 py-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 border border-transparent dark:border-white/10 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            {isLoggingOut ? 'Logging out...' : 'Log out'}
            {!isLoggingOut && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
          </button>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Overview', value: 'Active', color: 'from-green-500 to-emerald-400' },
            { title: 'Security', value: 'Protected', color: 'from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400' },
            { title: 'Session', value: 'Valid JWT', color: 'from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400' },
          ].map((card, idx) => (
            <div key={idx} className="bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 backdrop-blur-md dark:hover:bg-white/10 hover:shadow-lg transition-all cursor-default group shadow-sm">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-4">{card.title}</h3>
              <div className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.color}`}>
                {card.value}
              </div>
              <div className="w-full h-1 mt-6 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${card.color} w-3/4 group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </main>
        
        <div className="mt-12 p-8 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl backdrop-blur-md text-center shadow-lg transition-all">
            <h2 className="text-xl font-semibold mb-4">Protected Route Accessed Successfully!</h2>
            <p className="text-gray-600 dark:text-gray-400">If you are seeing this page, it means your JWT was parsed from the HttpOnly cookie and validated correctly. You can log out to clear the session.</p>
        </div>
      </div>
    </div>
  );
}
