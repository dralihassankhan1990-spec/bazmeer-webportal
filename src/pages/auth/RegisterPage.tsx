import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center text-white font-black text-xl">B</div>
            <span className="font-black text-2xl">BAZ<span className="text-primary-500">MEER</span></span>
          </Link>
          <h1 className="text-2xl font-black text-dark-900">Join BAZMEER</h1>
          <p className="text-slate-500 text-sm mt-1">Choose how you want to use BAZMEER</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={() => { login('user'); toast.success('Welcome to BAZMEER!'); navigate('/user/dashboard'); }}
            className="card-hover p-7 text-left">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="font-black text-dark-900 mb-2 text-lg">I need services</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Post jobs, get competitive bids, hire verified professionals at your price.</p>
            <div className="mt-4 btn-primary w-full justify-center">Register as Customer →</div>
          </button>
          <button onClick={() => navigate('/register/seller')}
            className="card-hover p-7 text-left">
            <div className="text-4xl mb-4">👷</div>
            <h3 className="font-black text-dark-900 mb-2 text-lg">I offer services</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Find jobs in your area, bid competitively, build your reputation and earn more.</p>
            <div className="mt-4 btn-secondary w-full justify-center border-primary-200 text-primary-700">Register as Worker →</div>
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
