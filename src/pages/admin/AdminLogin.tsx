import { useState } from 'react';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulated Authentication
    setTimeout(() => {
      if (email === 'admin@auradental.com' && password === 'admin') {
        onLogin();
      } else {
        setError('Invalid credentials. (Hint: admin@auradental.com / admin)');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
            Aura<span className="text-primary-600">Admin</span> Secure Login
          </h1>
          <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the clinic management portal.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:bg-white transition"
                placeholder="admin@auradental.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-3">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-base focus:outline-none focus:border-primary-400 focus:bg-white transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
              <span className="text-sm text-slate-600 font-medium">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-900/20"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
            {!isLoading && <ChevronRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          Secured via JWT Authentication
        </div>
      </motion.div>
    </div>
  );
}
