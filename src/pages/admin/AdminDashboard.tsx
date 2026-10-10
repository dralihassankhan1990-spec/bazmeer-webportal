import { PLATFORM_STATS, GMV_DATA_7D } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
const KPI = ({label,val,trend,color}: {label:string,val:string,trend:number,color:string}) => (
  <div className="bg-dark-800 rounded-xl p-4 border border-white/5">
    <p className="text-xs text-slate-400 uppercase font-bold">{label}</p>
    <p className={`text-2xl font-black mt-1 ${color}`}>{val}</p>
    <p className={`text-xs mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>{trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs yesterday</p>
  </div>
);
export default function AdminDashboard() {
  const s = PLATFORM_STATS;
  const maxGmv = Math.max(...GMV_DATA_7D.map(d => d.gmv));
  const navigate = useNavigate();
  return (
    <div className="p-6 text-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm">Real-time platform overview · {new Date().toLocaleDateString('en-PK', {weekday:'long', day:'numeric', month:'long'})}</p>
      </div>
      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Total Users" val={s.totalUsers.toLocaleString()} trend={s.usersTrend} color="text-white"/>
        <KPI label="Active Sellers" val={s.activeSellers.toLocaleString()} trend={s.sellersTrend} color="text-primary-400"/>
        <KPI label="Today Bookings" val={s.todayBookings.toString()} trend={s.bookingsTrend} color="text-blue-400"/>
        <KPI label="Today GMV" val={`PKR ${(s.todayGMV/1000).toFixed(0)}K`} trend={s.gmvTrend} color="text-green-400"/>
        <KPI label="Open Jobs" val={s.openJobs.toString()} trend={12} color="text-amber-400"/>
        <KPI label="Platform Revenue" val={`PKR ${(s.platformRevenue/1000).toFixed(0)}K`} trend={s.gmvTrend} color="text-purple-400"/>
        <button onClick={() => navigate('/admin/sellers/pending')} className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-left hover:bg-amber-500/30 transition-colors">
          <p className="text-xs text-amber-300 uppercase font-bold">Pending Verification</p>
          <p className="text-2xl font-black mt-1 text-amber-400">{s.pendingVerifications}</p>
          <p className="text-xs text-amber-300 mt-1">→ Review Now</p>
        </button>
        <button onClick={() => navigate('/admin/disputes')} className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-left hover:bg-red-500/30 transition-colors">
          <p className="text-xs text-red-300 uppercase font-bold">Open Disputes</p>
          <p className="text-2xl font-black mt-1 text-red-400">{s.openDisputes}</p>
          <p className="text-xs text-red-300 mt-1">→ Resolve</p>
        </button>
      </div>
      {/* Revenue Chart */}
      <div className="bg-dark-800 rounded-xl p-5 border border-white/5 mb-6">
        <h3 className="font-bold text-white mb-4">7-Day Revenue</h3>
        <div className="flex items-end gap-2 h-32">
          {GMV_DATA_7D.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs text-slate-400 font-bold">PKR {(d.revenue/1000).toFixed(0)}K</div>
              <div className="w-full rounded-t-md bg-primary-500 hover:bg-primary-400 transition-colors" style={{height:`${(d.revenue / (maxGmv * 0.12)) * 80}px`, minHeight:'8px'}}/>
              <span className="text-xs text-slate-400">{d.day.slice(0,3)}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent activity */}
      <div className="bg-dark-800 rounded-xl p-5 border border-white/5">
        <h3 className="font-bold text-white mb-4">Real-time Activity</h3>
        <div className="space-y-3">
          {[
            {time:'2 min ago',icon:'📋',text:'New job posted: "AC Repair DHA Phase 3" — 2 bids so far'},
            {time:'5 min ago',icon:'✅',text:'Verification approved: Zafar Iqbal (Plumber, Lahore)'},
            {time:'8 min ago',icon:'💰',text:'Booking completed: PKR 2,800 released to Bilal Mahmood'},
            {time:'15 min ago',icon:'⚠️',text:'Dispute opened: Booking #BK2026009 — investigating'},
            {time:'22 min ago',icon:'👤',text:'New user registered: Karachi (via referral code AHMED22)'},
          ].map((a,i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-lg">{a.icon}</span>
              <div className="flex-1"><p className="text-sm text-slate-200">{a.text}</p><p className="text-xs text-slate-500 mt-0.5">{a.time}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}