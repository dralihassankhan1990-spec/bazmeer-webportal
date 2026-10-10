import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [role, setRole] = useState<'user'|'seller'|'admin'>('user');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    toast.success(`Logged in as ${role}!`);
    if (role === 'user') navigate('/user/dashboard');
    else if (role === 'seller') navigate('/seller/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center text-white font-black text-xl">B</div>
            <span className="font-black text-2xl">BAZ<span className="text-primary-500">MEER</span></span>
          </Link>
          <h1 className="text-2xl font-black text-dark-900">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to continue</p>
        </div>

        <div className="card p-6 lg:p-8">
          {/* Role Tabs */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            {(['user','seller','admin'] as const).map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${role === r ? 'bg-white shadow-card text-dark-900' : 'text-slate-500'}`}>
                {r === 'user' ? '👤 Customer' : r === 'seller' ? '👷 Worker' : '⚙️ Admin'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="form-label">Phone Number</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="0300-1234567" className="form-input" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="••••••••" className="form-input" />
            </div>
            <button type="submit" className="btn-primary w-full py-3 mt-2">
              Sign In →
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Register free</Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Demo: click Sign In with any credentials to log in as selected role
        </p>
      </div>
    </div>
  );
}
