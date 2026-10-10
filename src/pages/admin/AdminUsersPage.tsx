import { useState } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
const USERS = [
  {id:'u1',name:'Usman Malik',phone:'0300-1234567',city:'Lahore',joined:'Jan 2025',bookings:5,status:'active'},
  {id:'u2',name:'Sara Ahmed',phone:'0311-9876543',city:'Islamabad',joined:'Feb 2025',bookings:12,status:'active'},
  {id:'u3',name:'Kamran Hussain',phone:'0323-5544332',city:'Lahore',joined:'Dec 2024',bookings:3,status:'active'},
  {id:'u4',name:'Nadia Khan',phone:'0301-7788990',city:'Karachi',joined:'Mar 2025',bookings:1,status:'suspended'},
];
export default function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const users = query ? USERS.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.phone.includes(query)) : USERS;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6"><h1 className="text-xl font-black text-dark-900">Users</h1><span className="badge-gray badge">{USERS.length} total</span></div>
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 mb-5 max-w-sm">
        <Search size={16} className="text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or phone..." className="flex-1 text-sm outline-none"/>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>{['Name','Phone','City','Joined','Bookings','Status','Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-slate-400 uppercase px-5 py-3">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-5 py-3"><p className="font-semibold text-sm text-dark-900">{u.name}</p></td>
                <td className="px-5 py-3 text-sm text-slate-600">{u.phone}</td>
                <td className="px-5 py-3 text-sm text-slate-600">{u.city}</td>
                <td className="px-5 py-3 text-sm text-slate-400">{u.joined}</td>
                <td className="px-5 py-3 text-sm font-semibold text-dark-900">{u.bookings}</td>
                <td className="px-5 py-3"><span className={`badge text-xs ${u.status==='active'?'badge-green':'badge-red'}`}>{u.status}</span></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => toast('Viewing user...',{icon:'👤'})} className="text-xs text-primary-600 hover:underline font-medium">View</button>
                    <button onClick={() => toast(u.status==='active'?'User suspended':'User reactivated',{icon:'⚠️'})} className={`text-xs font-medium hover:underline ${u.status==='active'?'text-red-500':'text-green-600'}`}>{u.status==='active'?'Suspend':'Activate'}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}