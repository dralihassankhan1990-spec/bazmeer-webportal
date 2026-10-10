import { MOCK_BOOKINGS } from '../../data/mockData';
export default function AdminPaymentsPage() {
  const total = MOCK_BOOKINGS.reduce((s,b) => s+b.amount, 0);
  const revenue = MOCK_BOOKINGS.reduce((s,b) => s+b.commission, 0);
  return (
    <div className="p-6">
      <h1 className="text-xl font-black text-dark-900 mb-6">Payments</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{label:'Total GMV',val:total},{label:'Platform Revenue (12%)',val:revenue},{label:'Pending Withdrawals',val:3080}].map(({label,val}) => (
          <div key={label} className="card p-5 text-center"><p className="text-xs text-slate-400 uppercase font-bold">{label}</p><p className="text-2xl font-black text-primary-600 mt-1">PKR {val.toLocaleString()}</p></div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b"><tr>{['Booking','User','Seller','Amount','Commission','Net to Seller','Status'].map(h => <th key={h} className="text-left text-xs font-bold text-slate-400 uppercase px-5 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_BOOKINGS.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-sm font-semibold text-dark-900">{b.jobTitle}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{b.user.name}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{b.seller.name}</td>
                <td className="px-5 py-3 text-sm font-bold text-dark-900">PKR {b.amount.toLocaleString()}</td>
                <td className="px-5 py-3 text-sm text-red-600">–PKR {b.commission.toLocaleString()}</td>
                <td className="px-5 py-3 text-sm font-bold text-green-600">PKR {b.sellerEarns.toLocaleString()}</td>
                <td className="px-5 py-3"><span className={`badge text-xs ${b.isEscrowHeld?'badge-blue':'badge-green'}`}>{b.isEscrowHeld?'In Escrow':'Released'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}