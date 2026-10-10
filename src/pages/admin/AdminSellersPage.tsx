import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SELLERS } from '../../data/mockData';
import toast from 'react-hot-toast';
const STATUS_COLOR: Record<number, string> = { 0:'badge-gray', 1:'badge-orange', 2:'badge-blue', 3:'badge-green', 4:'badge-orange' };
const STATUS_LABEL: Record<number, string> = { 0:'Unverified', 1:'ID Verified', 2:'BAZMEER Verified', 3:'Police Verified', 4:'Certified' };
export default function AdminSellersPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const sellers = query ? SELLERS.filter(s => s.name.toLowerCase().includes(query.toLowerCase())) : SELLERS;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6"><h1 className="text-xl font-black text-dark-900">Sellers</h1><button onClick={() => navigate('/admin/sellers/pending')} className="btn-primary text-sm">Pending ({12})</button></div>
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 mb-5 max-w-sm">
        <Search size={16} className="text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sellers..." className="flex-1 text-sm outline-none"/>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>{['Name','Category','City','Rating','Jobs','Verification','Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-slate-400 uppercase px-5 py-3">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sellers.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-5 py-3"><div className="flex items-center gap-2"><div className={`avatar-sm bg-gradient-to-br ${s.color} text-xs`}>{s.initials}</div><span className="text-sm font-semibold text-dark-900">{s.name}</span></div></td>
                <td className="px-5 py-3 text-sm text-slate-600 capitalize">{s.categories[0]}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{s.city}</td>
                <td className="px-5 py-3 text-sm font-semibold text-amber-600">⭐ {s.rating}</td>
                <td className="px-5 py-3 text-sm font-semibold">{s.jobsCompleted}</td>
                <td className="px-5 py-3"><span className={`badge text-xs ${STATUS_COLOR[s.verificationTier]}`}>{STATUS_LABEL[s.verificationTier]}</span></td>
                <td className="px-5 py-3"><div className="flex gap-2"><button onClick={() => toast('Opening seller detail...',{icon:'👤'})} className="text-xs text-primary-600 font-medium hover:underline">View</button><button onClick={() => toast.error('Seller suspended')} className="text-xs text-red-500 font-medium hover:underline">Suspend</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}