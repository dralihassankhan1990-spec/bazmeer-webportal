import { useNavigate } from 'react-router-dom';
import { MOCK_CONVERSATIONS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
export default function SellerChatListPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Messages"/>
      <div className="divide-y divide-slate-100">
        {MOCK_CONVERSATIONS.map(c => (
          <div key={c.id} onClick={() => navigate(`/seller/chat/${c.id}`)} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer">
            <div className={`avatar-md bg-gradient-to-br from-primary-500 to-primary-700`}>U</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-dark-900">User · {c.jobTitle}</p>
              <p className="text-sm text-dark-600 truncate">{c.lastMessage}</p>
            </div>
            {c.unreadCount > 0 && <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">{c.unreadCount}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}