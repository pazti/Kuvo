import { useState } from 'react'

const myStatus = {
  views: 47,
  time: '2h ago',
  bg: 'from-[#00C853] to-[#6C5CE7]',
}

const friendStatuses = [
  {
    id: 1, name: 'Tunde Kelani', initials: 'TK', color: '#00C853',
    segments: 3, seen: [true, false, false], time: '30m ago',
    preview: '🔥 Campus energy today!',
  },
  {
    id: 2, name: 'Adaeze Nwosu', initials: 'AN', color: '#6C5CE7',
    segments: 1, seen: [false], time: '1h ago',
    preview: '📚 Library mode activated',
  },
  {
    id: 3, name: 'Emeka Okonkwo', initials: 'EO', color: '#FF6B35',
    segments: 2, seen: [true, true], time: '2h ago',
    preview: '🎉 Squad goals last night',
  },
  {
    id: 4, name: 'Chisom Aneke', initials: 'CA', color: '#F59E0B',
    segments: 4, seen: [true, false, false, false], time: '3h ago',
    preview: '🏃 Morning run done!',
  },
  {
    id: 5, name: 'Fatima Bello', initials: 'FB', color: '#00C853',
    segments: 1, seen: [true], time: '5h ago',
    preview: '❤️ TGIF vibes',
  },
]

export default function StatusScreen({ onBack }: { onBack: () => void }) {
  const [viewing, setViewing] = useState<typeof friendStatuses[0] | null>(null)

  if (viewing) return <StatusViewer status={viewing} onClose={() => setViewing(null)} />

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC]">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <h1 className="text-[24px] font-bold text-[#1A1A2E]">Status</h1>
        <p className="text-[13px] text-[#9CA3AF]">Updates from your contacts</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">
        {/* My Status */}
        <div className="mb-5">
          <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">My Status</h3>
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="relative">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${myStatus.bg} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                YO
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00C853] border-2 border-white flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-[#1A1A2E]">My Status</p>
              <p className="text-[13px] text-[#9CA3AF]">{myStatus.views} views · {myStatus.time}</p>
            </div>
            <button className="w-9 h-9 rounded-full bg-[#E8FFF2] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="#00C853" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Recent updates */}
        <div>
          <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Recent Updates</h3>
          <div className="space-y-2">
            {friendStatuses.map(s => {
              const allSeen = s.seen.every(Boolean)
              return (
                <button
                  key={s.id}
                  onClick={() => setViewing(s)}
                  className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast text-left"
                >
                  {/* Segmented ring avatar */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0">
                      {s.segments === 1 ? (
                        <circle
                          cx="28" cy="28" r="24"
                          fill="none"
                          stroke={allSeen ? '#E5E7EB' : s.color}
                          strokeWidth="2.5"
                        />
                      ) : (
                        s.seen.map((seen, idx) => {
                          const gap = 4
                          const total = 360
                          const segAngle = (total / s.segments) - gap
                          const startAngle = -90 + idx * (360 / s.segments) + gap / 2
                          const endAngle = startAngle + segAngle
                          const r = 24
                          const cx = 28, cy = 28
                          const start = polarToCartesian(cx, cy, r, startAngle)
                          const end = polarToCartesian(cx, cy, r, endAngle)
                          const largeArc = segAngle > 180 ? 1 : 0
                          return (
                            <path
                              key={idx}
                              d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
                              fill="none"
                              stroke={seen ? '#E5E7EB' : s.color}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          )
                        })
                      )}
                    </svg>
                    <div className="absolute inset-2 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: s.color }}>
                      {s.initials}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#1A1A2E]">{s.name}</p>
                    <p className="text-[13px] text-[#9CA3AF]">{s.time}</p>
                    <p className="text-[13px] text-[#6B7280] mt-0.5 truncate">{s.preview}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Muted */}
        <div className="mt-5">
          <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Muted Updates</h3>
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <span className="text-[#9CA3AF] text-lg">🔇</span>
            </div>
            <p className="text-[14px] text-[#9CA3AF]">3 muted contacts</p>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="absolute bottom-24 right-6 w-14 h-14 rounded-full bg-[#FF6B35] shadow-[0_6px_20px_rgba(255,107,53,0.4)] flex items-center justify-center active:scale-95 transition-fast z-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function StatusViewer({ status, onClose }: { status: typeof friendStatuses[0]; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const advance = () => {
    if (currentIdx < status.segments - 1) setCurrentIdx(i => i + 1)
    else onClose()
  }

  return (
    <div className="h-full flex flex-col bg-[#1A1A2E] relative" onClick={advance}>
      {/* Progress bars */}
      <div className="absolute top-12 left-4 right-4 flex gap-1 z-10">
        {Array.from({ length: status.segments }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-[4000ms]"
              style={{ width: i < currentIdx ? '100%' : i === currentIdx ? '60%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-16 left-0 right-0 flex items-center gap-3 px-4 z-10">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: status.color }}>
          {status.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-[15px]">{status.name}</p>
          <p className="text-white/60 text-xs">{status.time}</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onClose() }}
          className="ml-auto w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Status content */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${status.color}33, #1A1A2E)` }}
        >
          <div className="text-center px-8">
            <div className="text-6xl mb-4">{status.preview.split(' ')[0]}</div>
            <p className="text-white text-xl font-semibold">{status.preview.slice(2)}</p>
          </div>
        </div>
      </div>

      {/* Reply bar */}
      <div className="absolute bottom-8 left-4 right-4 flex gap-3" onClick={e => e.stopPropagation()}>
        <div className="flex-1 bg-white/20 rounded-full px-4 py-3 flex items-center">
          <span className="text-white/50 text-sm">Reply to {status.name.split(' ')[0]}...</span>
        </div>
        <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-xl">😊</span>
        </button>
      </div>
    </div>
  )
}
