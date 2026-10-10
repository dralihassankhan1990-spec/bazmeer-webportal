import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_JOBS, CATEGORIES } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
export default function JobFeedPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState('');
  const jobs = cat ? MOCK_JOBS.filter(j => j.category === cat) : MOCK_JOBS;
  return (
    <div>
      <PageHeader title="Job Feed" subtitle="New jobs posted near you" action={<span className="flex items-center gap-1.5 text-sm text-green-600 font-semibold"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-green"/>Live</span>}/>
      <div className="p-4 lg:p-6">
        <div className="flex gap-2 mb-5 overflow-x-auto">
          <button onClick={() => setCat('')} className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${!cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-slate-200 text-dark-600'}`}>All Categories</button>
          {CATEGORIES.slice(0,6).map(c => <button key={c.slug} onClick={() => setCat(c.slug === cat ? '' : c.slug)} className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${cat === c.slug ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-slate-200 text-dark-600'}`}>{c.icon} {c.name}</button>)}
        </div>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-dark-900">{job.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5 capitalize">{job.category} · {job.area}, {job.city}</p>
                  <p className="text-xs text-slate-400 mt-0.5">⏰ {job.preferredTime}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black text-dark-900">PKR {job.budgetMin.toLocaleString()}–{job.budgetMax.toLocaleString()}</p>
                  <span className="badge-green badge text-xs mt-1">{job.bidCount} bids</span>
                </div>
              </div>
              <p className="text-sm text-dark-600 leading-relaxed line-clamp-2 mb-4">{job.description}</p>
              <div className="flex gap-3">
                <button onClick={() => navigate(`/seller/job-feed/${job.id}`)} className="btn-primary flex-1 text-sm">💰 Place Bid</button>
                <button onClick={() => navigate(`/seller/job-feed/${job.id}`)} className="btn-secondary text-sm px-4">Details</button>
              </div>
            </div>
          ))}
        </div>
        {jobs.length === 0 && <div className="text-center py-20"><div className="text-5xl mb-4">🔍</div><p className="font-bold text-dark-900">No jobs in this category</p></div>}
      </div>
    </div>
  );
}