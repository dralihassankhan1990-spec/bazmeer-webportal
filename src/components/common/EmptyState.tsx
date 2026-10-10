import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  onCta?: () => void;
}

export default function EmptyState({ icon = '📭', title, description, ctaLabel, ctaTo, onCta }: EmptyStateProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-dark-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-6">{description}</p>
      {ctaLabel && (
        <button
          onClick={ctaTo ? () => navigate(ctaTo) : onCta}
          className="btn-primary px-6"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
