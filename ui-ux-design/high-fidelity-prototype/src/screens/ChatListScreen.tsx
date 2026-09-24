import { useState } from 'react'

const stories = [
  { id: 1, name: 'My Status', avatar: 'me', isMe: true },
  { id: 2, name: 'Tunde', avatar: 'TK', color: '#00C853', seen: false },
  { id: 3, name: 'Adaeze', avatar: 'AN', color: '#6C5CE7', seen: false },
  { id: 4, name: 'Emeka', avatar: 'EO', color: '#FF6B35', seen: true },
  { id: 5, name: 'Chisom', avatar: 'CA', color: '#F59E0B', seen: true },
]

const chats = [
  {
    id: 1, name: 'Tunde Kelani', avatar: 'TK', color: '#00C853',
    lastMsg: 'Guy where you dey? We dey wait you o 😂', time: '2m',
    unread: 3, online: true, type: 'dm',
  },
  {
    id: 2, name: 'UNILAG CS 300L', avatar: 'UC', color: '#6C5CE7',
    lastMsg: 'Prof: Assignment submission is tomorrow midnight', time: '15m',
    unread: 12, online: false, type: 'group', members: 47,
  },
  {
    id: 3, name: 'Adaeze Nwosu', avatar: 'AN', color: '#FF6B35',
    lastMsg: 'Send me the lecture notes abeg, I missed class', time: '1h',
    unread: 1, online: true, type: 'dm',
  },
  {
    id: 4, name: 'Friday Night Crew 🎉', avatar: 'FN', color: '#F59E0B',
    lastMsg: 'Emeka: Location don change, we move to Lekki Phase 1', time: '2h',
    unread: 0, online: false, type: 'group', members: 8,
  },
  {
    id: 5, name: 'Chisom Aneke', avatar: 'CA', color: '#00C853',
    lastMsg: 'You: I go call you back later, in lecture now', time: '3h',
    unread: 0, online: false, type: 'dm',
  },
  {
    id: 6, name: 'Hostel Block D', avatar: 'HB', color: '#6C5CE7',
    lastMsg: 'Admin: Light will be restored by 6PM today', time: '4h',
    unread: 0, online: false, type: 'group', members: 156,
  },
  {
    id: 7, name: 'Biodun Ade', avatar: 'BA', color: '#FF6B35',
    lastMsg: "Bro that project idea is 🔥, let's collab", time: 'Yesterday',
    unread: 0, online: false, type: 'dm',
  },
  {
    id: 8, name: 'Study Squad', avatar: 'SS', color: '#9CA3AF',
    lastMsg: 'Nkechi: Anyone understands this Data Structures topic?', time: 'Yesterday',
    unread: 0, online: false, type: 'group', members: 6,
  },
]

export default function ChatListScreen({
  onChat, onGroup, onNewChat,
}: { onChat: () => void; onGroup: () => void; onNewChat: () => void }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'groups'>('all')

  const filtered = chats.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'unread') return matchSearch && c.unread > 0
    if (filter === 'groups') return matchSearch && c.type === 'group'
    return matchSearch
  })

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[26px] font-bold text-[#1A1A2E]">Kuvo</h1>
            <p className="text-[13px] text-[#9CA3AF] font-medium">3 unread messages</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-[#F7F8FC] flex items-center justify-center">
              <SearchIconSm />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#F7F8FC] flex items-center justify-center">
              <MoreIcon />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-2xl px-4 py-3 mb-4">
          <SearchIconSm />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'unread', 'groups'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-fast capitalize ${
                filter === f
                  ? 'bg-[#00C853] text-white shadow-[0_2px_8px_rgba(0,200,83,0.3)]'
                  : 'bg-[#F7F8FC] text-[#6B7280]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Stories / Status Row */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {stories.map(s => (
              <div key={s.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="relative">
                  {s.isMe ? (
                    <div className="w-14 h-14 rounded-full bg-[#E8FFF2] border-2 border-dashed border-[#00C853] flex items-center justify-center">
                      <span className="text-[#00C853] text-xl font-bold">+</span>
                    </div>
                  ) : (
                    <div className={`w-14 h-14 rounded-full p-[2px] ${s.seen ? 'bg-[#E5E7EB]' : 'bg-gradient-to-br from-[#00C853] to-[#6C5CE7]'}`}>
                      <div className="w-full h-full rounded-full bg-white p-[2px]">
                        <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-base" style={{ backgroundColor: s.color }}>
                          {s.avatar}
                        </div>
                      </div>
                    </div>
                  )}
                  {!s.isMe && (
                    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${s.seen ? 'bg-[#9CA3AF]' : 'bg-[#00C853]'}`} />
                  )}
                </div>
                <span className="text-[11px] text-[#6B7280] font-medium text-center w-14 truncate">
                  {s.isMe ? 'My Status' : s.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-[#E5E7EB] mb-2" />

        {/* Chat list */}
        {filtered.length === 0 ? (
          <EmptyChats />
        ) : (
          <div className="px-5 space-y-1 pb-4">
            {filtered.map(chat => (
              <button
                key={chat.id}
                onClick={() => chat.type === 'group' ? onGroup() : onChat()}
                className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast text-left"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base" style={{ backgroundColor: chat.color }}>
                    {chat.type === 'group' ? (
                      <span className="text-sm">{chat.avatar}</span>
                    ) : (
                      chat.avatar
                    )}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#00C853] border-2 border-white" />
                  )}
                  {chat.type === 'group' && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#6C5CE7] border-2 border-white flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                        <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V18H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V18H23V16.5C23 14.17 18.33 13 16 13Z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-[15px] text-[#1A1A2E] truncate">{chat.name}</span>
                    <span className={`text-[12px] flex-shrink-0 ml-2 ${chat.unread > 0 ? 'text-[#00C853] font-semibold' : 'text-[#9CA3AF]'}`}>{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-[#6B7280] truncate flex-1">{chat.lastMsg}</p>
                    {chat.unread > 0 && (
                      <div className="ml-2 min-w-[20px] h-5 rounded-full bg-[#00C853] flex items-center justify-center px-1.5 flex-shrink-0">
                        <span className="text-white text-[11px] font-bold">{chat.unread > 99 ? '99+' : chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={onNewChat}
        className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-[#00C853] shadow-[0_6px_20px_rgba(0,200,83,0.4)] flex items-center justify-center active:scale-95 transition-fast z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white"/>
          <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

function EmptyChats() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-24 h-24 rounded-full bg-[#E8FFF2] flex items-center justify-center mb-5">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#00C853"/>
        </svg>
      </div>
      <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">No chats yet</h3>
      <p className="text-[14px] text-[#9CA3AF] text-center">Start a conversation with your campus mates. Hit the green button below!</p>
    </div>
  )
}

function SearchIconSm() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="#6B7280"/>
      <circle cx="12" cy="12" r="1.5" fill="#6B7280"/>
      <circle cx="12" cy="19" r="1.5" fill="#6B7280"/>
    </svg>
  )
}
