import { useNavigate } from 'react-router-dom';
import { MOCK_BOOKINGS, GMV_DATA_7D } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import { ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
export default function EarningsPage() {
  const navigate = useNavigate();
  const totalEarned = MOCK_BOOKINGS.reduce((sum, b) => sum + b.sellerEarns, 0);
  const available = totalEarned - 3080;
  const maxGmv = Math.max(...GMV_DATA_7D.map(d => d.gmv));
  return (
    <div>
      <PageHeader title="Earnings" subtitle="Your income overview"/>
      <div className="p-4 lg:p-6 max-w-2xl space-y-5">
        <div className="gradient-green rounded-2xl p-6 text-white">
          <p className="text-sm text-primary-100">Available to Withdraw</p>
          <p className="text-4xl font-black mt-1">PKR {available.toLocaleString()}</p>
          <button onClick={() => toast.success('Withdrawal initiated!')} className="mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl py-2.5 px-6 text-sm flex items-center gap-2">
            <ArrowUpRight size={15}/> Withdraw Now
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{label:'Total Earned',val:totalEarned},{label:'In Escrow',val:3080},{label:'Withdrawn',val:15000}].map(({label,val}) => (
            <div key={label} className="card p-4 text-center"><p className="text-xs text-slate-400">{label}</p><p className="text-lg font-black text-dark-900 mt-1">PKR {val.toLocaleString()}</p></div>
          ))}
        </div>
        {/* Simple chart */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Last 7 Days</h3>
          <div className="flex items-end gap-2 h-24">
            {GMV_DATA_7D.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-primary-500 transition-all" style={{height:`${(d.revenue / (maxGmv * 0.12)) * 80}px`, minHeight:'4px'}}/>
                <span className="text-xs text-slate-400">{d.day.slice(0,2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Transaction History</h3>
          <div className="space-y-3">
            {MOCK_BOOKINGS.map(b => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-dark-900">{b.jobTitle}</p>
                  <p className="text-xs text-slate-400">{b.status} · 12% fee deducted</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+PKR {b.sellerEarns.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 line-through">PKR {b.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Withdraw form */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Withdraw to</h3>
          <div className="space-y-3">
            {['💚 JazzCash (0300-XXXXXXX)', '🟠 EasyPaisa (0333-XXXXXXX)', '🏦 Bank Account (HBL ****1234)'].map(m => (
              <label key={m} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-primary-300">
                <input type="radio" name="method" className="accent-primary-500"/>
                <span className="text-sm text-dark-700">{m}</span>
              </label>
            ))}
            <button onClick={() => toast.success('Withdrawal requested! Instant to JazzCash.')} className="btn-primary w-full">Withdraw PKR {available.toLocaleString()}</button>
          </div>
        </div>
      </div>
    </div>
  );
}