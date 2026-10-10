import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_BIDS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
const TABS = ['All', 'Pending', 'Accepted', 'Rejected'];
export default function MyBidsPage() {
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My Bids" subtitle="Bids you have submitted"/>
      <div className="p-4 lg:p-6">
        <div className="flex gap-2 mb-5 overflow-x-auto">
          {TABS.map(t => <button key={t} onClick={() => setTab(t)} className={`text-sm font-semibold px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${tab === t ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-slate-200 text-dark-600'}`}>{t}</button>)}
        </div>
        <div className="space-y-4">
          {MOCK_BIDS.map(bid => (
            <div key={bid.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-dark-900">Job #{bid.jobId}</p>
                  <p className="text-sm text-slate-500 mt-0.5">Submitted: {new Date(bid.submittedAt).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{bid.availability}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-dark-900">PKR {bid.amount.toLocaleString()}</p>
                  <span className={`badge text-xs mt-1 ${bid.status === 'accepted' ? 'badge-green' : bid.status === 'rejected' ? 'badge-red' : 'badge-orange'}`}>
                    {bid.status === 'pending' ? '⏳ Pending' : bid.status === 'accepted' ? '✅ Accepted' : '❌ Rejected'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-dark-600 mt-3 leading-relaxed line-clamp-2">{bid.message}</p>
              {bid.status === 'accepted' && <button className="btn-primary w-full mt-4 text-sm">View Booking →</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}