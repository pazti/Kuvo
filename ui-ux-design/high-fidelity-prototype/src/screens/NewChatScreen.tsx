import { useState } from 'react'

const allContacts = [
  { id: 1, name: 'Adaeze Nwosu', initials: 'AN', color: '#6C5CE7', online: true },
  { id: 2, name: 'Biodun Ade', initials: 'BA', color: '#FF6B35', online: false },
  { id: 3, name: 'Chisom Aneke', initials: 'CA', color: '#F59E0B', online: true },
  { id: 4, name: 'Emeka Okonkwo', initials: 'EO', color: '#EF4444', online: true },
  { id: 5, name: 'Fatima Bello', initials: 'FB', color: '#00C853', online: false },
  { id: 6, name: 'Gbenga Williams', initials: 'GW', color: '#6C5CE7', online: false },
  { id: 7, name: 'Ifeoma Eze', initials: 'IE', color: '#FF6B35', online: true },
  { id: 8, name: 'Kelechi Obi', initials: 'KO', color: '#00C853', online: false },
  { id: 9, name: 'Tunde Kelani', initials: 'TK', color: '#00C853', online: true },
]

export default function NewChatScreen({
  onBack,
  onOpenChat,
  onOpenGroup,
}: {
  onBack: () => void
  onOpenChat: () => void
  onOpenGroup: () => void
}) {
  const [mode, setMode] = useState<'menu' | 'dm' | 'group'>('menu')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [groupName, setGroupName] = useState('')

  const filtered = allContacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  if (mode === 'menu') return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      <div className="bg-white px-5 pt-12 pb-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[22px] font-bold text-[#1A1A2E]">New Chat</h1>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-3">
        {/* New Group */}
        <button
          onClick={() => setMode('group')}
          className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-fast text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#6C5CE7"/>
            </svg>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A2E]">New Group</p>
            <p className="text-[13px] text-[#9CA3AF]">Create a group with your squad</p>
          </div>
        </button>

        {/* New DM */}
        <button
          onClick={() => setMode('dm')}
          className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-fast text-left"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E8FFF2] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#00C853"/>
            </svg>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A2E]">New Message</p>
            <p className="text-[13px] text-[#9CA3AF]">Start a private chat with someone</p>
          </div>
        </button>

        {/* Invite friends */}
        <button className="w-full flex items-center gap-4 bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-fast text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="#FF6B35"/>
            </svg>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-[#1A1A2E]">Invite Friends</p>
            <p className="text-[13px] text-[#9CA3AF]">Bring your squad to Kuvo</p>
          </div>
        </button>

        {/* Suggested contacts */}
        <div className="pt-2">
          <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Suggested</h3>
          <div className="space-y-2">
            {allContacts.filter(c => c.online).slice(0, 3).map(c => (
              <button
                key={c.id}
                onClick={onOpenChat}
                className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast text-left"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: c.color }}>
                    {c.initials}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00C853] border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-[#1A1A2E]">{c.name}</p>
                  <p className="text-[12px] text-[#00C853] font-medium">Online</p>
                </div>
                <span className="text-[13px] text-[#00C853] font-semibold">Chat</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (mode === 'dm') return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setMode('menu')} className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-[#1A1A2E]">New Message</h1>
        </div>
        <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-2xl px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts..."
            autoFocus
            className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-2">
        {filtered.map(c => (
          <button
            key={c.id}
            onClick={onOpenChat}
            className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast text-left"
          >
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: c.color }}>
                {c.initials}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${c.online ? 'bg-[#00C853]' : 'bg-[#9CA3AF]'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-[#1A1A2E]">{c.name}</p>
              <p className={`text-[12px] font-medium ${c.online ? 'text-[#00C853]' : 'text-[#9CA3AF]'}`}>{c.online ? 'Online' : 'Offline'}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  // Group creation
  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => { setMode('menu'); setSelected([]) }} className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-[#1A1A2E]">New Group</h1>
            <p className="text-[13px] text-[#9CA3AF]">{selected.length} selected</p>
          </div>
          {selected.length >= 2 && (
            <button
              onClick={onOpenGroup}
              className="bg-[#6C5CE7] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(108,92,231,0.3)]"
            >
              Create
            </button>
          )}
        </div>

        {/* Group name input */}
        <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-2xl px-4 py-3 mb-3">
          <span className="text-lg">✏️</span>
          <input
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            placeholder="Group name..."
            className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {selected.map(id => {
              const c = allContacts.find(x => x.id === id)!
              return (
                <button
                  key={id}
                  onClick={() => toggleSelect(id)}
                  className="flex items-center gap-1.5 bg-[#EEF0FF] rounded-full pl-1 pr-3 py-1 flex-shrink-0"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: c.color }}>
                    {c.initials[0]}
                  </div>
                  <span className="text-[13px] font-medium text-[#6C5CE7]">{c.name.split(' ')[0]}</span>
                  <span className="text-[#6C5CE7] text-xs ml-0.5">✕</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-2">
        <p className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">Select Members</p>
        {allContacts.map(c => {
          const isSelected = selected.includes(c.id)
          return (
            <button
              key={c.id}
              onClick={() => toggleSelect(c.id)}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-fast text-left ${isSelected ? 'bg-[#EEF0FF]' : 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]'}`}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: c.color }}>
                {c.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-[#1A1A2E]">{c.name}</p>
                <p className={`text-[12px] font-medium ${c.online ? 'text-[#00C853]' : 'text-[#9CA3AF]'}`}>{c.online ? 'Online' : 'Offline'}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#6C5CE7]' : 'border-2 border-[#E5E7EB]'}`}>
                {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
