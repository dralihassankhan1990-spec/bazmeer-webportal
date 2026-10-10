import { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
export default function CategoriesPage() {
  const [cats, setCats] = useState(CATEGORIES);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-dark-900">Categories</h1>
        <button onClick={() => toast.success('Add category modal...')} className="btn-primary text-sm flex items-center gap-1.5"><Plus size={14}/>Add Category</button>
      </div>
      <div className="space-y-3">
        {cats.map(cat => (
          <div key={cat.slug} className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl text-xl flex items-center justify-center flex-shrink-0" style={{background:cat.bgColor}}>{cat.icon}</div>
            <div className="flex-1">
              <p className="font-bold text-sm text-dark-900">{cat.name} <span className="text-sm text-slate-400 font-normal">({cat.nameUr})</span></p>
              <p className="text-xs text-slate-500">{cat.workerCount.toLocaleString()} workers · {cat.subcategories.length} subcategories · /{cat.slug}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => toast('Editing...',{icon:'✏️'})} className="text-xs text-primary-600 font-medium hover:underline">Edit</button>
              <button onClick={() => toast('Deactivated',{icon:'🚫'})} className="text-xs text-red-500 font-medium hover:underline">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}