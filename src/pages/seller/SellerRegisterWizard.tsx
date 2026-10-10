import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { CATEGORIES, CITIES, LAHORE_AREAS } from '../../data/mockData';
import { useAuthStore } from '../../store';
import toast from 'react-hot-toast';

const STEPS = ['Personal Info','Services & Areas','Identity Docs','Skills','Payment Info','Review & Submit'];

export default function SellerRegisterWizard() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name:'', phone:'', cnic:'', gender:'male', categories:[] as string[], city:'Lahore', areas:[] as string[], bio:'', experience:1, paymentMethod:'jazzcash', accountNumber:'', agreeCommission:false, agreeTerms:false });
  const upd = (k: string, v: any) => setForm(f => ({...f, [k]: v}));
  const handleSubmit = () => {
    login('seller');
    toast.success('Registration submitted! We will verify within 24-48 hours.');
    navigate('/seller/dashboard');
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => step > 0 ? setStep(s=>s-1) : navigate('/')} className="p-2 rounded-xl hover:bg-slate-100"><ChevronLeft size={20}/></button>
            <div>
              <h1 className="text-lg font-black text-dark-900">Join as a Worker</h1>
              <p className="text-xs text-slate-500">Step {step+1} of 6 — {STEPS[step]}</p>
            </div>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full transition-all" style={{width:`${((step+1)/6)*100}%`}}/>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto"><div className="max-w-xl mx-auto p-4 py-6">

        {step === 0 && <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-4">Personal Information</h2>
          <div><label className="form-label">Full Legal Name *</label><input value={form.name} onChange={e=>upd('name',e.target.value)} className="form-input" placeholder="As on CNIC"/></div>
          <div><label className="form-label">Phone Number *</label><div className="flex gap-2"><span className="form-input w-20 bg-slate-50 text-center font-semibold text-sm">+92</span><input value={form.phone} onChange={e=>upd('phone',e.target.value)} className="form-input flex-1" placeholder="3XX-XXXXXXX"/></div></div>
          <div><label className="form-label">CNIC Number *</label><input value={form.cnic} onChange={e=>upd('cnic',e.target.value)} className="form-input" placeholder="XXXXX-XXXXXXX-X" maxLength={15}/></div>
          <div><label className="form-label">Gender</label><div className="flex gap-3">{['male','female'].map(g=><label key={g} className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={form.gender===g} onChange={()=>upd('gender',g)} className="accent-primary-500"/><span className="text-sm capitalize">{g}</span></label>)}</div></div>
        </div>}

        {step === 1 && <div className="space-y-5 animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-2">Your Services & Location</h2>
          <div><label className="form-label">Service Categories (select up to 3) *</label>
            <div className="grid grid-cols-3 gap-2 mt-2">{CATEGORIES.map(c => {
              const selected = form.categories.includes(c.slug);
              return <button key={c.slug} type="button" onClick={()=>{
                if(selected) upd('categories', form.categories.filter(x=>x!==c.slug));
                else if(form.categories.length < 3) upd('categories', [...form.categories, c.slug]);
                else toast.error('Max 3 categories');
              }} className={`p-3 rounded-xl border-2 text-center transition-all ${selected?'border-primary-500 bg-primary-50':'border-slate-200 bg-white hover:border-primary-300'}`}>
                <div className="text-2xl mb-1">{c.icon}</div><p className="text-xs font-bold">{c.name}</p>
              </button>;
            })}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="form-label">City</label><select value={form.city} onChange={e=>upd('city',e.target.value)} className="form-input text-sm">{CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
          </div>
        </div>}

        {step === 2 && <div className="space-y-5 animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-2">Identity Verification</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4"><p className="text-sm font-semibold text-amber-800 mb-1">⚠ Important</p><p className="text-sm text-amber-700">Your CNIC photos are reviewed manually by our team within 24-48 hours. Your information is stored securely.</p></div>
          {['CNIC Front Photo','CNIC Back Photo','Selfie holding CNIC with today\'s date on paper'].map((label,i)=>(
            <div key={i}><label className="form-label">{label} *</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-300 cursor-pointer">
                <Upload size={20} className="mx-auto mb-2 text-slate-400"/><p className="text-sm text-dark-600 font-medium">Tap to upload</p><p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
          ))}
        </div>}

        {step === 3 && <div className="space-y-5 animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-2">Skills & Bio</h2>
          <div><label className="form-label">Professional Bio *</label><textarea value={form.bio} onChange={e=>upd('bio',e.target.value)} placeholder="Tell clients about your experience, expertise, and why they should hire you..." className="form-input min-h-32 resize-none" maxLength={500}/><p className="text-xs text-slate-400 mt-1">{form.bio.length}/500 (min 100)</p></div>
          <div><label className="form-label">Years of Experience *</label><input type="number" value={form.experience} onChange={e=>upd('experience',Number(e.target.value))} className="form-input" min={0} max={50}/></div>
          <div><label className="form-label">Portfolio Photos (Recommended)</label><div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-300 cursor-pointer"><Upload size={20} className="mx-auto mb-2 text-slate-400"/><p className="text-sm font-medium text-dark-600">Upload before/after photos</p><p className="text-xs text-slate-400 mt-1">Sellers with portfolio get 3x more bids</p></div></div>
        </div>}

        {step === 4 && <div className="space-y-5 animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-2">Payment Information</h2>
          <p className="text-sm text-dark-600">Where should we send your earnings after each completed job?</p>
          <div className="space-y-3">
            {[{val:'jazzcash',label:'💚 JazzCash'},{val:'easypaisa',label:'🟠 EasyPaisa'},{val:'bank',label:'🏦 Bank Account'}].map(({val,label})=>(
              <label key={val} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.paymentMethod===val?'border-primary-500 bg-primary-50':'border-slate-200 hover:border-primary-300'}`}>
                <input type="radio" checked={form.paymentMethod===val} onChange={()=>upd('paymentMethod',val)} className="accent-primary-500"/>
                <span className="text-sm font-semibold">{label}</span>
              </label>
            ))}
          </div>
          <div><label className="form-label">Account Number *</label><input value={form.accountNumber} onChange={e=>upd('accountNumber',e.target.value)} className="form-input" placeholder="Phone number or account number"/></div>
          <div className="card p-4 bg-slate-50">
            <p className="text-sm font-semibold text-dark-900 mb-1">Commission: 12%</p>
            <p className="text-xs text-dark-600">BAZMEER deducts 12% from each completed job. Example: PKR 1,000 job → you receive PKR 880.</p>
            <label className="flex items-start gap-2 mt-3 cursor-pointer"><input type="checkbox" checked={form.agreeCommission} onChange={e=>upd('agreeCommission',e.target.checked)} className="accent-primary-500 mt-0.5"/><span className="text-xs text-dark-600">I understand and agree to the 12% commission</span></label>
          </div>
          <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={form.agreeTerms} onChange={e=>upd('agreeTerms',e.target.checked)} className="accent-primary-500 mt-0.5"/><span className="text-xs text-dark-600">I agree to BAZMEER <span className="text-primary-600">Terms of Service</span> and <span className="text-primary-600">Worker Policy</span></span></label>
        </div>}

        {step === 5 && <div className="animate-fade-in">
          <h2 className="text-xl font-black text-dark-900 mb-6">Review & Submit</h2>
          <div className="card p-5 space-y-3">
            {[
              {label:'Name',val:form.name||'Not provided'},
              {label:'Phone',val:form.phone||'Not provided'},
              {label:'CNIC',val:form.cnic?'****-***'+form.cnic.slice(-3):'Not provided'},
              {label:'Categories',val:form.categories.join(', ')||'None selected'},
              {label:'City',val:form.city},
              {label:'Experience',val:form.experience+' years'},
              {label:'Payment',val:form.paymentMethod+': '+form.accountNumber},
            ].map(({label,val},step)=>(
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div><p className="text-xs text-slate-400 uppercase font-bold">{label}</p><p className="text-sm text-dark-900 mt-0.5">{val}</p></div>
              </div>
            ))}
          </div>
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-5">
            <p className="text-sm font-semibold text-primary-800 mb-1">What happens after submission?</p>
            <p className="text-sm text-primary-700">Our team will review your CNIC documents within 24-48 hours. You'll receive an SMS when approved. Then start getting jobs immediately!</p>
          </div>
        </div>}

      </div></div>
      {/* Footer */}
      <div className="bg-white border-t border-slate-200 p-4 flex-shrink-0">
        <div className="max-w-xl mx-auto flex gap-3">
          {step > 0 && <button onClick={() => setStep(s=>s-1)} className="btn-secondary px-6 flex items-center gap-2"><ChevronLeft size={16}/>Back</button>}
          {step < 5 ? (
            <button onClick={() => setStep(s=>s+1)} className="flex-1 btn-primary flex items-center justify-center gap-2 py-3">Continue<ChevronRight size={16}/></button>
          ) : (
            <button onClick={handleSubmit} className="flex-1 btn-primary py-3 text-base">Submit Registration 🚀</button>
          )}
        </div>
      </div>
    </div>
  );
}