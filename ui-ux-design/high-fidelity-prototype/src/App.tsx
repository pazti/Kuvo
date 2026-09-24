import { useState } from 'react'
import OnboardingScreen from './screens/OnboardingScreen'
import ChatListScreen from './screens/ChatListScreen'
import ChatScreen from './screens/ChatScreen'
import GroupChatScreen from './screens/GroupChatScreen'
import ContactsScreen from './screens/ContactsScreen'
import ProfileScreen from './screens/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
// Settings accessible from profile
import NewChatScreen from './screens/NewChatScreen'
import StatusScreen from './screens/StatusScreen'

export type Screen =
  | 'onboarding'
  | 'chatList'
  | 'chat'
  | 'groupChat'
  | 'contacts'
  | 'profile'
  | 'settings'
  | 'newChat'
  | 'status'

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'status' | 'profile'>('chats')

  const navigate = (s: Screen) => setScreen(s)

  // Onboarding
  if (screen === 'onboarding') {
    return <OnboardingScreen onDone={() => { navigate('chatList'); setActiveTab('chats') }} />
  }

  // New Chat overlay
  if (screen === 'newChat') {
    return <NewChatScreen onBack={() => navigate('chatList')} onOpenChat={() => navigate('chat')} onOpenGroup={() => navigate('groupChat')} />
  }

  // Chat screens
  if (screen === 'chat') {
    return <ChatScreen onBack={() => navigate('chatList')} onProfile={() => navigate('profile')} />
  }

  if (screen === 'groupChat') {
    return <GroupChatScreen onBack={() => navigate('chatList')} />
  }

  if (screen === 'settings') {
    return (
      <div className="h-screen max-w-[430px] mx-auto overflow-hidden">
        <SettingsScreen onBack={() => navigate('chatList')} />
      </div>
    )
  }

  if (screen === 'status') {
    return <StatusScreen onBack={() => { navigate('chatList'); setActiveTab('status') }} />
  }

  // Main tabbed shell
  const renderMain = () => {
    if (activeTab === 'chats') return <ChatListScreen onChat={() => navigate('chat')} onGroup={() => navigate('groupChat')} onNewChat={() => navigate('newChat')} />
    if (activeTab === 'contacts') return <ContactsScreen onChat={() => navigate('chat')} />
    if (activeTab === 'status') return <StatusScreen onBack={() => {}} />
    if (activeTab === 'profile') return <ProfileScreen onSettings={() => navigate('settings')} />
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-[#F7F8FC] max-w-[430px] mx-auto relative overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {renderMain()}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}

function BottomNav({ active, onChange }: { active: string; onChange: (t: any) => void }) {
  const tabs = [
    { id: 'chats', label: 'Chats', icon: ChatIcon },
    { id: 'contacts', label: 'Contacts', icon: PeopleIcon },
    { id: 'status', label: 'Status', icon: CircleIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ]
  return (
    <div className="bg-white border-t border-[#E5E7EB] safe-bottom">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id as any)}
              className="flex flex-col items-center gap-0.5 min-w-[60px] py-1 rounded-xl transition-fast"
            >
              <div className={`w-10 h-8 flex items-center justify-center rounded-xl transition-fast ${isActive ? 'bg-[#E8FFF2]' : ''}`}>
                <Icon active={isActive} />
              </div>
              <span className={`text-[11px] font-medium transition-fast ${isActive ? 'text-[#00C853]' : 'text-[#9CA3AF]'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill={active ? '#00C853' : '#9CA3AF'} />
    </svg>
  )
}

function PeopleIcon({ active }: { active: boolean }) {
  const c = active ? '#00C853' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill={c} />
    </svg>
  )
}

function CircleIcon({ active }: { active: boolean }) {
  const c = active ? '#00C853' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2.2" fill="none"/>
      <circle cx="12" cy="12" r="3.5" fill={c}/>
    </svg>
  )
}

function UserIcon({ active }: { active: boolean }) {
  const c = active ? '#00C853' : '#9CA3AF'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={c} />
    </svg>
  )
}
