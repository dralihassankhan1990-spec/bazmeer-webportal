import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, ChevronDown } from 'lucide-react';
import { SELLERS, CATEGORIES } from '../../data/mockData';
import ProviderCard from '../../components/search/ProviderCard';
import toast from 'react-hot-toast';

const RADIUS_OPTIONS = [1, 2, 5, 10, 0]; // 0 = city-wide

export default function NearbySearchPage() {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(5);
  const [isLocating, setIsLocating] = useState(true);
  const [hasLocation, setHasLocation] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLocating(false);
      setHasLocation(true);
      toast.success('📍 Location found — showing providers near you');
    }, 1500);
  }, []);

  let providers = [...SELLERS].sort((a, b) => (a.distance || 99) - (b.distance || 99));
  if (selectedCat) providers = providers.filter(s => s.categories.includes(selectedCat));
  if (radius > 0) providers = providers.filter(s => (s.distance || 99) <= radius);
  if (providers.length < 3 && radius < 10) {
    // auto-expand hint
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 z-30 flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-slate-100">
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-dark-900">Providers Near You</h1>
            <p className="text-xs text-slate-500">{hasLocation ? 'Based on your current location · Lahore' : 'Getting your location...'}</p>
          </div>
          <select
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            className="form-input text-sm py-1.5 w-32"
          >
            <option value={1}>Within 1 km</option>
            <option value={2}>Within 2 km</option>
            <option value={5}>Within 5 km</option>
            <option value={10}>Within 10 km</option>
            <option value={0}>City-wide</option>
          </select>
        </div>
        {/* Category pills */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          <button
            onClick={() => setSelectedCat('')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${!selectedCat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-dark-600 border-slate-200'}`}
          >
            All
          </button>
          {CATEGORIES.slice(0, 8).map(c => (
            <button
              key={c.slug}
              onClick={() => setSelectedCat(selectedCat === c.slug ? '' : c.slug)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${selectedCat === c.slug ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-dark-600 border-slate-200'}`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Simulated Map */}
        <div className="hidden lg:flex flex-col flex-1 bg-slate-200 relative overflow-hidden">
          {/* Map background */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #e8f4e8 0%, #d4e8d4 30%, #c8dfc8 60%, #b8d4b8 100%)',
          }}>
            {/* Grid lines */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute border-slate-300/40 border-t w-full" style={{ top: `${i * 10}%` }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute border-slate-300/40 border-l h-full" style={{ left: `${i * 10}%` }} />
            ))}
            {/* Simulated roads */}
            <div className="absolute bg-white/60 h-1.5 w-full" style={{ top: '35%' }} />
            <div className="absolute bg-white/60 h-1 w-full" style={{ top: '60%' }} />
            <div className="absolute bg-white/60 w-1.5 h-full" style={{ left: '40%' }} />
            <div className="absolute bg-white/40 w-1 h-full" style={{ left: '70%' }} />
          </div>

          {/* User location pin */}
          {isLocating ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
              </div>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded shadow whitespace-nowrap">You</div>
            </div>
          )}

          {/* Provider markers */}
          {!isLocating && providers.map((seller, i) => {
            const positions = [
              { top: '28%', left: '55%' }, { top: '45%', left: '62%' },
              { top: '35%', left: '38%' }, { top: '55%', left: '45%' },
              { top: '40%', left: '72%' }, { top: '60%', left: '58%' },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={seller.id}
                className="absolute z-20 cursor-pointer"
                style={pos}
                onClick={() => setActiveMarker(activeMarker === seller.id ? null : seller.id)}
              >
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${seller.color} border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110`}>
                  {seller.initials}
                </div>
                {activeMarker === seller.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-xl border border-slate-200 shadow-card-lg p-3 min-w-48 z-30 animate-fade-in">
                    <p className="font-bold text-sm text-dark-900">{seller.name}</p>
                    <p className="text-xs text-slate-500">{seller.categories[0]} · {seller.distance} km away</p>
                    <p className="text-xs text-amber-600 mt-1">★ {seller.rating} · {seller.reviewCount} reviews</p>
                    <button
                      onClick={() => navigate(`/providers/${seller.id}`)}
                      className="btn-primary w-full mt-2 text-xs py-1.5"
                    >
                      View Profile
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Radius circle indicator */}
          {!isLocating && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-400 border-dashed bg-primary-100/10 pointer-events-none"
              style={{ width: `${radius === 0 ? 300 : radius * 60}px`, height: `${radius === 0 ? 300 : radius * 60}px` }}
            />
          )}

          {/* Map label */}
          <div className="absolute bottom-4 left-4 bg-white/90 text-xs text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 shadow">
            📍 Simulated map · GPS-based in production
          </div>

          {/* My location button */}
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl border border-slate-200 shadow-card flex items-center justify-center hover:bg-slate-50 transition-colors">
            <Navigation size={16} className="text-primary-600" />
          </button>
        </div>

        {/* Provider list panel */}
        <div className="w-full lg:w-80 xl:w-96 bg-white border-l border-slate-200 flex flex-col overflow-hidden flex-shrink-0">
          <div className="p-4 border-b border-slate-200 flex-shrink-0">
            {isLocating ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="animate-spin">⟳</span> Getting your location...
              </div>
            ) : (
              <>
                <p className="text-sm font-bold text-dark-900">{providers.length} providers found</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {radius === 0 ? 'City-wide' : `Within ${radius} km`} · Sorted by distance
                </p>
                {providers.length === 0 && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-amber-800">No providers in {radius} km</p>
                    <button onClick={() => setRadius(0)} className="text-xs text-primary-600 font-medium mt-1 hover:underline">
                      Expand to city-wide →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {providers.map(seller => (
              <ProviderCard key={seller.id} seller={seller} showDistance compact />
            ))}
            {providers.length > 0 && (
              <button
                onClick={() => navigate('/user/post-job')}
                className="w-full border-2 border-dashed border-primary-200 rounded-2xl p-5 text-center hover:border-primary-400 hover:bg-primary-50 transition-all"
              >
                <div className="text-2xl mb-2">📋</div>
                <p className="text-sm font-bold text-dark-900">Don't see the right person?</p>
                <p className="text-xs text-slate-500 mt-1">Post a job and let providers come to you</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
