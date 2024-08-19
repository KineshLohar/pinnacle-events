import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}