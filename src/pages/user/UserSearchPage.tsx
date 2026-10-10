import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { CATEGORIES, CITIES, LAHORE_AREAS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
export default function UserSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('');
  const handleSearch = () => navigate(`/user/search/results?q=${encodeURIComponent(query)}&city=${city}&area=${area}`);
  return (
    <div>
      <PageHeader title="Find a Professional" subtitle="Search or browse by category" />
      <div className="p-4 lg:p-6 max-w-2xl">
        <div className="card p-5 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <Search size={16} className="text-slate-400"/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. Electrician, Plumber..." className="flex-1 text-sm bg-transparent outline-none" onKeyDown={e => e.key==='Enter' && handleSearch()}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="form-label">City</label><select value={city} onChange={e => setCity(e.target.value)} className="form-input text-sm">{CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="form-label">Area</label><select value={area} onChange={e => setArea(e.target.value)} className="form-input text-sm"><option value="">Any area</option>{LAHORE_AREAS.map(a => <option key={a}>{a}</option>)}</select></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/user/search/nearby')} className="btn-secondary flex-1 flex items-center gap-2 justify-center"><MapPin size={15}/>Near Me</button>
              <button onClick={handleSearch} className="btn-primary flex-1">Search Professionals</button>
            </div>
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Browse by Category</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat.slug} onClick={() => navigate(`/search?cat=${cat.slug}&city=${city}`)} className="card-hover p-4 flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-xl text-2xl flex items-center justify-center" style={{background: cat.bgColor}}>{cat.icon}</div>
              <span className="text-xs font-bold text-dark-900">{cat.name}</span>
              <span className="text-xs text-slate-400">{cat.workerCount.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}