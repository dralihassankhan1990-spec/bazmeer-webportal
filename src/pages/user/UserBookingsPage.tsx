import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_BOOKINGS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
const TABS = ['All', 'Active', 'Upcoming', 'Completed', 'Cancelled'];
const STATUS_MAP: Record<string, string> = { in_progress: 'In Progress', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' };
const STATUS_COLOR: Record<string, string> = { in_progress: 'badge-blue', confirmed: 'badge-green', completed: 'badge-gray', cancelled: 'badge-red' };
export default function UserBookingsPage() {
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();
  const bookings = tab === 'All' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => {
    if (tab === 'Active') return b.status === 'in_progress';
    if (tab === 'Upcoming') return b.status === 'confirmed';
    if (tab === 'Completed') return b.status === 'completed';
    if (tab === 'Cancelled') return b.status === 'cancelled';
    return true;
  });
  return (
    <div>
      <PageHeader title="My Bookings" subtitle="All your service bookings" />
      <div className="p-4 lg:p-6">
        <div className="flex gap-2 mb-5 overflow-x-auto">
          {TABS.map(t => <button key={t} onClick={() => setTab(t)} className={`text-sm font-semibold px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${tab === t ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-slate-200 text-dark-600 hover:border-primary-300'}`}>{t}</button>)}
        </div>
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} onClick={() => navigate(`/user/bookings/${b.id}`)} className="card-hover p-5">
              <div className="flex items-start gap-4">
                <div className={`avatar-lg bg-gradient-to-br ${b.seller.color}`}>{b.seller.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-dark-900">{b.jobTitle}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{b.seller.name} · {b.category}</p>
                      <p className="text-xs text-slate-400 mt-0.5">📅 {new Date(b.scheduledAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-dark-900">PKR {b.amount.toLocaleString()}</p>
                      <span className={`badge text-xs mt-1 ${STATUS_COLOR[b.status] || 'badge-gray'}`}>{STATUS_MAP[b.status]}</span>
                    </div>
                  </div>
                  {b.isEscrowHeld && <p className="text-xs text-blue-600 font-medium mt-2">🔐 Payment held in escrow</p>}
                  {!b.isReviewed && b.status === 'completed' && (
                    <button onClick={e => { e.stopPropagation(); }} className="text-xs text-primary-600 font-semibold mt-2 hover:underline">⭐ Leave a Review</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">No bookings in this category</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}