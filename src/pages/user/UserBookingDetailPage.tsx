import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { MOCK_BOOKINGS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
const TIMELINE = ['Confirmed', 'Worker En Route', 'Work Started', 'Work Done', 'Reviewed'];
export default function UserBookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const b = MOCK_BOOKINGS.find(bk => bk.id === bookingId) || MOCK_BOOKINGS[0];
  const currentStep = b.status === 'confirmed' ? 0 : b.status === 'in_progress' ? 2 : b.status === 'completed' ? 3 : 0;
  return (
    <div>
      <PageHeader title={b.jobTitle} subtitle={`Booking #${b.id.toUpperCase()}`} backTo="/user/bookings" />
      <div className="p-4 lg:p-6 max-w-2xl space-y-5">
        {/* Status Timeline */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Job Progress</h3>
          <div className="relative">
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-slate-200"/>
            {TIMELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-3 mb-4 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${i < currentStep ? 'bg-primary-500' : i === currentStep ? 'bg-primary-500 ring-4 ring-primary-100' : 'bg-slate-200'}`}>
                  {i < currentStep ? <CheckCircle size={14} className="text-white"/> : <span className="text-xs text-white font-bold">{i+1}</span>}
                </div>
                <span className={`text-sm font-medium ${i <= currentStep ? 'text-dark-900' : 'text-slate-400'}`}>{step}</span>
                {i === currentStep && <span className="ml-auto text-xs text-primary-600 font-semibold animate-pulse">Current</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Provider card */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Your Worker</h3>
          <div className="flex items-center gap-4">
            <div className={`avatar-xl bg-gradient-to-br ${b.seller.color}`}>{b.seller.initials}</div>
            <div className="flex-1">
              <p className="font-bold text-dark-900">{b.seller.name}</p>
              <p className="text-sm text-slate-500">{b.seller.city} · ⭐ {b.seller.rating}</p>
              <p className="text-xs text-slate-400 mt-0.5">📞 {b.seller.phone}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => navigate(`/user/chat/c1`)} className="btn-secondary flex-1 flex items-center gap-2 justify-center text-sm"><MessageCircle size={15}/>Message</button>
            <a href={`tel:${b.seller.phone}`} className="btn-primary flex-1 flex items-center gap-2 justify-center text-sm"><Phone size={15}/>Call</a>
          </div>
        </div>

        {/* Payment details */}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-4">Payment Details</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm"><span className="text-slate-500">Job Amount</span><span className="font-semibold text-dark-900">PKR {b.amount.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Platform Fee (included)</span><span className="text-slate-400">–</span></div>
            <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="font-bold text-dark-900">Total Paid</span><span className="font-black text-dark-900">PKR {b.amount.toLocaleString()}</span></div>
          </div>
          {b.isEscrowHeld && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
              🔐 Payment is securely held in BAZMEER escrow. It will be released to the worker when you confirm the job is done.
            </div>
          )}
        </div>

        {b.status === 'in_progress' && (
          <button onClick={() => { toast.success('Payment released! Please leave a review.'); }} className="btn-primary w-full py-3 text-base">
            ✅ Mark Job as Complete & Release Payment
          </button>
        )}
        {b.status === 'in_progress' && (
          <button onClick={() => toast('Dispute opened. Our team will contact you.', {icon: '⚠️'})} className="btn-danger w-full flex items-center gap-2 justify-center text-sm">
            <AlertTriangle size={15}/> Report an Issue
          </button>
        )}
      </div>
    </div>
  );
}