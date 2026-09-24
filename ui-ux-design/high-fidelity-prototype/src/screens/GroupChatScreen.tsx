import { useState, useRef, useEffect } from 'react'

type Msg = {
  id: number
  text: string
  time: string
  mine: boolean
  sender?: string
  senderColor?: string
  senderInitials?: string
}

const members = [
  { name: 'Tunde Kelani', initials: 'TK', color: '#00C853', role: 'admin' },
  { name: 'Adaeze Nwosu', initials: 'AN', color: '#6C5CE7', role: 'member' },
  { name: 'Emeka Okonkwo', initials: 'EO', color: '#FF6B35', role: 'member' },
  { name: 'Chisom Aneke', initials: 'CA', color: '#F59E0B', role: 'member' },
  { name: 'Biodun Ade', initials: 'BA', color: '#EF4444', role: 'member' },
]

const initialMessages: Msg[] = [
  { id: 1, text: 'Good morning fam! Who attended Prof Ade lecture this morning?', time: '9:05 AM', mine: false, sender: 'Tunde Kelani', senderColor: '#00C853', senderInitials: 'TK' },
  { id: 2, text: 'I was there o. The man postponed the assignment to next Friday', time: '9:12 AM', mine: false, sender: 'Adaeze Nwosu', senderColor: '#6C5CE7', senderInitials: 'AN' },
  { id: 3, text: 'Thank God! I was sweating bullets 😅', time: '9:14 AM', mine: false, sender: 'Emeka Okonkwo', senderColor: '#FF6B35', senderInitials: 'EO' },
  { id: 4, text: 'Wait for real? Someone send the recording abeg', time: '9:17 AM', mine: true },
  { id: 5, text: '@You check Google Classroom, Tunde uploaded it already', time: '9:18 AM', mine: false, sender: 'Chisom Aneke', senderColor: '#F59E0B', senderInitials: 'CA' },
  { id: 6, text: "Guys who's free for library session today? 3PM?", time: '9:22 AM', mine: false, sender: 'Biodun Ade', senderColor: '#EF4444', senderInitials: 'BA' },
  { id: 7, text: 'I fit make it 🙋‍♂️', time: '9:23 AM', mine: true },
]

export default function GroupChatScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages)
  const [input, setInput] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    setMessages(m => [...m, {
      id: Date.now(),
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
      mine: true,
    }])
    setInput('')
  }

  if (showInfo) return <GroupInfoPanel onBack={() => setShowInfo(false)} />

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[#6C5CE7] px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setShowInfo(true)} className="flex items-center gap-3 flex-1 min-w-0">
            {/* Group avatar cluster */}
            <div className="relative w-10 h-10 flex-shrink-0">
              {members.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold border border-[#6C5CE7]"
                  style={{ backgroundColor: m.color, left: i * 8, top: i === 1 ? 0 : i * 5, zIndex: 3 - i }}
                >
                  {m.initials[0]}
                </div>
              ))}
            </div>
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold text-white">UNILAG CS 300L</h2>
              <p className="text-[12px] text-white/70">47 members · 5 online</p>
            </div>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <circle cx="12" cy="19" r="1.5" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F7F8FC]">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-[11px] text-[#9CA3AF] font-medium bg-[#F7F8FC] px-2">Today</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {messages.map((msg, idx) => {
          const prevSender = idx > 0 ? messages[idx - 1].sender : null
          const showSenderName = !msg.mine && msg.sender !== prevSender
          return (
            <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!msg.mine && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ backgroundColor: msg.senderColor, opacity: showSenderName ? 1 : 0 }}
                >
                  {msg.senderInitials}
                </div>
              )}
              <div className={`max-w-[72%] flex flex-col gap-1 ${msg.mine ? 'items-end' : 'items-start'}`}>
                {showSenderName && !msg.mine && (
                  <span className="text-[12px] font-semibold px-1" style={{ color: msg.senderColor }}>{msg.sender}</span>
                )}
                <div className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                  msg.mine
                    ? 'bg-[#6C5CE7] text-white rounded-br-md'
                    : 'bg-white text-[#1A1A2E] rounded-bl-md shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[11px] text-[#9CA3AF] px-1">{msg.time}</span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[#E5E7EB] px-4 py-3">
        <div className="flex items-end gap-3">
          <button className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 bg-[#F7F8FC] rounded-2xl px-4 py-2.5 flex items-end gap-2 min-h-[44px]">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Message UNILAG CS 300L..."
              rows={1}
              className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none resize-none leading-snug"
            />
          </div>
          <button
            onClick={send}
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-fast active:scale-95 ${input.trim() ? 'bg-[#6C5CE7] shadow-[0_4px_12px_rgba(108,92,231,0.35)]' : 'bg-[#E5E7EB]'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke={input.trim() ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={input.trim() ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function GroupInfoPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      <div className="bg-[#6C5CE7] px-5 pt-12 pb-8 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-3">
          <span className="text-white font-bold text-2xl">CS</span>
        </div>
        <h2 className="text-white font-bold text-xl">UNILAG CS 300L</h2>
        <p className="text-white/70 text-sm mt-1">47 members · Created Jan 2024</p>
        <div className="flex gap-2 mt-4">
          <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">Academic</span>
          <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">Campus</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <p className="text-[13px] text-[#6B7280] leading-relaxed">
            Official group for UNILAG Computer Science Level 300 students. Share notes, assignments, announcements and connect with your classmates! 📚🎓
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Members (47)</h3>
          <div className="space-y-2">
            {members.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: m.color }}>
                  {m.initials}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-[#1A1A2E]">{m.name}</p>
                </div>
                {m.role === 'admin' && (
                  <span className="text-[11px] font-semibold text-[#6C5CE7] bg-[#EEF0FF] px-2.5 py-1 rounded-full">Admin</span>
                )}
              </div>
            ))}
            <p className="text-[13px] text-[#9CA3AF] text-center py-2">+42 more members</p>
          </div>
        </div>

        <button className="w-full py-4 rounded-2xl text-[#EF4444] font-semibold text-[15px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          Leave Group
        </button>
      </div>
    </div>
  )
}
