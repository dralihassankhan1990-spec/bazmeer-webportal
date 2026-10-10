import { useNavigate } from 'react-router-dom';
import { MOCK_GIGS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import { Plus } from 'lucide-react';
export default function SellerGigsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My Gigs" subtitle="Your service packages" action={<button onClick={() => navigate('/seller/gigs/new')} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={14}/>New Gig</button>}/>
      <div className="p-4 lg:p-6 space-y-4">
        {MOCK_GIGS.map(gig => (
          <div key={gig.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="font-bold text-dark-900">{gig.title}</h3><p className="text-sm text-slate-500 capitalize mt-0.5">{gig.category} · {gig.ordersCount} orders</p><p className="text-xs text-amber-600 mt-0.5">⭐ {gig.rating}</p></div>
              <span className={`badge text-xs ${gig.isActive ? 'badge-green' : 'badge-gray'}`}>{gig.isActive ? 'Active' : 'Paused'}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {gig.packages.map(p => <div key={p.name} className="bg-slate-50 rounded-xl p-2.5 text-center"><p className="text-xs font-bold text-dark-900">{p.name}</p><p className="text-sm font-black text-primary-600">PKR {p.price.toLocaleString()}</p></div>)}
            </div>
          </div>
        ))}
        <button onClick={() => navigate('/seller/gigs/new')} className="w-full border-2 border-dashed border-primary-200 rounded-2xl p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-all">
          <Plus size={24} className="mx-auto text-primary-400 mb-2"/>
          <p className="text-sm font-semibold text-primary-600">Create New Gig Package</p>
        </button>
      </div>
    </div>
  );
}