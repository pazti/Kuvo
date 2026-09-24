import { useState } from 'react'

const slides = [
  {
    bg: 'from-[#00C853] to-[#00A843]',
    illustrationBg: '#E8FFF2',
    title: 'Welcome to Kuvo',
    subtitle: 'The messaging app made for your vibe. Connect with friends, campus mates, and your whole squad — all in one place.',
    cta: 'Get Started',
  },
  {
    bg: 'from-[#6C5CE7] to-[#5849D4]',
    illustrationBg: '#EEF0FF',
    title: 'Chat. Group. Thrive.',
    subtitle: 'From quick DMs to buzzing group chats — Kuvo keeps you close to everyone that matters on campus and beyond.',
    cta: 'Next',
  },
  {
    bg: 'from-[#FF6B35] to-[#E85A25]',
    illustrationBg: '#FFF0EB',
    title: 'Your Story, Live.',
    subtitle: 'Share moments with your Status — photos, videos, and updates that disappear after 24 hours. Your life, your highlights.',
    cta: 'Create Account',
  },
]

export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const slide = slides[step]
  const isLast = step === slides.length - 1

  const handleNext = () => {
    if (isLast) onDone()
    else setStep(s => s + 1)
  }

  return (
    <div className="h-screen flex flex-col bg-[#F7F8FC] max-w-[430px] mx-auto overflow-hidden">
      {/* Top colored section */}
      <div className={`bg-gradient-to-br ${slide.bg} flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8 relative overflow-hidden`}>
        {/* Skip */}
        <button
          onClick={onDone}
          className="absolute top-14 right-6 text-white/70 text-sm font-medium"
        >
          Skip
        </button>

        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />

        {/* Illustration */}
        <div className="relative mb-8">
          <OnboardingIllustration step={step} bg={slide.illustrationBg} />
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${i === step ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-white px-8 pt-8 pb-10 rounded-t-[32px] -mt-8 relative z-10 shadow-[0_-8px_32px_rgba(0,0,0,0.06)]">
        <h1 className="text-[26px] font-bold text-[#1A1A2E] mb-3 leading-tight">{slide.title}</h1>
        <p className="text-[15px] text-[#6B7280] leading-relaxed mb-8">{slide.subtitle}</p>

        <button
          onClick={handleNext}
          className={`w-full py-[17px] rounded-2xl text-white font-semibold text-[16px] transition-fast active:scale-[0.98] bg-gradient-to-r ${slide.bg} shadow-[0_6px_20px_rgba(0,0,0,0.15)]`}
        >
          {slide.cta}
        </button>

        {step === 0 && (
          <p className="text-center text-[13px] text-[#9CA3AF] mt-4">
            Already have an account?{' '}
            <button onClick={onDone} className="text-[#00C853] font-semibold">Sign in</button>
          </p>
        )}
      </div>
    </div>
  )
}

function OnboardingIllustration({ step, bg }: { step: number; bg: string }) {
  if (step === 0) return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Central phone mockup */}
      <div className="w-36 h-56 rounded-[24px] bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden">
        <div className="h-6 bg-[#00C853] flex items-center justify-center">
          <div className="w-12 h-1.5 rounded-full bg-white/50" />
        </div>
        <div className="flex-1 p-3 space-y-2">
          {[
            { name: 'Tunde', msg: 'Guy where you dey? 😂', time: '2m', color: '#00C853' },
            { name: 'Ada', msg: 'Send me the notes abeg', time: '5m', color: '#6C5CE7' },
            { name: 'Emeka', msg: 'Party tonight! 🎉', time: '1h', color: '#FF6B35' },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: c.color }}>
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-[#1A1A2E]">{c.name}</div>
                <div className="text-[8px] text-[#9CA3AF] truncate">{c.msg}</div>
              </div>
              <div className="text-[7px] text-[#9CA3AF]">{c.time}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating bubbles */}
      <div className="absolute -right-4 top-8 bg-white rounded-2xl rounded-tr-sm px-3 py-2 shadow-lg text-[10px] font-medium text-[#1A1A2E]">
        Hey! 👋
      </div>
      <div className="absolute -left-6 bottom-12 bg-[#00C853] rounded-2xl rounded-tl-sm px-3 py-2 shadow-lg text-[10px] font-medium text-white">
        Sup! 🔥
      </div>
    </div>
  )

  if (step === 1) return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-white/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#6C5CE7"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Orbiting avatars */}
      {[
        { top: '10%', left: '5%', color: '#00C853', label: 'T' },
        { top: '5%', right: '10%', color: '#FF6B35', label: 'A' },
        { bottom: '10%', left: '8%', color: '#6C5CE7', label: 'E' },
        { bottom: '8%', right: '5%', color: '#F59E0B', label: 'K' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg" style={{ backgroundColor: pos.color, ...pos }}>
          {pos.label}
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <div className="relative">
        <div className="w-44 h-44 rounded-[24px] bg-white/20 border-2 border-white/30 flex items-center justify-center overflow-hidden">
          <div className="text-6xl">📸</div>
        </div>
        {/* Timer arc */}
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-[#FF6B35] text-xs font-bold">24h</span>
        </div>
        {/* Reaction */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-white rounded-full px-3 py-1.5 shadow-lg">
          {['🔥', '❤️', '😂'].map(e => <span key={e} className="text-base">{e}</span>)}
        </div>
      </div>
    </div>
  )
}
