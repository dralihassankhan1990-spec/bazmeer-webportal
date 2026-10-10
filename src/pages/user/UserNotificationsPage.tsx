import { useNotificationStore } from '../../store';
import PageHeader from '../../components/common/PageHeader';
import { useNavigate } from 'react-router-dom';
const TYPE_ICON: Record<string, string> = { new_bid: '🔨', message: '💬', payment: '💰', review: '⭐', booking: '📅' };
export default function UserNotificationsPage() {
  const { notifications, markAllRead, markRead } = useNotificationStore();
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="Notifications" action={<button onClick={markAllRead} className="text-sm text-primary-600 font-medium hover:underline">Mark all read</button>}/>
      <div className="divide-y divide-slate-100">
        {notifications.map(n => (
          <div key={n.id} onClick={() => { markRead(n.id); if(n.link) navigate(n.link); }} className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${!n.isRead ? 'bg-primary-50/40' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg flex-shrink-0">{TYPE_ICON[n.type] || '🔔'}</div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.isRead ? 'font-bold text-dark-900' : 'font-medium text-dark-700'}`}>{n.title}</p>
              <p className="text-xs text-dark-600 mt-0.5 leading-relaxed">{n.body}</p>
              <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString('en-PK', {day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</p>
            </div>
            {!n.isRead && <span className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5"/>}
          </div>
        ))}
        {notifications.length === 0 && <div className="text-center py-20"><div className="text-5xl mb-4">🔔</div><p className="font-bold text-dark-900">No notifications yet</p></div>}
      </div>
    </div>
  );
}