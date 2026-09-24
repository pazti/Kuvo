import { useState } from 'react'

const contacts = [
  { id: 1, name: 'Adaeze Nwosu', initials: 'AN', color: '#6C5CE7', phone: '+234 803 456 7890', online: true, mutual: 12 },
  { id: 2, name: 'Biodun Ade', initials: 'BA', color: '#FF6B35', phone: '+234 812 234 5678', online: false, mutual: 8 },
  { id: 3, name: 'Chisom Aneke', initials: 'CA', color: '#F59E0B', phone: '+234 908 765 4321', online: true, mutual: 24 },
  { id: 4, name: 'Emeka Okonkwo', initials: 'EO', color: '#EF4444', phone: '+234 701 234 5678', online: true, mutual: 5 },
  { id: 5, name: 'Fatima Bello', initials: 'FB', color: '#00C853', phone: '+234 815 987 6543', online: false, mutual: 3 },
  { id: 6, name: 'Gbenga Williams', initials: 'GW', color: '#6C5CE7', phone: '+234 704 321 0987', online: false, mutual: 7 },
  { id: 7, name: 'Ifeoma Eze', initials: 'IE', color: '#FF6B35', phone: '+234 809 876 5432', online: true, mutual: 11 },
  { id: 8, name: 'Kelechi Obi', initials: 'KO', color: '#00C853', phone: '+234 813 456 7890', online: false, mutual: 2 },
  { id: 9, name: 'Lola Fashola', initials: 'LF', color: '#F59E0B', phone: '+234 806 543 2109', online: true, mutual: 18 },
  { id: 10, name: 'Musa Danjuma', initials: 'MD', color: '#6C5CE7', phone: '+234 703 678 9012', online: false, mutual: 4 },
  { id: 11, name: 'Ngozi Okafor', initials: 'NO', color: '#EF4444', phone: '+234 907 890 1234', online: true, mutual: 9 },
  { id: 12, name: 'Tunde Kelani', initials: 'TK', color: '#00C853', phone: '+234 802 345 6789', online: true, mutual: 31 },
]

const grouped = contacts.reduce<Record<string, typeof contacts>>((acc, c) => {
  const letter = c.name[0]
  if (!acc[letter]) acc[letter] = []
  acc[letter].push(c)
  return acc
}, {})

export default function ContactsScreen({ onChat }: { onChat: () => void }) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | 'online'>('all')

  const filtered = contacts.filter(c => {
    const match = c.name.toLowerCase().includes(search.toLowerCase())
    return match && (tab === 'online' ? c.online : true)
  })

  const filteredGrouped = filtered.reduce<Record<string, typeof contacts>>((acc, c) => {
    const letter = c.name[0]
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(c)
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">Contacts</h1>
          <button className="bg-[#00C853] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-[0_4px_12px_rgba(0,200,83,0.3)] active:scale-95 transition-fast">
            + Invite
          </button>
        </div>

        <div className="flex items-center gap-3 bg-[#F7F8FC] rounded-2xl px-4 py-3 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'online'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-fast capitalize ${
                tab === t
                  ? 'bg-[#00C853] text-white shadow-[0_2px_8px_rgba(0,200,83,0.3)]'
                  : 'bg-[#F7F8FC] text-[#6B7280]'
              }`}
            >
              {t === 'all' ? `All (${contacts.length})` : `Online (${contacts.filter(c => c.online).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
        {filtered.length === 0 ? (
          <EmptyContacts />
        ) : (
          Object.entries(filteredGrouped).sort().map(([letter, group]) => (
            <div key={letter} className="mb-4">
              <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 ml-1">{letter}</div>
              <div className="space-y-2">
                {group.map(contact => (
                  <button
                    key={contact.id}
                    onClick={onChat}
                    className="w-full flex items-center gap-3 bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast text-left"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: contact.color }}>
                        {contact.initials}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${contact.online ? 'bg-[#00C853]' : 'bg-[#9CA3AF]'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-[#1A1A2E]">{contact.name}</p>
                      <p className="text-[13px] text-[#9CA3AF]">{contact.online ? 'Online' : 'Offline'} · {contact.mutual} mutual</p>
                    </div>
                    <button
                      className="w-9 h-9 rounded-full bg-[#E8FFF2] flex items-center justify-center flex-shrink-0"
                      onClick={e => { e.stopPropagation(); onChat() }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#00C853"/>
                      </svg>
                    </button>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function EmptyContacts() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-24 h-24 rounded-full bg-[#EEF0FF] flex items-center justify-center mb-5">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
          <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#6C5CE7"/>
        </svg>
      </div>
      <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">No contacts found</h3>
      <p className="text-[14px] text-[#9CA3AF] text-center">Invite your campus mates to join Kuvo!</p>
    </div>
  )
}
