import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Globe, Phone, Search, MapPin, ChevronDown } from 'lucide-react';
import { useAuthStore, useUIStore } from '../../store';
import { CITIES } from '../../data/mockData';

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuthStore();
  const { language, setLanguage } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboard = () => {
    if (role === 'user') navigate('/user/dashboard');
    else if (role === 'seller') navigate('/seller/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-dark-900 text-slate-400 text-xs py-1.5 px-4 hidden md:block">
        <div className="section-container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>🇵🇰 Pakistan's First Negotiated Service Marketplace</span>
            <span className="text-slate-600">|</span>
            <span>Currently in: Lahore, Islamabad</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-400 font-semibold flex items-center gap-1">
              <Phone size={11} /> 0311-BAZMEER
            </span>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe size={11} /> {language === 'en' ? 'اردو' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-green flex items-center justify-center text-white font-black text-lg">B</div>
              <span className="font-black text-xl tracking-tight text-dark-900">
                BAZ<span className="text-primary-500">MEER</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/search" label="Services" />
              <NavLink to="/how-it-works" label="How It Works" />
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-all">
                  For Workers <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-card-lg p-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/register/seller" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    👷 Join as a Worker
                  </Link>
                  <Link to="/how-it-works" className="flex items-center gap-2 px-3 py-2 text-sm text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    📖 Worker Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <button onClick={handleDashboard} className="btn-secondary text-sm py-2">
                    My Dashboard
                  </button>
                  <button onClick={logout} className="btn-ghost text-sm py-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-sm py-2">Login</Link>
                  <Link to="/user/post-job" onClick={(e) => { if (!isAuthenticated) { e.preventDefault(); navigate('/register'); } }} className="btn-primary text-sm py-2">
                    📋 Post a Job Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white p-4 lg:hidden animate-fade-in">
            <div className="flex flex-col gap-1">
              <MobileNavLink to="/" label="Home" onClick={() => setMobileOpen(false)} />
              <MobileNavLink to="/search" label="Browse Services" onClick={() => setMobileOpen(false)} />
              <MobileNavLink to="/how-it-works" label="How It Works" onClick={() => setMobileOpen(false)} />
              <MobileNavLink to="/register/seller" label="Join as Worker" onClick={() => setMobileOpen(false)} />
              <div className="border-t border-slate-200 pt-3 mt-2 flex gap-2">
                {isAuthenticated ? (
                  <button onClick={() => { handleDashboard(); setMobileOpen(false); }} className="btn-primary flex-1 text-sm">Dashboard</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-sm text-center">Login</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-sm text-center">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 text-slate-400">
        <div className="section-container py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl gradient-green flex items-center justify-center text-white font-black text-lg">B</div>
                <span className="font-black text-xl text-white">BAZ<span className="text-primary-400">MEER</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-4 max-w-xs">
                Pakistan's first negotiated home services marketplace. Post your job, get bids, hire with confidence.
              </p>
              <p className="text-xs text-primary-400 font-medium">کام کروائیں، قیمت تے کریں</p>
              <div className="flex items-center gap-3 mt-5">
                {['𝕏','f','in','📷'].map(s => (
                  <button key={s} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary-500 flex items-center justify-center text-xs transition-colors">{s}</button>
                ))}
              </div>
            </div>
            {/* Links */}
            <FooterCol title="Services" links={[['Home Maintenance','/search?cat=electrician'],['Cleaning','/search?cat=cleaning'],['Beauty & Wellness','/search?cat=beautician'],['Domestic Staff','/search?cat=maid'],['Home Tutors','/search?cat=tutor']]} />
            <FooterCol title="Company" links={[['About BAZMEER','#'],['How It Works','/how-it-works'],['Join as Worker','/register/seller'],['Blog','#'],['Contact','#']]} />
            <FooterCol title="Support" links={[['Help Center','#'],['Verification Guide','#'],['Privacy Policy','#'],['Terms of Service','#'],['WhatsApp Support','#']]} />
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <span>© 2026 BAZMEER (Pvt.) Ltd. · Lahore, Pakistan 🇵🇰</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">🔐 SSL Secured</span>
              <span className="flex items-center gap-1">🏢 SECP Registered</span>
              <span className="flex items-center gap-1">📱 App Coming Soon</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="px-3 py-2 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-xl hover:bg-primary-50 transition-all">
      {label}
    </Link>
  );
}
function MobileNavLink({ to, label, onClick }: { to: string; label: string; onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick} className="px-3 py-2.5 text-sm font-medium text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
      {label}
    </Link>
  );
}
function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">{title}</h4>
      <div className="flex flex-col gap-2.5">
        {links.map(([label, href]) => (
          <Link key={label} to={href} className="text-sm hover:text-primary-400 transition-colors">{label}</Link>
        ))}
      </div>
    </div>
  );
}
