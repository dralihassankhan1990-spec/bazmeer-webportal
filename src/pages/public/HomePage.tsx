import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, ArrowRight, Shield, Star, Clock, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { CATEGORIES, SELLERS, CITIES } from '../../data/mockData';
import ProviderCard from '../../components/search/ProviderCard';
import toast from 'react-hot-toast';

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Lahore');
  const [cityDropdown, setCityDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}&city=${city}`);
  };

  const handleNearMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => { setIsLocating(false); navigate('/search/nearby'); },
        () => { setIsLocating(false); toast.error('Location access denied — showing city results'); navigate(`/search?city=${city}`); },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      toast.error('Location not supported — searching in ' + city);
      navigate(`/search?city=${city}`);
    }
  };

  const handleCategoryClick = (slug: string) => navigate(`/services/${slug}`);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-mesh overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/60 via-transparent to-slate-100/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-indigo/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="section-container relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 shadow-card">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse-green" />
              Pakistan's First Negotiated Service Marketplace
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-900 leading-[1.06] tracking-tight mb-5 text-balance">
              Hire Verified Experts.<br />
              <span className="text-gradient-green">At Your Price.</span>
            </h1>
            <p className="text-lg text-dark-600 mb-3 leading-relaxed max-w-2xl mx-auto">
              Post any home service job and receive competitive bids from verified professionals nearby.
              Accept, negotiate, or counter-offer — you're in control.
            </p>
            <p className="text-xl text-slate-400 mb-10 font-urdu">کام کروائیں، قیمت تے کریں</p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-200 shadow-card-lg p-2 flex flex-col sm:flex-row items-stretch gap-2 max-w-3xl mx-auto mb-8">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search: Electrician, Plumber, Maid, Tutor..."
                  className="flex-1 text-sm text-dark-900 placeholder-slate-400 outline-none py-2 bg-transparent"
                />
              </div>
              <div className="hidden sm:block w-px bg-slate-200 my-1" />
              {/* City selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCityDropdown(!cityDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-dark-600 hover:text-primary-600 whitespace-nowrap"
                >
                  <MapPin size={15} className="text-primary-500" />
                  {city}
                  <ChevronDown size={14} />
                </button>
                {cityDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-card-lg py-1 min-w-36 z-20">
                    {CITIES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setCity(c); setCityDropdown(false); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:block w-px bg-slate-200 my-1" />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleNearMe}
                  disabled={isLocating}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-all whitespace-nowrap"
                >
                  {isLocating ? <span className="animate-spin">⟳</span> : <MapPin size={15} />}
                  {isLocating ? 'Locating...' : 'Near Me'}
                </button>
                <button type="submit" className="btn-primary px-6 py-2">
                  Search
                </button>
              </div>
            </form>

            {/* Popular tags */}
            <div className="flex items-center gap-2 justify-center flex-wrap">
              <span className="text-sm text-slate-400">Popular:</span>
              {['⚡ Electrician', '🔧 Plumber', '❄️ AC Service', '🧹 House Cleaning', '📚 Home Tutor', '💄 Beautician'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { setQuery(tag.split(' ').slice(1).join(' ')); navigate(`/search?q=${encodeURIComponent(tag.split(' ').slice(1).join(' '))}&city=${city}`); }}
                  className="text-sm text-dark-600 bg-white border border-slate-200 px-3 py-1 rounded-full hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-dark-900 py-6">
        <div className="section-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { num: '10K+', label: 'Verified Workers' },
              { num: '2', label: 'Cities Served' },
              { num: '50K+', label: 'Jobs Completed' },
              { num: '4.8★', label: 'Average Rating' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center py-2 px-4">
                <div className="text-2xl font-black text-primary-400">{num}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="page-section bg-slate-50">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2">All Service Categories</p>
              <h2 className="text-3xl lg:text-4xl font-black text-dark-900 leading-tight">What do you<br />need done?</h2>
              <p className="text-dark-600 mt-2">20+ categories · Verified professionals · Competitive bids</p>
            </div>
            <button onClick={() => navigate('/search')} className="btn-secondary hidden sm:flex">
              View All <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 lg:gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="group card-hover p-4 lg:p-5 text-center flex flex-col items-center gap-2"
              >
                {cat.isHot && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold bg-accent-orange text-white px-2 py-0.5 rounded-full">🔥 Hot</span>
                )}
                <div
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl transition-transform group-hover:scale-110"
                  style={{ background: cat.bgColor }}
                >
                  {cat.icon}
                </div>
                <div>
                  <p className="text-xs lg:text-sm font-bold text-dark-900 leading-tight">{cat.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.workerCount.toLocaleString()} workers</p>
                </div>
              </button>
            ))}

            {/* View all tile */}
            <button onClick={() => navigate('/search')} className="card-hover p-4 lg:p-5 text-center flex flex-col items-center gap-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl transition-transform hover:scale-110">➕</div>
              <div>
                <p className="text-xs lg:text-sm font-bold text-primary-600">View All</p>
                <p className="text-xs text-slate-400 mt-0.5">20+ categories</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="page-section bg-dark-900">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-400 mb-3">The BAZMEER Way</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                How BAZMEER<br />Works
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">
                Unlike fixed-price apps, BAZMEER lets you negotiate. Post once, get multiple bids, and hire who you trust at a price you both agree on.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => navigate('/register')} className="btn-primary px-6">Post a Job Free →</button>
                <button onClick={() => navigate('/how-it-works')} className="btn-secondary px-6">Watch Demo</button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              {[
                { n: '01', icon: '📋', title: 'Post Your Job', desc: "Describe the problem, add photos, set your budget range and location. Free, takes 60 seconds.", tag: 'Takes 60 seconds' },
                { n: '02', icon: '📨', title: 'Receive Bids', desc: "Verified professionals in your area see your job and send competitive price offers with their proposals and portfolio.", tag: 'Avg. 4 bids in 15 min' },
                { n: '03', icon: '✅', title: 'Hire & Pay Safely', desc: "Accept the best bid. Payment held in escrow and released only when you confirm the job is done perfectly.", tag: '100% payment protection' },
              ].map((step, i) => (
                <div key={i} className={`bg-dark-800 p-7 relative overflow-hidden ${i === 0 ? 'rounded-t-2xl' : i === 2 ? 'rounded-b-2xl' : ''} border-b border-white/5 last:border-0`}>
                  <span className="absolute top-4 right-5 text-6xl font-black text-white/5 leading-none select-none">{step.n}</span>
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.desc}</p>
                  <span className="inline-block text-xs font-bold text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-lg">{step.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROVIDERS ── */}
      <section className="page-section bg-white">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2">Top Rated</p>
              <h2 className="text-3xl lg:text-4xl font-black text-dark-900">Meet BAZMEER's<br />Verified Experts</h2>
            </div>
            <button onClick={() => navigate('/search')} className="btn-secondary hidden sm:flex">
              Browse All <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SELLERS.slice(0, 3).map(seller => (
              <ProviderCard key={seller.id} seller={seller} showDistance={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="page-section bg-slate-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2">Safety & Trust</p>
            <h2 className="text-3xl lg:text-4xl font-black text-dark-900">Your Safety is<br />Our Priority</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🪪', title: 'CNIC Verified', desc: "Every professional's real identity is verified and on file before they take any job." },
              { icon: '🛡️', title: 'Police Verified', desc: 'Domestic staff — maids, drivers, guards — carry a valid Police Character Certificate.' },
              { icon: '🔐', title: 'Escrow Payments', desc: 'Your payment is held safely by BAZMEER and released only when the job is done to your satisfaction.' },
              { icon: '⭐', title: 'Verified Reviews', desc: 'Only real customers who completed a job can leave a review. No fake ratings, ever.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card p-6 hover:shadow-card-lg transition-shadow">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-dark-900 mb-2">{title}</h3>
                <p className="text-sm text-dark-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Guarantee banner */}
          <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 lg:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black mb-2">🛡️ BAZMEER Safety Guarantee</h3>
              <p className="text-primary-100 text-sm leading-relaxed max-w-xl">
                If any BAZMEER Verified seller causes damage in your home, we compensate up to PKR 10,000 and cooperate fully with law enforcement using the verified identity on file.
              </p>
            </div>
            <button onClick={() => navigate('/how-it-works')} className="btn-secondary flex-shrink-0 whitespace-nowrap">
              Learn More <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-indigo/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="section-container relative text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Ready to get <span className="text-gradient-green">started?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">Join 50,000+ Pakistanis who hire smarter with BAZMEER.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/register')} className="btn-primary px-8 py-3 text-base shadow-green-lg">
              📋 Post a Job Free — No Account Needed
            </button>
            <button onClick={() => navigate('/register/seller')} className="btn-secondary px-8 py-3 text-base">
              👷 Join as a Worker
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
