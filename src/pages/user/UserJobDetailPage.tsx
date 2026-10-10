import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, X } from 'lucide-react';
import { MOCK_JOBS, MOCK_BIDS, SELLERS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
export default function UserJobDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
  const bids = MOCK_BIDS.filter(b => b.jobId === job.id);
  const [acceptingBid, setAcceptingBid] = useState<string|null>(null);
  const [counterBid, setCounterBid] = useState<string|null>(null);
  const [counterAmt, setCounterAmt] = useState('');

  const handleAccept = (bidId: string) => {
    toast.success('Bid accepted! Payment held in escrow.');
    navigate('/user/bookings');
  };

  return (
    <div>
      <PageHeader title={job.title} subtitle={`${job.category} · ${job.area}, ${job.city}`} backTo="/user/jobs" />
      <div className="p-4 lg:p-6 max-w-4xl">
        {/* Job summary card */}
        <div className="card p-5 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><p className="text-xs text-slate-400 uppercase font-bold">Budget</p><p className="text-sm font-bold text-dark-900">PKR {job.budgetMin.toLocaleString()} – {job.budgetMax.toLocaleString()}</p></div>
            <div><p className="text-xs text-slate-400 uppercase font-bold">Time</p><p className="text-sm font-bold text-dark-900">{job.preferredTime}</p></div>
            <div><p className="text-xs text-slate-400 uppercase font-bold">Duration</p><p className="text-sm font-bold text-dark-900">{job.bidDuration} bidding window</p></div>
            <div><p className="text-xs text-slate-400 uppercase font-bold">Bids</p><p className="text-sm font-bold text-primary-600">{job.bidCount} received</p></div>
          </div>
          <p className="text-sm text-dark-600 mt-4 leading-relaxed border-t border-slate-100 pt-4">{job.description}</p>
        </div>

        {/* Bids */}
        <h2 className="text-lg font-black text-dark-900 mb-4">Bids Received ({bids.length})</h2>
        <div className="space-y-4">
          {bids.map(bid => (
            <div key={bid.id} className={`card p-5 ${bid.isBestMatch ? 'border-primary-300 bg-primary-50/30' : ''}`}>
              {bid.isBestMatch && <div className="badge-green badge text-xs mb-3 inline-flex">⭐ Best Match</div>}
              {bid.isLowestBid && <div className="badge-orange badge text-xs mb-3 inline-flex">💰 Lowest Bid</div>}
              <div className="flex items-start gap-4">
                <div className={`avatar-lg bg-gradient-to-br ${bid.seller.color}`}>{bid.seller.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-dark-900">{bid.seller.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Star size={12} className="fill-amber-400 text-amber-400"/>
                        <span className="text-xs text-dark-600">{bid.seller.rating} · {bid.seller.reviewCount} reviews · {bid.seller.jobsCompleted} jobs</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-black text-dark-900">PKR {bid.amount.toLocaleString()}</p>
                      {bid.amount < job.budgetMin && <span className="text-xs text-green-600 font-semibold">Below your budget</span>}
                      {bid.amount > job.budgetMax && <span className="text-xs text-orange-600 font-semibold">Above budget</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">{bid.seller.badges.map(b => <span key={b.type} className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">{b.icon} {b.label}</span>)}</div>
                  <p className="text-sm text-dark-600 mt-3 leading-relaxed">{bid.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={11}/>Completes in: {bid.estimatedTime}</span>
                    <span>📅 {bid.availability}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-3 border-t border-slate-100">
                <button onClick={() => setAcceptingBid(bid.id)} className="btn-primary flex-1 text-sm">✅ Accept Bid</button>
                <button onClick={() => { setCounterBid(bid.id); setCounterAmt(String(bid.amount)); }} className="btn-secondary text-sm px-4">Counter Offer</button>
                <button onClick={() => navigate(`/providers/${bid.seller.id}`)} className="btn-ghost text-sm px-3">Profile</button>
              </div>
              {counterBid === bid.id && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm font-semibold text-amber-800 mb-3">Send Counter Offer</p>
                  <div className="flex gap-3">
                    <input type="number" value={counterAmt} onChange={e => setCounterAmt(e.target.value)} placeholder="Your price (PKR)" className="form-input flex-1 text-sm py-2" />
                    <button onClick={() => { toast.success('Counter offer sent!'); setCounterBid(null); }} className="btn-primary text-sm px-5">Send</button>
                    <button onClick={() => setCounterBid(null)} className="btn-ghost text-sm"><X size={14}/></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {bids.length === 0 && (
          <div className="card p-10 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <p className="font-bold text-dark-900 mb-2">No bids yet</p>
            <p className="text-sm text-dark-600">Professionals are reviewing your job. Check back in a few minutes.</p>
          </div>
        )}
      </div>

      {/* Accept modal */}
      {acceptingBid && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-slide-up">
            <h3 className="text-lg font-black text-dark-900 mb-2">Confirm & Pay</h3>
            <p className="text-sm text-dark-600 mb-4">Your payment will be held safely in BAZMEER escrow and released only when you confirm the job is complete.</p>
            <div className="bg-slate-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-500 mb-1">Select Payment Method</p>
              {['💚 JazzCash', '🟠 EasyPaisa', '💳 Debit Card', '👜 BAZMEER Wallet'].map(m => (
                <label key={m} className="flex items-center gap-2 py-2 cursor-pointer">
                  <input type="radio" name="payment" className="accent-primary-500"/>
                  <span className="text-sm text-dark-700">{m}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleAccept(acceptingBid)} className="btn-primary flex-1">🔐 Pay & Hire</button>
              <button onClick={() => setAcceptingBid(null)} className="btn-secondary px-4">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}