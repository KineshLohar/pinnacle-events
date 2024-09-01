import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Toggle button */}
      <button
        className="md:hidden fixed top-24 left-4 p-2 rounded-md bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        
      </button>

      {/* Sidebar */}
      <div
        className={`bg-indigo-800 text-white w-64 h-[40rem] mt-20 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="block lg:hidden w-full py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none text-left"
        >
          X
        </button>
        <nav className="">
          <Link href="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none">
            Dashboard
          </Link>
          <Link href="/admin/events" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none">
            Events
          </Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="block w-full py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
}