import { useNavigate } from 'react-router-dom';
import { MOCK_CONVERSATIONS } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
export default function UserChatListPage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Messages" subtitle="Your conversations"/>
      <div className="divide-y divide-slate-100">
        {MOCK_CONVERSATIONS.map(c => (
          <div key={c.id} onClick={() => navigate(`/user/chat/${c.id}`)} className="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="relative">
              <div className={`avatar-md bg-gradient-to-br ${c.otherPartyColor}`}>{c.otherPartyInitials}</div>
              {c.isOnline && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white"/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-dark-900">{c.otherPartyName}</p>
                <p className="text-xs text-slate-400">{new Date(c.lastMessageAt).toLocaleTimeString('en-PK', {hour:'2-digit', minute:'2-digit'})}</p>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{c.jobTitle}</p>
              <p className="text-sm text-dark-600 truncate mt-0.5">{c.lastMessage}</p>
            </div>
            {c.unreadCount > 0 && <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{c.unreadCount}</span>}
          </div>
        ))}
        {MOCK_CONVERSATIONS.length === 0 && (
          <div className="text-center py-20"><div className="text-5xl mb-4">💬</div><p className="font-bold text-dark-900">No messages yet</p></div>
        )}
      </div>
    </div>
  );
}