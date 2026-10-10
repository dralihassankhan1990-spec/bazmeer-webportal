import { GMV_DATA_7D, PLATFORM_STATS, CATEGORIES } from '../../data/mockData';
const maxRev = Math.max(...GMV_DATA_7D.map(d => d.revenue));
export default function AdminAnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-black text-dark-900 mb-6">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Daily Revenue (7 Days)</h3>
          <div className="flex items-end gap-2 h-32">
            {GMV_DATA_7D.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-slate-400">{(d.revenue/1000).toFixed(0)}K</span>
                <div className="w-full rounded-t-md bg-primary-500" style={{height:`${(d.revenue/maxRev)*80}px`,minHeight:'6px'}}/>
                <span className="text-xs text-slate-400">{d.day.slice(0,3)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Categories */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Top Categories by Workers</h3>
          {CATEGORIES.slice(0,6).map(cat => (
            <div key={cat.slug} className="flex items-center gap-3 mb-2">
              <span className="w-6">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1"><span>{cat.name}</span><span className="font-semibold">{cat.workerCount.toLocaleString()}</span></div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{width:`${(cat.workerCount/1240)*100}%`}}/></div>
              </div>
            </div>
          ))}
        </div>
        {/* KPIs summary */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Platform Health</h3>
          {[
            {label:'Avg. Bids per Job',val:'4.2'},
            {label:'Avg. Acceptance Rate',val:'68%'},
            {label:'Dispute Rate',val:'1.2%',good:true},
            {label:'Avg. Booking Value',val:'PKR 2,340'},
            {label:'User Repeat Rate (30d)',val:'42%'},
          ].map(({label,val,good}) => (
            <div key={label} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-sm">
              <span className="text-slate-600">{label}</span>
              <span className={`font-bold ${good?'text-green-600':'text-dark-900'}`}>{val}</span>
            </div>
          ))}
        </div>
        {/* City breakdown */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Active Cities</h3>
          {[{city:'Lahore',jobs:86,sellers:2800},{city:'Islamabad/RWP',jobs:44,sellers:840},{city:'Karachi',jobs:12,sellers:320,tag:'Coming soon'},{city:'Multan',jobs:6,sellers:0,tag:'Beta'}].map(c => (
            <div key={c.city} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div><p className="font-semibold text-sm text-dark-900">{c.city} {c.tag && <span className="text-xs text-orange-500 ml-1">{c.tag}</span>}</p><p className="text-xs text-slate-400">{c.sellers.toLocaleString()} sellers</p></div>
              <span className="text-sm font-bold text-primary-600">{c.jobs} jobs/day</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}