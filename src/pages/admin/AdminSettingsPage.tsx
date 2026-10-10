import { useState } from 'react';
import toast from 'react-hot-toast';
export default function AdminSettingsPage() {
  const [commission, setCommission] = useState(12);
  const [guarantee, setGuarantee] = useState(10000);
  const [bidLimit, setBidLimit] = useState(5);
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-black text-dark-900 mb-6">Platform Settings</h1>
      <div className="space-y-5">
        {[
          {label:'Base Commission Rate (%)', val:commission, set:setCommission, help:'Applied to all transaction types (except promotional)'},
          {label:'Safety Guarantee Amount (PKR)', val:guarantee, set:setGuarantee, help:'Maximum compensation per incident for verified seller incidents'},
          {label:'Basic Seller Daily Bid Limit', val:bidLimit, set:setBidLimit, help:'Number of bids Basic (free) sellers can submit per day'},
        ].map(({label,val,set,help}) => (
          <div key={label} className="card p-5">
            <label className="form-label">{label}</label>
            <input type="number" value={val} onChange={e => set(Number(e.target.value))} className="form-input max-w-xs mt-2"/>
            <p className="text-xs text-slate-400 mt-1.5">{help}</p>
          </div>
        ))}
        <div className="card p-5">
          <h3 className="font-bold text-dark-900 mb-3">Feature Flags</h3>
          {[{label:'GPS Nearby Search',enabled:true},{label:'Urdu Language Toggle',enabled:true},{label:'Pro Seller Subscription',enabled:true},{label:'Police Verification Badge',enabled:true},{label:'BAZMEER Guarantee',enabled:true}].map(({label,enabled}) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-sm text-dark-700">{label}</span>
              <button onClick={() => toast.success(label+' toggled')} className={`w-11 h-6 rounded-full transition-colors ${enabled?'bg-primary-500':'bg-slate-300'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mx-0.5 ${enabled?'translate-x-5':'translate-x-0'}`}/>
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => toast.success('Settings saved!')} className="btn-primary px-8">Save All Settings</button>
      </div>
    </div>
  );
}