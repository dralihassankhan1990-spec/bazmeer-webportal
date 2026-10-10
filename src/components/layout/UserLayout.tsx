import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, Search, FileText, Calendar, MessageCircle, CreditCard, Heart, Bell, User, Settings, LogOut, Menu, X, MapPin, Plus } from 'lucide-react';
import { useAuthStore, useUIStore, useNotificationStore } from '../../store';

const NAV_ITEMS = [
  { path: '/user/dashboard', icon: Home, label: 'Home' },
  { path: '/user/search', icon: Search, label: 'Search' },
  { path: '/user/jobs', icon: FileText, label: 'My Jobs' },
  { path: '/user/bookings', icon: Calendar, label: 'Bookings' },
  { path: '/user/chat', icon: MessageCircle, label: 'Messages' },
  { path: '/user/payments', icon: CreditCard, label: 'Wallet' },
  { path: '/user/favorites', icon: Heart, label: 'Saved' },
  { path: '/user/notifications', icon: Bell, label: 'Alerts' },
  { path: '/user/profile', icon: User, label: 'Profile' },
];

const BOTTOM_NAV = [
  { path: '/user/dashboard', icon: Home, label: 'Home' },
  { path: '/user/search', icon: Search, label: 'Search' },
  { path: '/user/post-job', icon: Plus, label: 'Post Job' },
  { path: '/user/bookings', icon: Calendar, label: 'Bookings' },
  { path: '/user/profile', icon: User, label: 'Profile' },
];

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-5 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-green flex items-center justify-center text-white font-black">B</div>
            <span className="font-black text-lg text-dark-900">BAZ<span className="text-primary-500">MEER</span></span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="avatar-md bg-gradient-to-br from-primary-500 to-primary-700 text-sm">
              {user?.initials || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-dark-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500">{user?.city || 'Lahore'}</p>
            </div>
          </div>
          <Link to="/user/post-job" className="btn-primary w-full mt-3 text-xs py-2">
            <Plus size={14} /> Post a Job
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`sidebar-item mb-0.5 ${isActive(path) ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
              {label === 'Alerts' && unreadCount > 0 && (
                <span className="ml-auto bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-200">
          <button onClick={() => { logout(); navigate('/'); }}
            className="sidebar-item w-full text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut size={16} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-green flex items-center justify-center text-white font-black text-sm">B</div>
          <span className="font-black text-lg text-dark-900">BAZ<span className="text-primary-500">MEER</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/user/notifications" className="relative p-2 rounded-xl hover:bg-slate-100">
            <Bell size={18} className="text-dark-600" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0 pt-14 lg:pt-0">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2">
        <div className="flex items-center justify-around">
          {BOTTOM_NAV.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            const isPost = label === 'Post Job';
            return (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-item ${active ? 'active' : ''} ${isPost ? 'relative -top-3' : ''}`}
              >
                {isPost ? (
                  <div className="w-12 h-12 rounded-2xl gradient-green flex items-center justify-center shadow-green">
                    <Icon size={22} className="text-white" />
                  </div>
                ) : (
                  <>
                    <Icon size={20} />
                    <span className="text-xs font-medium">{label}</span>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
