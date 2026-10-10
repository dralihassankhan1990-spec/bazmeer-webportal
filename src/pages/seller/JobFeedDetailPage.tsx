import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_JOBS, MARKET_RATES } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
export default function JobFeedDetailPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
  const market = MARKET_RATES[job.category];
  const [amount, setAmount] = useState(market?.typical || 1200);
  const [proposal, setProposal] = useState('');
  const [time, setTime] = useState('2 hours');
  const [avail, setAvail] = useState('Today 4-7 PM');
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = () => {
    if (!proposal || proposal.length < 20) return toast.error('Please write a proposal (min 20 characters)');
    toast.success('Bid submitted! You will be notified when the client responds.');
    navigate('/seller/bids');
  };
  return (
    <div>
      <PageHeader title="Job Detail" backTo="/seller/job-feed"/>
      <div className="p-4 lg:p-6 max-w-2xl space-y-5">
        <div className="card p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className="text-lg font-black text-dark-900">{job.title}</h2>
              <p className="text-sm text-slate-500 capitalize">{job.category} · {job.area}, {job.city}</p>
            </div>
            <span className="badge-green badge">🟢 Open</span>
          </div>
          <p className="text-sm text-dark-600 leading-relaxed mb-4">{job.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">Client Budget</p><p className="font-bold text-dark-900">PKR {job.budgetMin.toLocaleString()} – {job.budgetMax.toLocaleString()}</p></div>
            <div className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">Preferred Time</p><p className="font-bold text-dark-900">{job.preferredTime}</p></div>
            <div className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">Bids So Far</p><p className="font-bold text-dark-900">{job.bidCount} bids</p></div>
            <div className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400">Market Rate</p><p className="font-bold text-primary-600">PKR {market?.typical.toLocaleString()}</p></div>
          </div>
        </div>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="btn-primary w-full py-3 text-base">💰 Submit Your Bid</button>
        ) : (
          <div className="card p-5 space-y-4 animate-fade-in">
            <h3 className="font-bold text-dark-900">Your Bid</h3>
            <div><label className="form-label">Your Price (PKR)</label>
              <div className="flex items-center gap-2">
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="form-input" min={100} step={50}/>
                {market && <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${amount < job.budgetMin ? 'bg-amber-50 text-amber-700' : amount > job.budgetMax ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
                  {amount < job.budgetMin ? 'Below client budget' : amount > job.budgetMax ? 'Above client budget' : '✓ Within budget'}
                </span>}
              </div>
            </div>
            <div><label className="form-label">Your Proposal *</label>
              <textarea value={proposal} onChange={e => setProposal(e.target.value)} placeholder="Apna tajruba batayein. Kab available hain? Kitna time lagega?" className="form-input min-h-28 resize-none" maxLength={300}/>
              <p className="text-xs text-slate-400 mt-1">{proposal.length}/300 (min 20)</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="form-label">Completion Time</label><select value={time} onChange={e => setTime(e.target.value)} className="form-input text-sm"><option>1 hour</option><option>2 hours</option><option>3 hours</option><option>Half day</option><option>1 day</option></select></div>
              <div><label className="form-label">Availability</label><select value={avail} onChange={e => setAvail(e.target.value)} className="form-input text-sm"><option>Today 2-5 PM</option><option>Today 4-7 PM</option><option>Tomorrow Morning</option><option>Tomorrow Afternoon</option></select></div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="btn-primary flex-1">Submit Bid</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary px-4">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}