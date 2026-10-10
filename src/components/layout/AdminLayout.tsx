import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserCheck, AlertTriangle, CreditCard, Tag, BarChart3, Settings, LogOut, Clock } from 'lucide-react';
import { useAuthStore } from '../../store';

const NAV_ITEMS = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/sellers', icon: UserCheck, label: 'Sellers' },
  { path: '/admin/sellers/pending', icon: Clock, label: 'Pending Verifications', badge: '12' },
  { path: '/admin/disputes', icon: AlertTriangle, label: 'Disputes', badge: '3' },
  { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { path: '/admin/categories', icon: Tag, label: 'Categories' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="flex flex-col w-64 bg-dark-900 fixed left-0 top-0 bottom-0 z-40">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-green flex items-center justify-center text-white font-black">B</div>
            <span className="font-black text-lg text-white">BAZ<span className="text-primary-400">MEER</span></span>
          </Link>
          <div className="mt-1">
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label, badge }) => {
            const active = isActive(path);
            return (
              <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all ${active ? 'text-white bg-primary-600' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                <Icon size={16} />
                <span>{label}</span>
                {badge && <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={16} /><span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  );
}
