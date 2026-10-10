import { useNavigate } from 'react-router-dom';
import { Plus, Search, Calendar, MessageCircle, Star, Clock, ChevronRight, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store';
import { MOCK_BOOKINGS, MOCK_JOBS, MOCK_BIDS, CATEGORIES } from '../../data/mockData';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [query, setQuery] = useState('');

  const activeBookings = MOCK_BOOKINGS.filter(b => b.status === 'in_progress' || b.status === 'confirmed');
  const openJobs = MOCK_JOBS;
  const totalBids = MOCK_BIDS.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) navigate(`/user/search?q=${encodeURIComponent(query)}`);
  };

  const handleNearMe = () => {
    navigate('/user/search/nearby');
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-dark-900">Assalam-o-Alaikum, {user?.name?.split(' ')[0] || 'User'} 👋</h1>
        <p className="text-dark-600 text-sm mt-0.5">What do you need done today?</p>
      </div>

      {/* Quick Search */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-200 shadow-card p-2 flex items-center gap-2 mb-8">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search: Electrician, Plumber, Maid..."
            className="flex-1 text-sm text-dark-900 placeholder-slate-400 bg-transparent outline-none py-2"
          />
        </div>
        <button type="button" onClick={handleNearMe} className="flex items-center gap-1.5 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-xl font-medium">
          <MapPin size={14} /> Near Me
        </button>
        <button type="submit" className="btn-primary text-sm py-2 px-5">Search</button>
      </form>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { icon: '📋', label: 'Post a Job', action: () => navigate('/user/post-job'), primary: true },
          { icon: '🔍', label: 'Search Pros', action: () => navigate('/user/search') },
          { icon: '📅', label: 'Bookings', action: () => navigate('/user/bookings') },
          { icon: '💬', label: 'Messages', action: () => navigate('/user/chat') },
        ].map(({ icon, label, action, primary }) => (
          <button
            key={label}
            onClick={action}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all hover:-translate-y-0.5 ${primary ? 'bg-primary-500 text-white shadow-green' : 'bg-white border border-slate-200 text-dark-700 hover:border-primary-300 hover:text-primary-600 shadow-card'}`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs font-bold leading-tight">{label}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Bookings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-dark-900">Active Bookings</h2>
            <button onClick={() => navigate('/user/bookings')} className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight size={14} />
            </button>
          </div>
          {activeBookings.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="text-4xl mb-3">📅</div>
              <p className="font-semibold text-dark-900 mb-1">No active bookings</p>
              <p className="text-sm text-dark-600 mb-4">Post a job or search for a professional to get started.</p>
              <button onClick={() => navigate('/user/post-job')} className="btn-primary text-sm px-6">Post a Job</button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeBookings.map(b => (
                <div key={b.id} onClick={() => navigate(`/user/bookings/${b.id}`)} className="card-hover p-4 flex items-center gap-4">
                  <div className={`avatar-md bg-gradient-to-br ${b.seller.color}`}>{b.seller.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-dark-900 truncate">{b.jobTitle}</p>
                    <p className="text-xs text-slate-500">{b.seller.name} · {b.category}</p>
                    <p className="text-xs text-primary-600 font-medium mt-0.5 flex items-center gap-1"><Clock size={10} /> {new Date(b.scheduledAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div>
                    <span className={`badge text-xs ${b.status === 'in_progress' ? 'badge-blue' : 'badge-green'}`}>
                      {b.status === 'in_progress' ? '🔨 In Progress' : '✅ Confirmed'}
                    </span>
                    <p className="text-sm font-bold text-dark-900 mt-1 text-right">PKR {b.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Open Jobs & Bids */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-dark-900">Your Jobs</h2>
            <button onClick={() => navigate('/user/jobs')} className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight size={14} />
            </button>
          </div>
          {openJobs.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold text-dark-900 mb-4">No jobs posted yet</p>
              <button onClick={() => navigate('/user/post-job')} className="btn-primary text-sm px-6">Post Your First Job</button>
            </div>
          ) : (
            <div className="space-y-3">
              {openJobs.map(job => (
                <div key={job.id} onClick={() => navigate(`/user/jobs/${job.id}`)} className="card-hover p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-dark-900 truncate">{job.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 capitalize">{job.category} · {job.area}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Budget: PKR {job.budgetMin.toLocaleString()} – {job.budgetMax.toLocaleString()}</p>
                    </div>
                    <span className="badge-green badge text-xs flex-shrink-0">🟢 Open</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">{job.bidCount}</div>
                      <span className="text-xs font-semibold text-primary-700">
                        {job.bidCount === 0 ? 'No bids yet' : `${job.bidCount} bid${job.bidCount > 1 ? 's' : ''} received!`}
                      </span>
                    </div>
                    <button className="text-xs font-semibold text-primary-600 hover:underline">View Bids →</button>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate('/user/post-job')} className="w-full border-2 border-dashed border-primary-200 rounded-2xl p-4 text-center hover:border-primary-400 hover:bg-primary-50 transition-all">
                <span className="text-sm font-semibold text-primary-600">+ Post Another Job</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Quick Access */}
      <div className="mt-8">
        <h2 className="text-lg font-black text-dark-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {CATEGORIES.slice(0, 8).map(cat => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/user/search?cat=${cat.slug}`)}
              className="card-hover p-3 flex flex-col items-center gap-1.5 text-center"
            >
              <div className="w-10 h-10 rounded-xl text-xl flex items-center justify-center" style={{ background: cat.bgColor }}>{cat.icon}</div>
              <span className="text-xs font-semibold text-dark-700 leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
