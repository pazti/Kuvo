import { useState } from 'react'

const sections = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Account Info', sub: 'Phone, username, email', color: '#00C853' },
      { icon: '🔒', label: 'Privacy', sub: 'Last seen, read receipts', color: '#6C5CE7' },
      { icon: '🔐', label: 'Security', sub: 'Two-step verification', color: '#FF6B35' },
    ],
  },
  {
    title: 'Chats',
    items: [
      { icon: '💬', label: 'Chat Backup', sub: 'Back up to Google Drive', color: '#00C853' },
      { icon: '🎨', label: 'Chat Wallpaper', sub: 'Customize your chat background', color: '#6C5CE7' },
      { icon: '🌙', label: 'Dark Mode', sub: 'Switch to dark theme', color: '#1A1A2E', toggle: true },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: '🔔', label: 'Message Notifications', sub: 'Sounds, vibration, popup', color: '#FF6B35' },
      { icon: '👥', label: 'Group Notifications', sub: 'Separate settings for groups', color: '#6C5CE7' },
    ],
  },
  {
    title: 'Storage & Data',
    items: [
      { icon: '💾', label: 'Storage Usage', sub: '2.4 GB used', color: '#00C853' },
      { icon: '📶', label: 'Network Usage', sub: 'Data saving mode', color: '#6C5CE7' },
    ],
  },
  {
    title: 'Help',
    items: [
      { icon: '❓', label: 'Help Center', sub: 'FAQ and support', color: '#9CA3AF' },
      { icon: '📱', label: 'App Version', sub: 'Kuvo v1.0.0 (Beta)', color: '#9CA3AF' },
    ],
  },
]

export default function SettingsScreen({ onBack }: { onBack?: () => void }) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex flex-col h-full bg-[#F7F8FC] overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button onClick={onBack} className="w-9 h-9 rounded-full bg-[#F7F8FC] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <h1 className="text-[24px] font-bold text-[#1A1A2E]">Settings</h1>
        </div>

        {/* Profile quick-view */}
        <div className="flex items-center gap-4 bg-[#F7F8FC] rounded-2xl p-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C853] to-[#6C5CE7] flex items-center justify-center text-white font-bold text-lg">
            YO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-semibold text-[#1A1A2E]">Your Name</p>
            <p className="text-[13px] text-[#9CA3AF]">Blessed and focused 🎓</p>
          </div>
          <button>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-5 pt-5 pb-8 space-y-6">
        {sections.map((section, si) => (
          <div key={si}>
            <h3 className="text-[13px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
              {section.items.map((item, ii) => (
                <button
                  key={ii}
                  className={`w-full flex items-center gap-4 px-4 py-4 active:bg-[#F7F8FC] transition-fast text-left ${ii > 0 ? 'border-t border-[#F7F8FC]' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: item.color + '18' }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-[#1A1A2E]">{item.label}</p>
                    <p className="text-[12px] text-[#9CA3AF]">{item.sub}</p>
                  </div>
                  {item.toggle ? (
                    <button
                      onClick={e => { e.stopPropagation(); setDarkMode(v => !v) }}
                      className={`w-12 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${darkMode ? 'bg-[#00C853]' : 'bg-[#E5E7EB]'}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${darkMode ? 'left-6' : 'left-0.5'}`} />
                    </button>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                      <path d="M9 18L15 12L9 6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full py-4 rounded-2xl text-[#EF4444] font-semibold text-[15px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-fast">
          Log Out
        </button>

        <p className="text-center text-[12px] text-[#9CA3AF]">Kuvo v1.0.0 Beta · Made in Nigeria 🇳🇬</p>
      </div>
    </div>
  )
}
