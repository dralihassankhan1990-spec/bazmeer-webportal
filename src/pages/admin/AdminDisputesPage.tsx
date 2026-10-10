import { useState } from 'react';
import toast from 'react-hot-toast';
const DISPUTES = [
  {id:'d1',title:'Worker took payment, job incomplete',user:'Usman Malik',seller:'Muhammad Rizwan',amount:2400,priority:'high',status:'open',opened:'2026-02-26'},
  {id:'d2',title:'Damage to furniture during cleaning',user:'Sara Ahmed',seller:'Cleaning Pro',amount:3500,priority:'medium',status:'open',opened:'2026-02-27'},
  {id:'d3',title:'Wrong work done, not what was requested',user:'Kamran H.',seller:'Ahmed Ali',amount:1200,priority:'low',status:'investigating',opened:'2026-02-27'},
];
const PRIORITY_COLOR: Record<string, string> = { high:'badge-red', medium:'badge-orange', low:'badge-gray' };
export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(DISPUTES);
  const resolve = (id: string, resolution: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? {...d, status:'resolved'} : d));
    toast.success(`Dispute resolved: ${resolution}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-black text-dark-900 mb-6">Disputes ({disputes.filter(d=>d.status!=='resolved').length} open)</h1>
      <div className="space-y-4">
        {disputes.map(d => (
          <div key={d.id} className="card p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-dark-900">{d.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">User: {d.user} · Seller: {d.seller} · Opened: {d.opened}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-black text-dark-900">PKR {d.amount.toLocaleString()}</p>
                <span className={`badge text-xs mt-1 ${PRIORITY_COLOR[d.priority]}`}>{d.priority} priority</span>
              </div>
            </div>
            {d.status !== 'resolved' ? (
              <div className="flex flex-wrap gap-2">
                <button onClick={() => resolve(d.id, 'Full Refund to User')} className="btn-danger text-xs py-1.5 px-3">Full Refund to User</button>
                <button onClick={() => resolve(d.id, 'Partial Refund 50%')} className="btn-secondary text-xs py-1.5 px-3">50% Refund</button>
                <button onClick={() => resolve(d.id, 'Released to Seller')} className="btn-secondary text-xs py-1.5 px-3">Release to Seller</button>
                <button onClick={() => toast('Seller warned',{icon:'⚠️'})} className="btn-ghost text-xs py-1.5 px-3">Warn Seller</button>
              </div>
            ) : (
              <span className="badge-green badge text-xs">✅ Resolved</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}