import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
  return (
    <div className="bg-indigo-800 text-white w-64 mt-20 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/admin/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
          Dashboard
        </Link>
        <Link href="/admin/events" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
          Events
        </Link>
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="block w-full py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 text-left"
      >
        Logout
      </button>
    </div>
  );
}