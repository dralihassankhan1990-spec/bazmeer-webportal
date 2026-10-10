import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
export default function CreateGigPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [desc, setDesc] = useState('');
  const [prices, setPrices] = useState({ basic: 500, standard: 1200, premium: 2500 });
  return (
    <div>
      <PageHeader title="Create New Gig" backTo="/seller/gigs"/>
      <div className="p-4 lg:p-6 max-w-lg space-y-5">
        <div className="card p-5 space-y-4">
          <div><label className="form-label">Gig Title *</label><input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Professional Electrical Repair & Wiring" className="form-input"/></div>
          <div><label className="form-label">Category *</label><select value={cat} onChange={e => setCat(e.target.value)} className="form-input"><option value="">Select category</option>{CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
          <div><label className="form-label">Description *</label><textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="What do you offer? What's your process?" className="form-input min-h-28 resize-none"/></div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Pricing Packages</h3>
          <div className="space-y-3">
            {(['basic','standard','premium'] as const).map((tier, i) => (
              <div key={tier} className="flex items-center gap-3">
                <div className={`w-20 text-xs font-bold capitalize px-2 py-1 rounded-xl text-center ${i===0?'bg-slate-100 text-slate-600':i===1?'bg-primary-100 text-primary-700':'bg-amber-100 text-amber-700'}`}>{tier}</div>
                <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2"><span className="text-xs text-slate-400">PKR</span><input type="number" value={prices[tier]} onChange={e => setPrices(p => ({...p, [tier]: Number(e.target.value)}))} className="flex-1 outline-none text-sm font-bold text-dark-900 bg-transparent"/></div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { if (!title || !cat) return toast.error('Fill in all required fields'); toast.success('Gig created!'); navigate('/seller/gigs'); }} className="btn-primary w-full py-3">Create Gig</button>
      </div>
    </div>
  );
}