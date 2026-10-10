import { useNavigate } from 'react-router-dom';
import { SELLERS } from '../../data/mockData';
import ProviderCard from '../../components/search/ProviderCard';
import PageHeader from '../../components/common/PageHeader';
export default function UserFavoritesPage() {
  const navigate = useNavigate();
  const favorites = SELLERS.slice(0, 3);
  return (
    <div>
      <PageHeader title="Saved Professionals" subtitle="Your favorite service providers"/>
      <div className="p-4 lg:p-6">
        {favorites.length === 0 ? (
          <div className="text-center py-20"><div className="text-5xl mb-4">❤️</div><h3 className="text-xl font-bold text-dark-900 mb-3">No saved professionals</h3><button onClick={() => navigate('/user/search')} className="btn-primary px-8">Browse Professionals</button></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{favorites.map(s => <ProviderCard key={s.id} seller={s}/>)}</div>
        )}
      </div>
    </div>
  );
}