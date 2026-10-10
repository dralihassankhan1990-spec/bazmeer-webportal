import { useState } from 'react';
import { useAuthStore, useUIStore } from '../../store';
import { CITIES } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import toast from 'react-hot-toast';
export default function UserProfilePage() {
  const { user } = useAuthStore();
  const { language, setLanguage } = useUIStore();
  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState(user?.city || 'Lahore');
  const [email, setEmail] = useState(user?.email || '');
  return (
    <div>
      <PageHeader title="My Profile" subtitle="Manage your account settings"/>
      <div className="p-4 lg:p-6 max-w-lg space-y-5">
        <div className="card p-6 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl gradient-green flex items-center justify-center text-white text-2xl font-black">{user?.initials || 'U'}</div>
          <div className="text-center">
            <p className="font-bold text-dark-900">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.phone}</p>
          </div>
          <button className="btn-secondary text-sm">Change Photo</button>
        </div>
        <div className="card p-5 space-y-4">
          <div><label className="form-label">Full Name</label><input value={name} onChange={e => setName(e.target.value)} className="form-input"/></div>
          <div><label className="form-label">Phone (read-only)</label><input value={user?.phone} readOnly className="form-input bg-slate-50 cursor-not-allowed"/></div>
          <div><label className="form-label">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input"/></div>
          <div><label className="form-label">City</label><select value={city} onChange={e => setCity(e.target.value)} className="form-input">{CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="form-label">Language</label>
            <div className="flex gap-3">
              {[{val:'en',label:'English'},{val:'ur',label:'اردو'}].map(({val,label}) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={language === val} onChange={() => setLanguage(val as any)} className="accent-primary-500"/><span className="text-sm">{label}</span></label>
              ))}
            </div>
          </div>
          <button onClick={() => toast.success('Profile updated!')} className="btn-primary w-full">Save Changes</button>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-3">Account</h3>
          <div className="space-y-2">
            <button className="text-sm text-dark-600 hover:text-primary-600 w-full text-left py-2">Change Password</button>
            <button className="text-sm text-red-500 hover:text-red-700 w-full text-left py-2">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}