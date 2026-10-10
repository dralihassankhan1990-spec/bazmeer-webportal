import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { MOCK_JOBS, MOCK_BIDS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
const TABS = ['All', 'Open', 'In Progress', 'Completed', 'Cancelled'];
export default function UserJobsPage() {
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My Jobs" subtitle="Jobs you've posted" action={<button onClick={() => navigate('/user/post-job')} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={14}/>Post New Job</button>} />
      <div className="p-4 lg:p-6">
        <div className="flex gap-2 mb-5 overflow-x-auto">
          {TABS.map(t => <button key={t} onClick={() => setTab(t)} className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${tab === t ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-slate-200 text-dark-600 hover:border-primary-300'}`}>{t}</button>)}
        </div>
        <div className="space-y-4">
          {MOCK_JOBS.map(job => (
            <div key={job.id} onClick={() => navigate(`/user/jobs/${job.id}`)} className="card-hover p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-dark-900">{job.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{job.category} · {job.area}, {job.city}</p>
                  <p className="text-sm text-slate-400 mt-0.5">Budget: PKR {job.budgetMin.toLocaleString()} – {job.budgetMax.toLocaleString()}</p>
                </div>
                <span className="badge-green badge text-xs">🟢 Open</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">{job.bidCount}</span>
                  <span className="text-sm font-semibold text-primary-700">{job.bidCount} bids received</span>
                </div>
                <button className="text-sm font-semibold text-primary-600">View Bids →</button>
              </div>
            </div>
          ))}
        </div>
        {MOCK_JOBS.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-dark-900 mb-3">No jobs yet</h3>
            <button onClick={() => navigate('/user/post-job')} className="btn-primary px-8">Post Your First Job</button>
          </div>
        )}
      </div>
    </div>
  );
}