interface HowItWorksProps {
  dict: {
    howItWorks: {
      title: string
      step1Title: string
      step1Desc: string
      step2Title: string
      step2Desc: string
      step3Title: string
      step3Desc: string
    }
  }
}

const steps = [
  { icon: '📍', titleKey: 'step1Title' as const, descKey: 'step1Desc' as const, gradient: 'from-blue-500 to-cyan-500' },
  { icon: '🎯', titleKey: 'step2Title' as const, descKey: 'step2Desc' as const, gradient: 'from-indigo-500 to-purple-500' },
  { icon: '🏨', titleKey: 'step3Title' as const, descKey: 'step3Desc' as const, gradient: 'from-purple-500 to-pink-500' },
]

export default function HowItWorks({ dict }: HowItWorksProps) {
  const { howItWorks } = dict
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">
          {howItWorks.title}
        </h2>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col items-center text-center lg:items-start lg:text-left ${
                  i === 1 ? 'lg:mt-12' : ''
                }`}
              >
                {/* Icon + number bubble */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl shadow-lg shadow-blue-900/50 rotate-3 group-hover:rotate-0 transition-transform`}>
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-slate-900 text-xs font-black flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {howItWorks[step.titleKey]}
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {howItWorks[step.descKey]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
