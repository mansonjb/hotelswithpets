import type { Locale } from '@/app/[locale]/dictionaries'

interface PetTravelTipsProps {
  locale: Locale
}

type Tip = { icon: string; title: string; text: string }

const tips: Record<string, Tip[]> = {
  en: [
    {
      icon: '📋',
      title: 'Verify before you book',
      text: 'Always confirm the pet policy directly with the hotel. Fees and restrictions can change. Our data is updated regularly but a quick call avoids surprises.',
    },
    {
      icon: '🛂',
      title: 'EU pet passport',
      text: 'Travelling between EU countries? Your pet needs a valid EU pet passport with up-to-date rabies vaccination. Apply through your vet at least 21 days before travel.',
    },
    {
      icon: '🐕',
      title: 'Book the right room',
      text: 'Not all rooms in a pet-friendly hotel accept pets. Request a pet-designated room at booking and confirm you\'re on a suitable floor. Ideally with easy outdoor access.',
    },
    {
      icon: '⭐',
      title: 'All hotels rated 8.0+',
      text: 'Every hotel on HotelsWithPets.com has a minimum Booking.com guest rating of 8.0. Pet-friendly shouldn\'t mean compromising on quality.',
    },
  ],
  fr: [
    {
      icon: '📋',
      title: 'Vérifiez avant de réserver',
      text: 'Confirmez toujours la politique animaux directement avec l\'hôtel. Les frais et restrictions peuvent changer. Nos données sont mises à jour régulièrement mais un appel rapide évite les mauvaises surprises.',
    },
    {
      icon: '🛂',
      title: 'Passeport européen pour animaux',
      text: 'Vous voyagez entre pays de l\'UE ? Votre animal a besoin d\'un passeport européen valide avec vaccination antirabique à jour. Demandez-le chez votre vétérinaire au moins 21 jours avant le départ.',
    },
    {
      icon: '🐕',
      title: 'Réservez la bonne chambre',
      text: 'Toutes les chambres d\'un hôtel pet-friendly n\'acceptent pas les animaux. Demandez une chambre adaptée à la réservation et confirmez votre étage. Idéalement avec un accès facile à l\'extérieur.',
    },
    {
      icon: '⭐',
      title: 'Tous les hôtels notés 8,0+',
      text: 'Chaque hôtel de HotelsWithPets.com a une note minimale de 8,0 sur Booking.com. Accepter les animaux ne devrait pas signifier compromettre la qualité.',
    },
  ],
  es: [
    {
      icon: '📋',
      title: 'Verifica antes de reservar',
      text: 'Confirma siempre la política de mascotas directamente con el hotel. Las tarifas y restricciones pueden cambiar. Actualizamos nuestros datos regularmente, pero una llamada rápida evita sorpresas.',
    },
    {
      icon: '🛂',
      title: 'Pasaporte europeo para mascotas',
      text: '¿Viajando entre países de la UE? Tu mascota necesita un pasaporte europeo válido con vacunación antirrábica al día. Solicítalo a tu veterinario con al menos 21 días de antelación.',
    },
    {
      icon: '🐕',
      title: 'Reserva la habitación adecuada',
      text: 'No todas las habitaciones de un hotel pet-friendly aceptan mascotas. Solicita una habitación designada para mascotas y confirma tu planta. Idealmente con fácil acceso al exterior.',
    },
    {
      icon: '⭐',
      title: 'Todos los hoteles con 8,0+',
      text: 'Cada hotel de HotelsWithPets.com tiene una puntuación mínima de 8,0 en Booking.com. Admitir mascotas no debería implicar comprometer la calidad.',
    },
  ],
  pt: [
    {
      icon: '📋',
      title: 'Verifique antes de reservar',
      text: `Confirme sempre a política de animais diretamente com o hotel. As tarifas e restrições podem mudar. Atualizamos os nossos dados regularmente, mas uma chamada rápida evita surpresas.`,
    },
    {
      icon: '🛂',
      title: 'Passaporte europeu para animais',
      text: `A viajar entre países da UE? O seu animal precisa de um passaporte europeu válido com vacinação antirrábica em dia. Trate-o com o seu veterinário pelo menos 21 dias antes da viagem.`,
    },
    {
      icon: '🐕',
      title: 'Reserve o quarto certo',
      text: `Nem todos os quartos de um hotel pet-friendly aceitam animais. Peça um quarto designado para animais ao reservar e confirme o piso. Idealmente com acesso fácil ao exterior.`,
    },
    {
      icon: '⭐',
      title: 'Todos os hotéis com 8,0+',
      text: `Cada hotel da HotelsWithPets.com tem uma nota mínima de 8,0 no Booking.com. Aceitar animais não deve significar abrir mão da qualidade.`,
    },
  ],
  de: [
    {
      icon: '📋',
      title: 'Vor der Buchung prüfen',
      text: 'Bestätigen Sie die Haustierrichtlinie stets direkt beim Hotel. Gebühren und Einschränkungen können sich ändern. Unsere Daten werden regelmäßig aktualisiert, aber ein kurzer Anruf erspart Ihnen unangenehme Überraschungen.',
    },
    {
      icon: '🛂',
      title: 'EU-Heimtierausweis',
      text: 'Reisen Sie zwischen EU-Ländern? Ihr Haustier benötigt einen gültigen EU-Heimtierausweis mit aktueller Tollwutimpfung. Beantragen Sie ihn bei Ihrem Tierarzt mindestens 21 Tage vor der Reise.',
    },
    {
      icon: '🐕',
      title: 'Das richtige Zimmer buchen',
      text: 'Nicht alle Zimmer eines haustierfreundlichen Hotels erlauben Haustiere. Fordern Sie bei der Buchung ein für Haustiere vorgesehenes Zimmer an und bestätigen Sie eine passende Etage. Idealerweise mit einfachem Zugang nach draußen.',
    },
    {
      icon: '⭐',
      title: 'Alle Hotels mit 8,0+ bewertet',
      text: 'Jedes Hotel auf HotelsWithPets.com hat eine Booking.com-Gästebewertung von mindestens 8,0. Haustierfreundlich soll keinen Kompromiss bei der Qualität bedeuten.',
    },
  ],
}

const headings: Record<string, string> = {
  en: 'Tips for travelling with pets',
  fr: 'Conseils pour voyager avec votre animal',
  es: 'Consejos para viajar con mascotas',
  pt: 'Dicas para viajar com animais',
  de: 'Tipps für das Reisen mit Haustieren',
}

export default function PetTravelTips({ locale }: PetTravelTipsProps) {
  const localeTips = tips[locale] ?? tips.en
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-10">{headings[locale]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localeTips.map((tip) => (
            <div key={tip.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <span className="text-3xl block mb-3">{tip.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{tip.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
