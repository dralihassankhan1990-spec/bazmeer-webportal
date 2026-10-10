import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Heart } from 'lucide-react';
import type { Seller } from '../../types';

interface ProviderCardProps {
  seller: Seller;
  showDistance?: boolean;
  compact?: boolean;
}

export default function ProviderCard({ seller, showDistance = true, compact = false }: ProviderCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card-hover p-5 flex flex-col gap-4 cursor-pointer relative"
      onClick={() => navigate(`/providers/${seller.id}`)}
    >
      {/* Availability dot */}
      {seller.isAvailableNow && (
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-green" />
            Available Now
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`avatar-lg bg-gradient-to-br ${seller.color} flex-shrink-0`}>
          {seller.initials}
        </div>
        <div className="min-w-0 flex-1 pr-16">
          <h3 className="font-bold text-dark-900 text-sm leading-tight">{seller.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 capitalize">
            {seller.categories[0]?.replace(/-/g, ' ')} · {seller.city}
            {showDistance && seller.distance && <span className="text-primary-600 font-medium"> · {seller.distance} km</span>}
          </p>
          {/* Badges */}
          <div className="flex flex-wrap gap-1 mt-2">
            {seller.badges.map(b => (
              <span key={b.type} className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${b.type === 'cnic' ? 'bg-emerald-50 text-emerald-700' : b.type === 'police' ? 'bg-indigo-50 text-indigo-700' : b.type === 'certified' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rating + stats */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-dark-900">{seller.rating}</span>
          <span className="text-xs text-slate-400">({seller.reviewCount} reviews)</span>
        </div>
        <span className="text-slate-300">·</span>
        <span className="text-xs text-slate-500">{seller.jobsCompleted} jobs</span>
        <span className="text-slate-300">·</span>
        <span className="text-xs text-slate-500">{seller.experience} yrs exp</span>
      </div>

      {/* Bio */}
      {!compact && (
        <p className="text-sm text-dark-600 leading-relaxed line-clamp-2">{seller.bio}</p>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-2.5">
          <p className="text-base font-black text-dark-900">{seller.jobsCompleted}</p>
          <p className="text-xs text-slate-500">Jobs Done</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5">
          <p className="text-base font-black text-dark-900">PKR {seller.startingPrice.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Starting from</p>
        </div>
      </div>

      {/* Response time */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Clock size={12} className="text-primary-500" />
        {seller.responseTime}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={e => { e.stopPropagation(); navigate(`/providers/${seller.id}`); }}
          className="btn-primary flex-1 text-sm py-2.5"
        >
          Hire Now
        </button>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/user/chat?provider=${seller.id}`); }}
          className="btn-secondary text-sm py-2.5 px-4"
        >
          💬
        </button>
        <button
          onClick={e => { e.stopPropagation(); /* toggle favorite */ }}
          className="btn-secondary text-sm py-2.5 px-3"
        >
          <Heart size={15} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
