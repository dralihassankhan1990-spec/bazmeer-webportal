import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, MessageCircle, Heart, Share2, ChevronRight, CheckCircle } from 'lucide-react';
import { SELLERS, MOCK_REVIEWS, MOCK_GIGS } from '../../data/mockData';

export default function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const seller = SELLERS.find(s => s.id === id) || SELLERS[0];
  const reviews = MOCK_REVIEWS.filter(r => r.sellerId === seller.id);
  const gigs = MOCK_GIGS.filter(g => g.sellerId === seller.id);

  const stars = [5, 4, 3, 2, 1];
  const reviewsByRating = (r: number) => reviews.filter(rv => Math.floor(rv.rating) === r).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="section-container py-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Avatar & basic */}
            <div className="flex items-start gap-5">
              <div className={`avatar-xl bg-gradient-to-br ${seller.color} text-2xl`}>
                {seller.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl font-black text-dark-900">{seller.name}</h1>
                  {seller.isOnline && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-green" />Online
                    </span>
                  )}
                </div>
                <p className="text-dark-600 text-sm capitalize">
                  {seller.categories.map(c => c.replace(/-/g, ' ')).join(' & ')} · {seller.city}
                </p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-dark-900">{seller.rating}</span>
                    <span className="text-xs text-slate-400">({seller.reviewCount} reviews)</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <span className="text-sm text-slate-500">{seller.jobsCompleted} jobs completed</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-sm text-slate-500">Member since {seller.memberSince}</span>
                </div>
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {seller.badges.map(b => (
                    <span key={b.type} className={`badge text-xs ${b.type === 'cnic' ? 'badge-green' : b.type === 'police' ? 'badge-blue' : b.type === 'certified' ? 'badge-orange' : 'badge-blue'}`}>
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 lg:ml-auto flex-wrap">
              <button onClick={() => navigate(`/user/chat?provider=${seller.id}`)} className="btn-secondary flex items-center gap-2">
                <MessageCircle size={16} /> Message
              </button>
              <button className="btn-secondary"><Heart size={16} /></button>
              <button className="btn-secondary"><Share2 size={16} /></button>
              <button onClick={() => navigate('/user/post-job')} className="btn-primary px-6">
                📋 Post a Job & Invite
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-dark-900 mb-3">About</h2>
              <p className="text-dark-600 leading-relaxed">{seller.bio}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
                {[
                  { label: 'Experience', val: `${seller.experience} years` },
                  { label: 'Jobs Done', val: seller.jobsCompleted },
                  { label: 'Response Time', val: seller.responseTime.replace('Usually within ', '') },
                  { label: 'Areas', val: seller.areasServed.length + ' areas' },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="font-black text-dark-900 text-lg">{val}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Packages */}
            {gigs.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-bold text-dark-900 mb-4">Service Packages</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {gigs[0].packages.map((pkg, i) => (
                    <div key={i} className={`rounded-xl p-4 border-2 ${i === 1 ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white'}`}>
                      {i === 1 && <span className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full mb-2 inline-block">Most Popular</span>}
                      <h3 className="font-bold text-dark-900">{pkg.name}</h3>
                      <p className="text-2xl font-black text-dark-900 my-1">PKR {pkg.price.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 mb-3">{pkg.description}</p>
                      <ul className="space-y-1.5 mb-4">
                        {pkg.includes.map(item => (
                          <li key={item} className="flex items-center gap-1.5 text-xs text-dark-600">
                            <CheckCircle size={12} className="text-primary-500 flex-shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-400">⏱ {pkg.duration}</p>
                      <button className={`w-full mt-3 text-sm py-2 rounded-xl font-semibold transition-all ${i === 1 ? 'btn-primary' : 'btn-secondary'}`}>
                        Book This
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-dark-900 mb-2">Reviews</h2>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-black text-dark-900">{seller.rating}</p>
                  <div className="flex justify-center gap-0.5 my-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= Math.floor(seller.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />)}
                  </div>
                  <p className="text-xs text-slate-500">{seller.reviewCount} reviews</p>
                </div>
                <div className="flex-1">
                  {stars.map(s => (
                    <div key={s} className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 w-4">{s}★</span>
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(reviewsByRating(s) / reviews.length || 0) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 w-4">{reviewsByRating(s)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r.id} className="pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-xs font-bold">{r.userInitials}</div>
                      <div>
                        <p className="text-sm font-semibold text-dark-900">{r.userName}</p>
                        <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={10} className={s <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'} />)}</div>
                      </div>
                      <span className="ml-auto text-xs text-slate-400">{r.date}</span>
                    </div>
                    <p className="text-sm text-dark-600 leading-relaxed">{r.comment}</p>
                    {r.sellerResponse && (
                      <div className="mt-2 bg-primary-50 border border-primary-100 rounded-xl p-3">
                        <p className="text-xs font-semibold text-primary-700 mb-1">Response from {seller.name}:</p>
                        <p className="text-xs text-dark-600">{r.sellerResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Quick contact */}
            <div className="card p-5">
              <h3 className="font-bold text-dark-900 mb-4">Hire {seller.name.split(' ')[0]}</h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/user/post-job')} className="btn-primary w-full">
                  📋 Post a Job & Invite
                </button>
                <button onClick={() => navigate(`/user/chat?provider=${seller.id}`)} className="btn-secondary w-full flex items-center gap-2 justify-center">
                  <MessageCircle size={15} /> Send Message
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">{seller.responseTime}</p>
            </div>

            {/* Areas served */}
            <div className="card p-5">
              <h3 className="font-bold text-dark-900 mb-3">Areas Served</h3>
              <div className="flex flex-wrap gap-2">
                {seller.areasServed.map(a => (
                  <span key={a} className="text-xs bg-slate-100 text-dark-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin size={10} className="text-primary-500" /> {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust info */}
            <div className="card p-5">
              <h3 className="font-bold text-dark-900 mb-3">Verification Status</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Identity (CNIC)', done: true },
                  { label: 'BAZMEER Verified', done: seller.verificationTier >= 2 },
                  { label: 'Police Verified', done: seller.verificationTier >= 3 },
                  { label: 'BAZMEER Certified', done: seller.verificationTier >= 4 },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${done ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {done ? <CheckCircle size={12} className="text-emerald-600" /> : <span className="text-slate-400 text-xs">–</span>}
                    </div>
                    <span className={`text-sm ${done ? 'text-dark-900 font-medium' : 'text-slate-400'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
