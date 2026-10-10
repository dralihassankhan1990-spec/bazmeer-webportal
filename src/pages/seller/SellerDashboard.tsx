import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { MOCK_BOOKINGS, MOCK_BIDS, MOCK_JOBS } from '../../data/mockData';
import { ChevronRight, DollarSign, TrendingUp, Star } from 'lucide-react';
export default function SellerDashboard() {
  const navigate = useNavigate();
  const { seller } = useAuthStore();
  const earnings = { today: 3600, week: 18200, month: 64800 };
  return (
    <div className="p-4 lg:p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-dark-900">Assalam-o-Alaikum, {seller?.name?.split(' ')[0]} 👷</h1>
        <p className="text-sm text-slate-500 mt-0.5">Here's what's happening today</p>
      </div>
      {/* Earnings */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{label:'Today',val:earnings.today},{label:'This Week',val:earnings.week},{label:'This Month',val:earnings.month}].map(({label,val}) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-xs text-slate-400 uppercase font-bold">{label}</p>
            <p className="text-xl font-black text-primary-600 mt-1">PKR {val.toLocaleString()}</p>
          </div>
        ))}
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          {icon:'📋',label:'Open Jobs Feed',val:'47 new',action:()=>navigate('/seller/job-feed'),color:'bg-primary-50'},
          {icon:'⏳',label:'Pending Bids',val:MOCK_BIDS.length+' bids',action:()=>navigate('/seller/bids'),color:'bg-orange-50'},
          {icon:'🔨',label:'Active Orders',val:'1 in progress',action:()=>navigate('/seller/orders'),color:'bg-blue-50'},
          {icon:'⭐',label:'My Rating',val:`${seller?.rating}★`,action:()=>navigate('/seller/reviews'),color:'bg-amber-50'},
        ].map(({icon,label,val,action,color}) => (
          <button key={label} onClick={action} className={`card-hover p-4 text-left ${color}`}>
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-sm font-black text-dark-900 mt-0.5">{val}</p>
          </button>
        ))}
      </div>
      {/* Profile completeness */}
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-dark-900">Profile Strength</h3>
          <span className="text-primary-600 font-bold text-sm">72%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-primary-500 rounded-full" style={{width:'72%'}}/>
        </div>
        <div className="space-y-2">
          {[
            {done:true,label:'CNIC Verified ✅'},
            {done:true,label:'Profile photo added ✅'},
            {done:false,label:'Add 5 portfolio photos (+10%)'},
            {done:false,label:'Police verification (+20%)'},
            {done:false,label:'Get your first review (+15%)'},
          ].map(({done,label}) => (
            <p key={label} className={`text-xs ${done ? 'text-green-600 line-through' : 'text-dark-600'}`}>{done ? '' : '→ '}{label}</p>
          ))}
        </div>
      </div>
      {/* Recent Jobs Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-dark-900">New Jobs Near You</h2>
          <button onClick={() => navigate('/seller/job-feed')} className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:underline">View All <ChevronRight size={14}/></button>
        </div>
        <div className="space-y-3">
          {MOCK_JOBS.map(job => (
            <div key={job.id} onClick={() => navigate(`/seller/job-feed/${job.id}`)} className="card-hover p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-dark-900 truncate">{job.title}</p>
                <p className="text-xs text-slate-500">{job.category} · {job.area} · {job.bidCount} bids so far</p>
                <p className="text-xs text-slate-400">Budget: PKR {job.budgetMin.toLocaleString()} – {job.budgetMax.toLocaleString()}</p>
              </div>
              <button className="btn-primary text-xs py-2 px-4 flex-shrink-0">Bid Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}