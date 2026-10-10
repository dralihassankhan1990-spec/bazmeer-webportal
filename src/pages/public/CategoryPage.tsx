import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, SELLERS } from '../../data/mockData';
import ProviderCard from '../../components/search/ProviderCard';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  const sellers = SELLERS.filter(s => s.categories.includes(categorySlug || ''));

  if (!cat) return <div className="text-center py-20"><p>Category not found.</p></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="section-container">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl text-4xl flex items-center justify-center" style={{ background: cat.bgColor }}>{cat.icon}</div>
            <div>
              <h1 className="text-3xl font-black text-dark-900">{cat.name}</h1>
              <p className="text-dark-600">{cat.workerCount.toLocaleString()} verified professionals in Pakistan</p>
            </div>
            <button onClick={() => navigate('/user/post-job')} className="btn-primary ml-auto hidden sm:flex">
              📋 Post a Job & Get Bids
            </button>
          </div>
          {/* Sub-categories */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {cat.subcategories.map(sub => (
              <button key={sub.slug} onClick={() => navigate(`/search?cat=${cat.slug}&sub=${sub.slug}`)}
                className="text-sm bg-white border border-slate-200 hover:border-primary-400 hover:text-primary-600 px-3 py-1.5 rounded-full transition-all">
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="section-container py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellers.map(s => <ProviderCard key={s.id} seller={s} />)}
        </div>
        {sellers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-bold text-dark-900 mb-3">No {cat.name}s yet in your city</h3>
            <p className="text-dark-600 mb-6">Post a job and they'll find you!</p>
            <button onClick={() => navigate('/user/post-job')} className="btn-primary px-8">Post a Job Free</button>
          </div>
        )}
      </div>
    </div>
  );
}
