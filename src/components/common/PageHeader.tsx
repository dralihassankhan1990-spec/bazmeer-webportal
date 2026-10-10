import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, backTo, action }: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b border-slate-200 px-4 lg:px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {backTo && (
            <button onClick={() => navigate(backTo)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ArrowLeft size={18} className="text-dark-600" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-black text-dark-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
