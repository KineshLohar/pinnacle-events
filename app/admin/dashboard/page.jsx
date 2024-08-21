'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../_components/Admin/AdminLayout'

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/admin/login');
    return null;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4 mt-24">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {session.user.name}!</p>
      {/* Add more dashboard content here */}
    </AdminLayout>
  );
}