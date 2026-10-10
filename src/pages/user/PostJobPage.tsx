import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Upload, MapPin, Clock, X } from 'lucide-react';
import { CATEGORIES, CITIES, LAHORE_AREAS, MARKET_RATES } from '../../data/mockData';
import toast from 'react-hot-toast';

const STEPS = ['Service', 'Details', 'Budget & Timing', 'Review & Post'];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    category: '', subcategory: '', title: '',
    description: '', city: 'Lahore', area: '',
    budgetMin: 500, budgetMax: 5000,
    preferredTime: 'ASAP', workType: 'one_time', bidDuration: '6h',
  });

  const update = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }));
  const selectedCat = CATEGORIES.find(c => c.slug === form.category);
  const marketRate = form.category ? MARKET_RATES[form.category] : null;

  const canProceed = () => {
    if (step === 0) return form.category !== '';
    if (step === 1) return form.title.length >= 10 && form.description.length >= 20 && form.city !== '' && form.area !== '';
    if (step === 2) return form.budgetMin > 0 && form.budgetMax > form.budgetMin;
    return true;
  };

  const handleSubmit = () => {
    toast.success('Job posted successfully! Waiting for bids...');
    navigate('/user/post-job/success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)} className="p-2 rounded-xl hover:bg-slate-100">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-black text-dark-900">Post a Job</h1>
              <p className="text-xs text-slate-500">Step {step + 1} of 4 — {STEPS[step]}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${((step + 1) / 4) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s, i) => (
              <span key={s} className={`text-xs font-medium ${i <= step ? 'text-primary-600' : 'text-slate-400'}`}>{i + 1}. {s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 py-6">

          {/* STEP 0: Category */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-black text-dark-900 mb-2">What service do you need?</h2>
              <p className="text-dark-600 text-sm mb-6">Select a category to get started.</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => { update('category', cat.slug); update('subcategory', ''); }}
                    className={`p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${form.category === cat.slug ? 'border-primary-500 bg-primary-50 shadow-green' : 'border-slate-200 bg-white hover:border-primary-300'}`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <p className="text-xs font-bold text-dark-900 leading-tight">{cat.name}</p>
                  </button>
                ))}
              </div>
              {selectedCat && (
                <div className="mt-5 animate-fade-in">
                  <label className="form-label">Subcategory (optional)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCat.subcategories.map(sub => (
                      <button
                        key={sub.slug}
                        onClick={() => update('subcategory', sub.slug)}
                        className={`text-sm px-3 py-1.5 rounded-xl border transition-all ${form.subcategory === sub.slug ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold' : 'border-slate-200 bg-white text-dark-600 hover:border-primary-300'}`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-xl font-black text-dark-900 mb-2">Describe your job</h2>

              <div>
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  placeholder={`e.g. Fix leaking tap in kitchen`}
                  className="form-input"
                  maxLength={100}
                />
                <p className="text-xs text-slate-400 mt-1">{form.title.length}/100</p>
              </div>

              <div>
                <label className="form-label">Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Describe the problem in detail. You can write in Urdu or English. More details = better bids!"
                  className="form-input min-h-28 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-slate-400 mt-1">{form.description.length}/500</p>
              </div>

              <div>
                <label className="form-label">Add Photos (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary-300 cursor-pointer transition-colors">
                  <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-dark-600 font-medium">Click to upload photos</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB each · Max 5 photos · Photos get better bids!</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">City *</label>
                  <select value={form.city} onChange={e => update('city', e.target.value)} className="form-input">
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Area *</label>
                  <select value={form.area} onChange={e => update('area', e.target.value)} className="form-input">
                    <option value="">Select area</option>
                    {LAHORE_AREAS.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Budget & Timing */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <h2 className="text-xl font-black text-dark-900 mb-2">Budget & Timing</h2>

              {/* Market rate hint */}
              {marketRate && (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-primary-800 mb-1">💡 Market Rate in Lahore</p>
                  <p className="text-sm text-primary-700">Typical: <strong>PKR {marketRate.typical.toLocaleString()}</strong> (Range: PKR {marketRate.min.toLocaleString()} – {marketRate.max.toLocaleString()})</p>
                </div>
              )}

              <div>
                <label className="form-label">Your Budget Range</label>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 mb-1 block">Minimum (PKR)</label>
                    <input type="number" value={form.budgetMin} onChange={e => update('budgetMin', Number(e.target.value))} className="form-input" min={100} step={100} />
                  </div>
                  <span className="text-slate-400 mt-5">–</span>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500 mb-1 block">Maximum (PKR)</label>
                    <input type="number" value={form.budgetMax} onChange={e => update('budgetMax', Number(e.target.value))} className="form-input" min={100} step={100} />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Professionals will bid within or around this range. You can still negotiate.</p>
              </div>

              <div>
                <label className="form-label">Preferred Time</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['ASAP (Today)', 'Today afternoon', 'Tomorrow', 'This weekend', 'Flexible (within 3 days)', 'Custom date'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => update('preferredTime', opt)}
                      className={`text-sm px-3 py-2.5 rounded-xl border text-left transition-all ${form.preferredTime === opt ? 'border-primary-500 bg-primary-50 text-primary-700 font-semibold' : 'border-slate-200 bg-white text-dark-600 hover:border-primary-300'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">How Long to Accept Bids?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {[
                    { val: '2h', label: '2 Hours', tag: 'Urgent' },
                    { val: '6h', label: '6 Hours', tag: 'Recommended' },
                    { val: '24h', label: '24 Hours', tag: '' },
                    { val: '3d', label: '3 Days', tag: 'Complex' },
                  ].map(({ val, label, tag }) => (
                    <button
                      key={val}
                      onClick={() => update('bidDuration', val)}
                      className={`text-center p-3 rounded-xl border-2 transition-all ${form.bidDuration === val ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:border-primary-300'}`}
                    >
                      <p className="text-sm font-bold text-dark-900">{label}</p>
                      {tag && <p className="text-xs text-primary-600 mt-0.5">{tag}</p>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Work Type</label>
                <div className="flex gap-3 mt-2">
                  {[{ val: 'one_time', label: 'One-time job' }, { val: 'recurring', label: 'Recurring (daily/weekly/monthly)' }].map(({ val, label }) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={form.workType === val} onChange={() => update('workType', val)} className="accent-primary-500" />
                      <span className="text-sm text-dark-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-black text-dark-900 mb-6">Review & Post Job</h2>
              <div className="card p-5 space-y-4">
                {[
                  { label: 'Category', val: selectedCat ? `${selectedCat.icon} ${selectedCat.name}` : form.category, editStep: 0 },
                  { label: 'Title', val: form.title, editStep: 1 },
                  { label: 'Description', val: form.description.substring(0, 100) + (form.description.length > 100 ? '...' : ''), editStep: 1 },
                  { label: 'Location', val: `${form.area}, ${form.city}`, editStep: 1 },
                  { label: 'Budget', val: `PKR ${form.budgetMin.toLocaleString()} – ${form.budgetMax.toLocaleString()}`, editStep: 2 },
                  { label: 'Preferred Time', val: form.preferredTime, editStep: 2 },
                  { label: 'Bid Duration', val: form.bidDuration, editStep: 2 },
                ].map(({ label, val, editStep }) => (
                  <div key={label} className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 last:border-0">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
                      <p className="text-sm text-dark-900 mt-0.5">{val}</p>
                    </div>
                    <button onClick={() => setStep(editStep)} className="text-xs text-primary-600 hover:underline font-medium flex-shrink-0">Edit</button>
                  </div>
                ))}
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mt-5">
                <p className="text-sm font-semibold text-primary-800 mb-1">🛡️ BAZMEER Safety Promise</p>
                <p className="text-xs text-primary-700">Only CNIC-verified professionals will see and bid on your job. Your exact address is never shared until you hire someone.</p>
              </div>

              <label className="flex items-start gap-3 mt-5 cursor-pointer">
                <input type="checkbox" className="accent-primary-500 mt-0.5 w-4 h-4" defaultChecked />
                <span className="text-sm text-dark-600">I agree to BAZMEER's <span className="text-primary-600 font-medium">Terms of Service</span> and understand that payment will be held in escrow.</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-slate-200 p-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-6 flex items-center gap-2">
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => canProceed() ? setStep(s => s + 1) : toast.error('Please fill in all required fields')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${canProceed() ? 'btn-primary' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="flex-1 btn-primary py-3 text-base">
              🚀 Post Job — Get Bids Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
