import { useState, useEffect } from 'react';
import { LogOut, FileText } from 'lucide-react';
import AdminLogin from './admin/AdminLogin';
import CMSModule from './admin/CMSModule';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean, hasUri: boolean } | null>(null);

  useEffect(() => {
    fetch('/api/db-status')
      .then(res => res.json())
      .then(data => setDbStatus(data))
      .catch(err => console.error("Could not fetch DB status"));
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      {/* Mobile-first layout container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative flex flex-col">
        {/* Mobile Header */}
        <header className="min-h-[4rem] py-2 bg-white border-b border-slate-100 px-4 flex flex-wrap items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <span className="text-lg font-display font-bold text-slate-900 tracking-tight">
              Aura<span className="text-primary-600">Admin</span>
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5" />
          </button>
          {dbStatus && (
            <div className="w-full mt-2 text-[10px] flex items-center justify-between">
              <span className="text-slate-500 font-mono">DB Status:</span>
              {dbStatus.connected ? (
                <span className="text-emerald-600 font-bold tracking-tight">🟢 MongoDB Connected</span>
              ) : dbStatus.hasUri ? (
                <span className="text-red-500 font-bold tracking-tight">🔴 Connection Error to MongoDB</span>
              ) : (
                <span className="text-amber-500 font-bold tracking-tight">🟡 Local Storage Only (No URI)</span>
              )}
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto w-full mt-4">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h1 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" /> CMS & Content
            </h1>
            <p className="text-xs text-slate-500 mt-1">Manage services, gallery, and blog.</p>
          </div>
          
          <div className="p-4">
            <CMSModule />
          </div>
        </main>
      </div>
    </div>
  );
}
