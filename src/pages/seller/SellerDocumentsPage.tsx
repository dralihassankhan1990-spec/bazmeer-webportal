import PageHeader from '../../components/common/PageHeader';
import { CheckCircle, Clock, Upload, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
export default function SellerDocumentsPage() {
  const docs = [
    {title:'CNIC Identity Verification', status:'approved', icon:'🪪', desc:'Your CNIC has been verified. Identity confirmed.'},
    {title:'BAZMEER Tier 2 Verification', status:'approved', icon:'🔵', desc:'Video call completed. BAZMEER Verified badge active.'},
    {title:'Police Character Certificate', status:'pending', icon:'🛡️', desc:'Upload your Police Character Certificate to unlock domestic staff categories.'},
    {title:'Skill Certification Test', status:'not_started', icon:'🎓', desc:'Take an online test to earn your BAZMEER Certified badge and increase earnings.'},
  ];
  const StatusIcon = ({status}: {status:string}) => {
    if (status === 'approved') return <CheckCircle size={18} className="text-green-500"/>;
    if (status === 'pending') return <Clock size={18} className="text-amber-500"/>;
    return <AlertCircle size={18} className="text-slate-400"/>;
  };
  return (
    <div>
      <PageHeader title="Documents & Verification" subtitle="Manage your verification status"/>
      <div className="p-4 lg:p-6 max-w-lg space-y-4">
        {docs.map(doc => (
          <div key={doc.title} className="card p-5">
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{doc.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-dark-900 text-sm">{doc.title}</h3>
                  <StatusIcon status={doc.status}/>
                </div>
                <p className="text-xs text-dark-600 mt-1 leading-relaxed">{doc.desc}</p>
                {(doc.status === 'not_started' || doc.status === 'pending') && (
                  <button onClick={() => toast.success('Upload initiated!')} className="btn-secondary text-xs py-1.5 px-3 mt-3 flex items-center gap-1.5">
                    <Upload size={12}/>{doc.status === 'pending' ? 'Upload Document' : 'Start Process'}
                  </button>
                )}
              </div>
              <span className={`badge text-xs flex-shrink-0 ${doc.status==='approved'?'badge-green':doc.status==='pending'?'badge-orange':'badge-gray'}`}>
                {doc.status==='approved'?'Approved':doc.status==='pending'?'Pending':'Not Started'}
              </span>
            </div>
          </div>
        ))}
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-5">
          <h3 className="font-bold text-primary-800 mb-2">🛡️ Police Certificate Guide</h3>
          <p className="text-sm text-primary-700 leading-relaxed">Visit your nearest police station with CNIC + 2 photos. Submit form at SHO office. Certificate issued in 7-21 days. Upload here when ready.</p>
          <p className="text-xs text-primary-600 mt-2 font-semibold">📞 WhatsApp Support: 0311-BAZMEER</p>
        </div>
      </div>
    </div>
  );
}