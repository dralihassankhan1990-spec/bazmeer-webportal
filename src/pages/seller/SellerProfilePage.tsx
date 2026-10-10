import { useState } from 'react';
import { useAuthStore } from '../../store';
import PageHeader from '../../components/common/PageHeader';
import { CITIES, LAHORE_AREAS, CATEGORIES } from '../../data/mockData';
import toast from 'react-hot-toast';
export default function SellerProfilePage() {
  const { seller } = useAuthStore();
  const [bio, setBio] = useState(seller?.bio || '');
  const [experience, setExperience] = useState(seller?.experience || 1);
  return (
    <div>
      <PageHeader title="Edit Profile" subtitle="Update your public seller profile"/>
      <div className="p-4 lg:p-6 max-w-lg space-y-5">
        <div className="card p-6 flex flex-col items-center gap-4">
          <div className={`avatar-xl bg-gradient-to-br ${seller?.color}`}>{seller?.initials}</div>
          <div className="text-center"><p className="font-bold text-dark-900">{seller?.name}</p><p className="text-sm text-slate-500">{seller?.rating}★ · {seller?.jobsCompleted} jobs</p></div>
          <button className="btn-secondary text-sm">Change Photo</button>
        </div>
        <div className="card p-5 space-y-4">
          <div><label className="form-label">Professional Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} className="form-input min-h-28 resize-none" maxLength={500}/><p className="text-xs text-slate-400 mt-1">{bio.length}/500</p></div>
          <div><label className="form-label">Years of Experience</label><input type="number" value={experience} onChange={e => setExperience(Number(e.target.value))} className="form-input" min={0} max={50}/></div>
          <button onClick={() => toast.success('Profile updated!')} className="btn-primary w-full">Save Changes</button>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-3">Areas Served</h3>
          <div className="flex flex-wrap gap-2">
            {seller?.areasServed.map(a => <span key={a} className="text-xs bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-1 rounded-full">{a} ✕</span>)}
            <button className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">+ Add Area</button>
          </div>
        </div>
      </div>
    </div>
  );
}