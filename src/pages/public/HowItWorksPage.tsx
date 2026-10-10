import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="section-container py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-black text-dark-900 mb-3">How BAZMEER Works</h1>
          <p className="text-dark-600 text-lg max-w-xl mx-auto">Two ways to hire — search & contact directly, or post a job and get competitive bids.</p>
        </div>

        {/* Flow 1 */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-black text-lg">1</div>
            <div>
              <h2 className="text-2xl font-black text-dark-900">Search & Contact</h2>
              <p className="text-dark-600 text-sm">Find a verified professional and hire directly — like a personal directory.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🔍', step: 'Step 1', title: 'Search by Category', desc: 'Type "Electrician in Lahore" or browse categories. Filter by verified, female provider, available now, or use Near Me GPS search.' },
              { icon: '👤', step: 'Step 2', title: 'View Profile & Reviews', desc: 'See their CNIC verification status, rating, completed jobs, portfolio photos, and real reviews from verified customers.' },
              { icon: '💬', step: 'Step 3', title: 'Contact & Book', desc: "Message them directly or click 'Hire Now'. Pay safely via JazzCash/EasyPaisa — money released only when job is done." },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="card p-6">
                <div className="text-4xl mb-3">{icon}</div>
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">{step}</span>
                <h3 className="text-lg font-bold text-dark-900 mt-1 mb-2">{title}</h3>
                <p className="text-sm text-dark-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flow 2 */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent-orange text-white flex items-center justify-center font-black text-lg">2</div>
            <div>
              <h2 className="text-2xl font-black text-dark-900">Post a Job & Get Bids</h2>
              <p className="text-dark-600 text-sm">Like InDrive — you set the budget range, professionals compete for your job.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: '📋', step: 'Step 1', title: 'Post Your Job', desc: 'Describe the problem, add photos, set your budget range. Free — takes 60 seconds.' },
              { icon: '📨', step: 'Step 2', title: 'Receive Bids', desc: 'Nearby verified professionals see your job and send price bids with proposals. Average: 4 bids in 15 minutes.' },
              { icon: '🤝', step: 'Step 3', title: 'Negotiate', desc: 'Compare bids side by side. Accept the best one or send a counter-offer. You are in full control.' },
              { icon: '✅', step: 'Step 4', title: 'Pay Safely', desc: 'Pay via JazzCash or card. Money held in BAZMEER escrow and released only when you confirm the job is done.' },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="card p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{step}</span>
                <h3 className="text-base font-bold text-dark-900 mt-1 mb-2">{title}</h3>
                <p className="text-sm text-dark-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety */}
        <div className="bg-dark-900 rounded-3xl p-10 text-white text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-black mb-3">BAZMEER Safety Guarantee</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">Every worker is CNIC verified. Your payment is protected by escrow. If anything goes wrong, we compensate up to PKR 10,000 and cooperate with law enforcement.</p>
          <button onClick={() => navigate('/register')} className="btn-primary px-8 py-3">Start — Post Your First Job Free →</button>
        </div>
      </div>
    </div>
  );
}
