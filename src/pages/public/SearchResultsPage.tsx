import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { SELLERS, CATEGORIES, CITIES, LAHORE_AREAS } from '../../data/mockData';
import ProviderCard from '../../components/search/ProviderCard';
import type { Seller } from '../../types';

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterFemale, setFilterFemale] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedCity, setSelectedCity] = useState(params.get('city') || 'Lahore');
  const [query, setQuery] = useState(params.get('q') || '');

  const cat = params.get('cat') || '';

  let results: Seller[] = SELLERS;
  if (cat) results = results.filter(s => s.categories.includes(cat));
  if (query) results = results.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.categories.some(c => c.includes(query.toLowerCase())) ||
    s.bio.toLowerCase().includes(query.toLowerCase())
  );
  if (filterVerified) results = results.filter(s => s.verificationTier >= 2);
  if (filterAvailable) results = results.filter(s => s.isAvailableNow);
  if (filterFemale) results = results.filter(s => s.name.match(/Fatima|Nasreen|Sara|Saba|Amina|Noor/));
  if (minRating > 0) results = results.filter(s => s.rating >= minRating);

  if (sortBy === 'rating') results = [...results].sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'price') results = [...results].sort((a, b) => a.startingPrice - b.startingPrice);
  else if (sortBy === 'distance') results = [...results].sort((a, b) => (a.distance || 99) - (b.distance || 99));
  else if (sortBy === 'newest') results = [...results].sort((a, b) => b.jobsCompleted - a.jobsCompleted);

  const catLabel = CATEGORIES.find(c => c.slug === cat)?.name || (query ? `"${query}"` : 'All Services');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="section-container py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search services or providers..."
                className="flex-1 text-sm text-dark-900 placeholder-slate-400 bg-transparent outline-none"
              />
              {query && <button onClick={() => setQuery('')}><X size={14} className="text-slate-400" /></button>}
            </div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="form-input py-2.5 w-36 text-sm"
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={() => navigate('/search/nearby')}
              className="btn-secondary text-sm py-2.5 whitespace-nowrap flex items-center gap-1.5"
            >
              <MapPin size={14} /> Near Me
            </button>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`btn-secondary text-sm py-2.5 flex items-center gap-1.5 ${filtersOpen ? 'border-primary-400 text-primary-600' : ''}`}
            >
              <SlidersHorizontal size={14} /> Filters
              {(filterVerified || filterAvailable || filterFemale || minRating > 0) && (
                <span className="w-4 h-4 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">!</span>
              )}
            </button>
          </div>
          {/* Category pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => navigate('/search')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${!cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-dark-600 border-slate-200 hover:border-primary-300'}`}
            >
              All
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.slug}
                onClick={() => navigate(`/search?cat=${c.slug}&city=${selectedCity}`)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border transition-all ${cat === c.slug ? 'bg-primary-500 text-white border-primary-500' : 'bg-white text-dark-600 border-slate-200 hover:border-primary-300'}`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {filtersOpen && (
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="card p-5 sticky top-40">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-dark-900">Filters</h3>
                  <button
                    onClick={() => { setFilterVerified(false); setFilterAvailable(false); setFilterFemale(false); setMinRating(0); }}
                    className="text-xs text-primary-600 font-medium hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="form-label mb-3">Quick Filters</p>
                    {[
                      { label: '✅ Verified Only', val: filterVerified, set: setFilterVerified },
                      { label: '🟢 Available Now', val: filterAvailable, set: setFilterAvailable },
                      { label: '👩 Female Providers', val: filterFemale, set: setFilterFemale },
                    ].map(({ label, val, set }) => (
                      <label key={label} className="flex items-center gap-3 mb-3 cursor-pointer">
                        <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="w-4 h-4 rounded accent-primary-500" />
                        <span className="text-sm text-dark-700">{label}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <p className="form-label mb-3">Minimum Rating</p>
                    {[0, 3, 4, 4.5].map(r => (
                      <label key={r} className="flex items-center gap-3 mb-2 cursor-pointer">
                        <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} name="rating" className="accent-primary-500" />
                        <span className="text-sm text-dark-700">{r === 0 ? 'Any Rating' : `${r}★ & above`}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <p className="form-label mb-2">Sort By</p>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-input text-sm py-2">
                      <option value="rating">Top Rated</option>
                      <option value="distance">Nearest First</option>
                      <option value="price">Lowest Price</option>
                      <option value="newest">Most Experienced</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-black text-dark-900">{catLabel}</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  {results.length} professionals in {selectedCity}
                  {filterVerified && ' · Verified only'}{filterAvailable && ' · Available now'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="form-input text-sm py-2 w-40">
                  <option value="rating">Top Rated</option>
                  <option value="distance">Nearest First</option>
                  <option value="price">Lowest Price</option>
                  <option value="newest">Most Experienced</option>
                </select>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">No providers found</h3>
                <p className="text-dark-600 mb-6">Try adjusting your filters or posting a job to receive bids.</p>
                <button onClick={() => navigate('/user/post-job')} className="btn-primary px-8">Post a Job & Get Bids →</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map(s => <ProviderCard key={s.id} seller={s} showDistance={sortBy === 'distance'} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
