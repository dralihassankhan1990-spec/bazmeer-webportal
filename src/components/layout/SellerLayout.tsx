import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, FileText, ShoppingBag, MessageCircle, DollarSign, FileCheck, CreditCard, Bell, User, LogOut, Plus, Star } from 'lucide-react';
import { useAuthStore, useNotificationStore } from '../../store';

const NAV_ITEMS = [
  { path: '/seller/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/seller/job-feed', icon: Briefcase, label: 'Job Feed', badge: 'live' },
  { path: '/seller/bids', icon: FileText, label: 'My Bids' },
  { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/seller/gigs', icon: Star, label: 'My Gigs' },
  { path: '/seller/chat', icon: MessageCircle, label: 'Messages' },
  { path: '/seller/earnings', icon: DollarSign, label: 'Earnings' },
  { path: '/seller/documents', icon: FileCheck, label: 'Documents' },
  { path: '/seller/subscription', icon: CreditCard, label: 'Subscription' },
  { path: '/seller/notifications', icon: Bell, label: 'Notifications' },
  { path: '/seller/profile', icon: User, label: 'Profile' },
];

const BOTTOM_NAV = [
  { path: '/seller/dashboard', icon: Home, label: 'Home' },
  { path: '/seller/job-feed', icon: Briefcase, label: 'Jobs' },
  { path: '/seller/bids', icon: FileText, label: 'Bids' },
  { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/seller/profile', icon: User, label: 'Profile' },
];

export default function SellerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { seller, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed left-0 top-0 bottom-0 z-40">
        <div className="p-5 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-green flex items-center justify-center text-white font-black">B</div>
            <span className="font-black text-lg">BAZ<span className="text-primary-500">MEER</span></span>
          </Link>
          <div className="mt-1">
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">Worker Portal</span>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className={`avatar-md bg-gradient-to-br ${seller?.color || 'from-emerald-500 to-teal-600'}`}>
              {seller?.initials || 'S'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{seller?.name || 'Seller'}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-xs text-slate-500">{seller?.rating} · {seller?.jobsCompleted} jobs</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label, badge }) => (
            <Link key={path} to={path} className={`sidebar-item mb-0.5 ${isActive(path) ? 'active' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
              {badge === 'live' && <span className="ml-auto flex items-center gap-1 text-xs text-green-600 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-green"></span>Live</span>}
              {label === 'Notifications' && unreadCount > 0 && <span className="ml-auto bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <button onClick={() => { logout(); navigate('/'); }} className="sidebar-item w-full text-red-500 hover:bg-red-50">
            <LogOut size={16} /><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-green flex items-center justify-center text-white font-black text-sm">B</div>
          <span className="font-black text-lg">BAZ<span className="text-primary-500">MEER</span></span>
        </Link>
        <Link to="/seller/notifications" className="relative p-2 rounded-xl hover:bg-slate-100">
          <Bell size={18} />
          {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>}
        </Link>
      </div>

      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0 pt-14 lg:pt-0">
        <Outlet />
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2">
        <div className="flex items-center justify-around">
          {BOTTOM_NAV.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <Link key={path} to={path} className={`mobile-nav-item ${active ? 'active' : ''}`}>
                <Icon size={20} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
