import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
export default function PostJobSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="card p-10 max-w-md w-full text-center animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-primary-500" />
        </div>
        <h1 className="text-2xl font-black text-dark-900 mb-2">Job Posted Successfully!</h1>
        <p className="text-dark-600 mb-6">Your job is now visible to verified professionals near you. You'll receive bids shortly.</p>
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs font-bold text-primary-800 mb-2">What happens next?</p>
          <div className="space-y-1.5">
            {['Professionals in your area will see your job', 'They will submit price bids with their proposals', 'You compare bids and accept the best one', 'Pay safely via escrow — released only when done'].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-primary-700"><span className="w-4 h-4 rounded-full bg-primary-200 text-primary-700 flex-shrink-0 flex items-center justify-center font-bold text-xs">{i+1}</span>{s}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/user/jobs/j1')} className="btn-primary flex items-center gap-2 justify-center">View Bids <ArrowRight size={15}/></button>
          <button onClick={() => navigate('/user/dashboard')} className="btn-secondary">Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}