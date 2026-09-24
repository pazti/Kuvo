import { useState } from 'react'

const stats = [
  { label: 'Chats', value: '24' },
  { label: 'Groups', value: '8' },
  { label: 'Contacts', value: '147' },
]

const mediaItems = [
  { type: 'color', bg: '#E8FFF2', emoji: '📸' },
  { type: 'color', bg: '#EEF0FF', emoji: '🎥' },
  { type: 'color', bg: '#FFF0EB', emoji: '📸' },
  { type: 'color', bg: '#FFF8E8', emoji: '🎵' },
  { type: 'color', bg: '#E8FFF2', emoji: '📸' },
  { type: 'color', bg: '#EEF0FF', emoji: '📸' },
]

export default function ProfileScreen({ onSettings }: { onSettings: () => void }) {
  const [tab, setTab] = useState<'media' | 'links' | 'docs'>('media')
  const [statusVisible, setStatusVisible] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#00C853] to-[#6C5CE7] px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

        <div className="flex items-start justify-between mb-6 relative">
          <button onClick={onSettings} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.18M12.22 2C12.7504 2 13.2591 2.21071 13.6342 2.58579C14.0093 2.96086 14.22 3.46957 14.22 4V4.18C14.2204 4.53073 14.3129 4.87519 14.4885 5.18M9.51 5.18L9.35 5.27C9.05 5.43 8.74 5.57 8.42 5.69L8.26 5.74C7.93507 5.84786 7.58658 5.87579 7.2489 5.82117C6.91122 5.76656 6.59393 5.63097 6.32 5.427L6.22 5.36C5.85593 5.09671 5.40937 4.97779 4.9627 5.02518C4.51603 5.07258 4.10506 5.28268 3.81 5.61L3.57 5.89C3.27478 6.21762 3.11078 6.64706 3.11078 7.09C3.11078 7.53294 3.27478 7.96238 3.57 8.29L3.69 8.42C3.93 8.68 4.11 8.99 4.22 9.34L4.26 9.5C4.34 9.82 4.36 10.16 4.32 10.48L4.3 10.64C4.25 10.98 4.12 11.3 3.91 11.57L3.81 11.7C3.53 12.04 3.4 12.47 3.43 12.9L3.47 13.2C3.5 13.43 3.58 13.65 3.7 13.85L3.81 14.04C4.03 14.43 4.39 14.72 4.82 14.86L5.0 14.93C5.32 15.04 5.62 15.2 5.9 15.4L6.08 15.54C6.32 15.72 6.53 15.94 6.7 16.18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button onClick={onSettings} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center relative">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-white/30 border-4 border-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <span className="text-white font-bold text-3xl">YO</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#00C853] border-3 border-white flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <h2 className="text-white font-bold text-xl">Your Name</h2>
          <p className="text-white/80 text-sm mt-0.5">+234 802 345 6789</p>
          <div className="flex items-center gap-1.5 mt-2 bg-white/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <p className="text-white text-xs font-medium">Blessed and focused 🎓</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex mt-6 bg-white/20 rounded-2xl overflow-hidden relative">
          {stats.map((s, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center py-3 ${i < stats.length - 1 ? 'border-r border-white/20' : ''}`}>
              <span className="text-white font-bold text-xl">{s.value}</span>
              <span className="text-white/70 text-xs mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick toggles */}
      <div className="px-5 py-4 space-y-3">
        <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide">Privacy & Notifications</h3>
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
          {[
            { label: 'Status Visible', sub: 'Friends can see your status', value: statusVisible, set: setStatusVisible },
            { label: 'Notifications', sub: 'Receive message notifications', value: notifications, set: setNotifications },
          ].map((item, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-4 ${i > 0 ? 'border-t border-[#F7F8FC]' : ''}`}>
              <div>
                <p className="text-[15px] font-medium text-[#1A1A2E]">{item.label}</p>
                <p className="text-[12px] text-[#9CA3AF]">{item.sub}</p>
              </div>
              <button
                onClick={() => item.set(v => !v)}
                className={`w-12 h-6 rounded-full transition-all duration-200 relative ${item.value ? 'bg-[#00C853]' : 'bg-[#E5E7EB]'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${item.value ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Media */}
      <div className="px-5 pb-8">
        <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">Shared Media</h3>
        <div className="flex gap-2 mb-3">
          {(['media', 'links', 'docs'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-fast capitalize ${
                tab === t ? 'bg-[#00C853] text-white' : 'bg-white text-[#6B7280]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'media' ? (
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.map((item, i) => (
              <div key={i} className="aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]" style={{ backgroundColor: item.bg }}>
                {item.emoji}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="text-[#9CA3AF] text-sm">No {tab} shared yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
