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
  { icon: '📍', titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { icon: '🎯', titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { icon: '🏨', titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
]

export default function HowItWorks({ dict }: HowItWorksProps) {
  const { howItWorks } = dict
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          {howItWorks.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl mb-4 shadow-sm">
                {step.icon}
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {howItWorks[step.titleKey]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {howItWorks[step.descKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
