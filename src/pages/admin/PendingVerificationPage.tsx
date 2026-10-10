import { useState } from 'react';
import { VERIFICATION_QUEUE } from '../../data/mockData';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
export default function PendingVerificationPage() {
  const [items, setItems] = useState(VERIFICATION_QUEUE);
  const [selected, setSelected] = useState<typeof VERIFICATION_QUEUE[0] | null>(null);
  const approve = (id: string) => { setItems(prev => prev.filter(v => v.id !== id)); setSelected(null); toast.success('Seller approved! Welcome SMS sent.'); };
  const reject = (id: string) => { setItems(prev => prev.filter(v => v.id !== id)); setSelected(null); toast.error('Seller rejected. Rejection reason SMS sent.'); };
  return (
    <div className="p-6">
      <h1 className="text-xl font-black text-dark-900 mb-2">Pending Verifications</h1>
      <p className="text-sm text-slate-500 mb-6">Review CNIC documents and approve or reject seller accounts.</p>
      <div className="flex gap-5">
        {/* Queue */}
        <div className="flex-1">
          <div className="space-y-3">
            {items.map(v => (
              <div key={v.id} onClick={() => setSelected(v)} className={`card-hover p-4 cursor-pointer ${selected?.id===v.id?'border-primary-400 bg-primary-50/30':''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-dark-900">{v.name}</p>
                    <p className="text-xs text-slate-500">{v.category} · {v.city} · {v.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge text-xs ${v.daysWaiting > 1 ? 'badge-red' : v.daysWaiting > 0 ? 'badge-orange' : 'badge-blue'}`}>
                      {v.daysWaiting === 0 ? 'New' : v.daysWaiting + 'd waiting'}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{new Date(v.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); approve(v.id); }} className="btn-primary flex-1 text-xs py-1.5 flex items-center gap-1 justify-center"><CheckCircle size={12}/>Approve</button>
                  <button onClick={(e) => { e.stopPropagation(); reject(v.id); }} className="btn-danger flex-1 text-xs py-1.5 flex items-center gap-1 justify-center"><XCircle size={12}/>Reject</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <div className="text-center py-16 card"><CheckCircle size={40} className="mx-auto text-green-500 mb-3"/><p className="font-bold text-dark-900">All caught up!</p><p className="text-sm text-slate-500">No pending verifications.</p></div>}
          </div>
        </div>
        {/* Detail Panel */}
        {selected && (
          <div className="w-72 flex-shrink-0 card p-5 h-fit sticky top-6 animate-slide-in-right">
            <h3 className="font-bold text-dark-900 mb-4">Review: {selected.name}</h3>
            {/* CNIC placeholder */}
            <div className="space-y-3 mb-4">
              {['CNIC Front','CNIC Back','Selfie with CNIC'].map(label => (
                <div key={label} className="bg-slate-100 rounded-xl h-24 flex items-center justify-center">
                  <div className="text-center"><Eye size={20} className="mx-auto text-slate-400 mb-1"/><p className="text-xs text-slate-400">{label}</p><p className="text-xs text-slate-400">[Upload in production]</p></div>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-5 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Name:</span><span className="font-semibold">{selected.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Category:</span><span className="font-semibold">{selected.category}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">City:</span><span className="font-semibold">{selected.city}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Waiting:</span><span className="font-semibold">{selected.daysWaiting}d</span></div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => approve(selected.id)} className="btn-primary flex items-center gap-2 justify-center"><CheckCircle size={14}/>Approve & Activate</button>
              <button onClick={() => reject(selected.id)} className="btn-danger flex items-center gap-2 justify-center"><XCircle size={14}/>Reject</button>
              <button onClick={() => toast('Info request sent via SMS',{icon:'📱'})} className="btn-secondary text-sm">Request More Info</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}