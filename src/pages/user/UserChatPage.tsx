import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Phone, MoreVertical } from 'lucide-react';
import { MOCK_MESSAGES, MOCK_CONVERSATIONS } from '../../data/mockData';
export default function UserChatPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES.filter(m => m.conversationId === conversationId));
  const conv = MOCK_CONVERSATIONS.find(c => c.id === conversationId) || MOCK_CONVERSATIONS[0];
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);
  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: 'mx'+Date.now(), conversationId: conv.id, senderId: 'u1', senderName: 'You', senderRole: 'user', type: 'text', content: input, sentAt: new Date().toISOString(), isRead: false }]);
    setInput('');
  };
  return (
    <div className="flex flex-col h-screen lg:h-[calc(100vh-0px)]">
      <div className="bg-white border-b border-slate-200 flex items-center gap-3 px-4 h-14 flex-shrink-0">
        <button onClick={() => navigate('/user/chat')} className="p-2 rounded-xl hover:bg-slate-100"><ArrowLeft size={18}/></button>
        <div className={`avatar-sm bg-gradient-to-br ${conv.otherPartyColor}`}>{conv.otherPartyInitials}</div>
        <div className="flex-1"><p className="font-bold text-sm text-dark-900">{conv.otherPartyName}</p><p className="text-xs text-slate-500">{conv.isOnline ? '🟢 Online' : 'Offline'} · {conv.jobTitle}</p></div>
        <a href="tel:03001234567" className="p-2 rounded-xl hover:bg-slate-100"><Phone size={18} className="text-dark-600"/></a>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map(m => {
          const isMe = m.senderRole === 'user';
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-primary-500 text-white rounded-br-md' : 'bg-white border border-slate-200 text-dark-900 rounded-bl-md shadow-card'}`}>
                <p>{m.content}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-primary-100' : 'text-slate-400'}`}>{new Date(m.sentAt).toLocaleTimeString('en-PK', {hour:'2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>
      <div className="bg-white border-t border-slate-200 p-3 flex gap-3 flex-shrink-0">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Type a message..." className="flex-1 form-input text-sm py-2.5"/>
        <button onClick={send} disabled={!input.trim()} className="btn-primary px-4 py-2.5 disabled:opacity-50"><Send size={16}/></button>
      </div>
    </div>
  );
}