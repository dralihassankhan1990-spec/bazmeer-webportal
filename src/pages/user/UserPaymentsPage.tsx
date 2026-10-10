import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { MOCK_BOOKINGS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import { Plus, ArrowDownLeft } from 'lucide-react';
export default function UserPaymentsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Wallet & Payments" subtitle="Manage your balance and transactions"/>
      <div className="p-4 lg:p-6 max-w-2xl space-y-5">
        <div className="gradient-green rounded-2xl p-6 text-white">
          <p className="text-sm font-medium text-primary-100">BAZMEER Wallet Balance</p>
          <p className="text-4xl font-black mt-1">PKR {(user?.wallet || 1500).toLocaleString()}</p>
          <div className="flex gap-3 mt-5">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl py-2.5 text-sm flex items-center gap-2 justify-center"><Plus size={15}/>Add Money</button>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {MOCK_BOOKINGS.map(b => (
              <div key={b.id} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center"><ArrowDownLeft size={16} className="text-red-600"/></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dark-900">{b.jobTitle}</p>
                  <p className="text-xs text-slate-400">{b.category} · {b.status}</p>
                </div>
                <div className="text-right"><p className="text-sm font-bold text-red-600">– PKR {b.amount.toLocaleString()}</p><p className="text-xs text-slate-400">{new Date(b.scheduledAt).toLocaleDateString()}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <p className="text-xs font-bold text-slate-400 uppercase mb-3">Add Money via</p>
          <div className="grid grid-cols-2 gap-3">
            {['💚 JazzCash','🟠 EasyPaisa','💳 Debit Card','🏦 Bank Transfer'].map(m => <button key={m} className="btn-secondary text-sm py-3">{m}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}