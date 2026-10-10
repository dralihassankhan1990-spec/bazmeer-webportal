import { useNavigate } from 'react-router-dom';
import { MOCK_BOOKINGS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
export default function SellerOrdersPage() {
  const navigate = useNavigate();
  const orders = MOCK_BOOKINGS;
  return (
    <div>
      <PageHeader title="My Orders" subtitle="Active and past jobs"/>
      <div className="p-4 lg:p-6 space-y-4">
        {orders.map(o => (
          <div key={o.id} className="card p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-bold text-dark-900">{o.jobTitle}</h3>
                <p className="text-sm text-slate-500">{o.user.name} · {o.area}, {o.city}</p>
                <p className="text-xs text-slate-400">📅 {new Date(o.scheduledAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-primary-600">PKR {o.sellerEarns.toLocaleString()}</p>
                <p className="text-xs text-slate-400">after {o.commission > 0 ? '12%' : '0%'} fee</p>
              </div>
            </div>
            {o.status === 'in_progress' && (
              <div className="flex gap-3">
                <button onClick={() => toast.success('Status updated!')} className="btn-primary flex-1 text-sm">Mark as Complete</button>
                <button onClick={() => navigate(`/seller/chat/c1`)} className="btn-secondary text-sm px-4">💬 Message</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}