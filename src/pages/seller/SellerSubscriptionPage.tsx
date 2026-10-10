import PageHeader from '../../components/common/PageHeader';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
const PLANS = [
  {name:'Basic',price:0,badge:'',color:'border-slate-200',features:['5 bids per day','Basic profile','Standard listing','Email support']},
  {name:'Pro',price:699,badge:'Most Popular',color:'border-primary-500',features:['Unlimited bids','Priority search placement','Pro badge on profile','Detailed analytics','Early job access','Priority support']},
  {name:'Agency',price:2499,badge:'',color:'border-amber-400',features:['Everything in Pro','Register up to 5 workers','Agency badge','Dedicated account manager','Custom business profile','Bulk job management']},
];
export default function SellerSubscriptionPage() {
  return (
    <div>
      <PageHeader title="Subscription" subtitle="Upgrade to earn more"/>
      <div className="p-4 lg:p-6">
        <div className="text-center mb-8">
          <p className="text-sm text-dark-600">Pro sellers earn <strong className="text-primary-600">3x more</strong> than Basic sellers.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((plan, i) => (
            <div key={plan.name} className={`card p-6 border-2 ${plan.color} ${i===1?'shadow-green':''} relative`}>
              {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.badge}</span>}
              <h3 className="text-lg font-black text-dark-900">{plan.name}</h3>
              <div className="my-3">
                {plan.price === 0 ? <p className="text-2xl font-black text-dark-900">Free</p> : <p className="text-2xl font-black text-dark-900">PKR {plan.price.toLocaleString()}<span className="text-sm font-medium text-slate-400">/month</span></p>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => <li key={f} className="flex items-start gap-2 text-sm text-dark-600"><CheckCircle size={14} className={`${i===0?'text-slate-400':i===1?'text-primary-500':'text-amber-500'} flex-shrink-0 mt-0.5`}/>{f}</li>)}
              </ul>
              {plan.price > 0 ? (
                <button onClick={() => toast.success(`Upgrading to ${plan.name}...`)} className={`w-full py-2.5 rounded-xl font-bold text-sm ${i===1?'btn-primary':'btn-secondary'}`}>
                  Upgrade to {plan.name}
                </button>
              ) : (
                <button disabled className="w-full py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-400 cursor-default">Current Plan</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}