import { useState, useRef, useEffect } from 'react'

type Msg = {
  id: number
  text: string
  time: string
  mine: boolean
  status?: 'sent' | 'delivered' | 'read'
  reactions?: string[]
}

const initialMessages: Msg[] = [
  { id: 1, text: 'Guy where you dey? We dey wait you o 😂', time: '2:15 PM', mine: false },
  { id: 2, text: 'Abeg I dey come, lecture just finished now now', time: '2:17 PM', mine: true, status: 'read' },
  { id: 3, text: 'Oya hustle come, the pepper soup don dey cold 🍲', time: '2:17 PM', mine: false, reactions: ['😂', '🔥'] },
  { id: 4, text: 'Lol 😭 give me 10 mins, I go enter Uber', time: '2:18 PM', mine: true, status: 'read' },
  { id: 5, text: 'Which Uber? Walk fast 😹', time: '2:19 PM', mine: false },
  { id: 6, text: "Haha relax bro, I'm almost there 🏃", time: '2:22 PM', mine: true, status: 'delivered' },
]

export default function ChatScreen({ onBack, onProfile }: { onBack: () => void; onProfile: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const newMsg: Msg = {
      id: Date.now(),
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
      mine: true,
      status: 'sent',
    }
    setMessages(m => [...m, newMsg])
    setInput('')
    // Simulate reply
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(m => [...m, {
        id: Date.now() + 1,
        text: "Lol okay okay, I dey wait 😂",
        time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
        mine: false,
      }])
    }, 1800)
  }

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center flex-shrink-0">
            <BackIcon />
          </button>
          <button onClick={onProfile} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#00C853] flex items-center justify-center text-white font-bold">TK</div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#00C853] border-2 border-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[16px] font-semibold text-[#1A1A2E]">Tunde Kelani</h2>
              <p className="text-[12px] text-[#00C853] font-medium">Online</p>
            </div>
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
              <PhoneIcon />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
              <VideoIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Date separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <span className="text-[11px] text-[#9CA3AF] font-medium bg-[#F7F8FC] px-2">Today</span>
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        {messages.map((msg, idx) => {
          const showAvatar = !msg.mine && (idx === 0 || messages[idx - 1].mine)
          return (
            <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!msg.mine && (
                <div className={`w-7 h-7 rounded-full bg-[#00C853] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                  TK
                </div>
              )}
              <div className={`max-w-[72%] ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                    msg.mine
                      ? 'bg-[#00C853] text-white rounded-br-md'
                      : 'bg-white text-[#1A1A2E] rounded-bl-md shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className={`flex gap-1 ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                    <div className="bg-white rounded-full px-2 py-0.5 shadow-sm flex items-center gap-1 border border-[#E5E7EB]">
                      {msg.reactions.map((r, i) => <span key={i} className="text-sm">{r}</span>)}
                    </div>
                  </div>
                )}
                <div className={`flex items-center gap-1.5 ${msg.mine ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="text-[11px] text-[#9CA3AF]">{msg.time}</span>
                  {msg.mine && <MsgStatus status={msg.status} />}
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#00C853] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">TK</div>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-[#E5E7EB] px-4 py-3">
        <div className="flex items-end gap-3">
          <button className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center flex-shrink-0">
            <AttachIcon />
          </button>
          <div className="flex-1 bg-[#F7F8FC] rounded-2xl px-4 py-2.5 flex items-end gap-2 min-h-[44px]">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-transparent text-[15px] text-[#1A1A2E] placeholder-[#9CA3AF] outline-none resize-none leading-snug"
              style={{ maxHeight: '100px' }}
            />
            <button className="flex-shrink-0">
              <EmojiIcon />
            </button>
          </div>
          <button
            onClick={send}
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-fast active:scale-95 ${input.trim() ? 'bg-[#00C853] shadow-[0_4px_12px_rgba(0,200,83,0.35)]' : 'bg-[#E5E7EB]'}`}
          >
            <SendIcon active={!!input.trim()} />
          </button>
        </div>
      </div>
    </div>
  )
}

function MsgStatus({ status }: { status?: string }) {
  if (status === 'read') return <span className="text-[#00C853] text-[12px]">✓✓</span>
  if (status === 'delivered') return <span className="text-[#9CA3AF] text-[12px]">✓✓</span>
  return <span className="text-[#9CA3AF] text-[12px]">✓</span>
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C16.4 21.73 13 20.48 10.12 18.29C7.42 16.28 5.12 14 3.12 11.3C0.92 8.41 -0.33 5 0.04 1.44C0.0399995 0.890118 0.250606 0.360777 0.625643 -0.0142599C1.00068 -0.389298 1.52982 -0.600001 2.08 -0.600001H5.08C6.08 -0.600001 6.93 0.0899994 7.08 1.08C7.35 2.74 7.85 4.36 8.56 5.89C8.84 6.5 8.68 7.22 8.17 7.72L6.92 8.97C8.84 11.8 11.2 14.16 14.03 16.08L15.28 14.83C15.78 14.32 16.5 14.16 17.11 14.44C18.64 15.15 20.26 15.65 21.92 15.92C22.93 16.07 23.63 16.93 22 16.92Z" fill="#6B7280"/>
    </svg>
  )
}
function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M23 7L16 12L23 17V7Z" fill="#6B7280"/>
      <rect x="1" y="5" width="15" height="14" rx="2" fill="#6B7280"/>
    </svg>
  )
}
function AttachIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21.44 11.05L12.25 20.24C11.1228 21.3672 9.59336 22.0008 8 22.0008C6.40664 22.0008 4.87721 21.3672 3.75 20.24C2.62279 19.1128 1.98919 17.5834 1.98919 15.99C1.98919 14.3966 2.62279 12.8672 3.75 11.74L12.94 2.55C13.7006 1.78917 14.7269 1.3617 15.795 1.3617C16.8631 1.3617 17.8894 1.78917 18.65 2.55C19.4108 3.31063 19.8383 4.33686 19.8383 5.405C19.8383 6.47314 19.4108 7.49937 18.65 8.26L9.45 17.45C9.06956 17.8304 8.55584 18.044 8.02 18.044C7.48416 18.044 6.97044 17.8304 6.59 17.45C6.20956 17.0696 5.99596 16.5558 5.99596 16.02C5.99596 15.4842 6.20956 14.9704 6.59 14.59L15.07 6.12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function EmojiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2"/>
      <path d="M8 14S9.5 16 12 16 16 14 16 14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="10" r="1" fill="#9CA3AF"/>
      <circle cx="15" cy="10" r="1" fill="#9CA3AF"/>
    </svg>
  )
}
function SendIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13" stroke={active ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={active ? 'white' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
