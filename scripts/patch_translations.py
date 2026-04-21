#!/usr/bin/env python3
"""Patch faqsFr and faqsEs translations into the 4 city guide JSON files."""

import json

# ============================================================
# BUDAPEST
# ============================================================

budapest_translations = {
    "restaurants": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils admis dans les restaurants de Budapest ?",
                "a": "Oui, surtout en terrasse et dans les bars-jardins. Les ruin bars du VIIe arrondissement sont particulièrement accueillants. La plupart des restaurants décontractés acceptent les chiens bien tenus sans problème. Certains établissements haut de gamme peuvent vous demander de garder votre chien sous la table."
            },
            {
                "q": "Dois-je payer pour mon chien dans les transports en commun pour aller au restaurant ?",
                "a": "Les chiens transportés dans un sac voyage gratuitement. Les chiens en laisse (avec muselière) nécessitent un demi-tarif enfant. Cela s'applique au métro BKK, aux tramways et aux bus."
            },
            {
                "q": "Quel est le meilleur quartier pour dîner avec son chien à Budapest ?",
                "a": "Le VIIe arrondissement (le quartier juif / la zone des ruin bars) et le VIe arrondissement (autour de Nagymező utca et Andrássy út) sont les plus accueillants pour les chiens. Le IXe arrondissement (Ferencváros) est une option émergente avec des établissements plus récents."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se admiten perros en los restaurantes de Budapest?",
                "a": "Sí, especialmente en terrazas y bares con jardín. Los ruin bars del distrito VII son especialmente acogedores. La mayoría de los restaurantes informales aceptan perros bien portados en sus terrazas sin problema. Algunos establecimientos de categoría pueden pedirte que mantengas a tu perro bajo la mesa."
            },
            {
                "q": "¿Tengo que pagar por mi perro en el transporte público para ir a los restaurantes?",
                "a": "Los perros en transportín viajan gratis. Los perros con correa (y bozal) necesitan medio billete infantil. Esto se aplica en el metro BKK, tranvías y autobuses."
            },
            {
                "q": "¿Cuál es el mejor barrio para comer con perro en Budapest?",
                "a": "El distrito VII (el barrio judío / zona de ruin bars) y el distrito VI (alrededor de Nagymező utca y Andrássy út) son los más amigables con perros de forma consistente. El distrito IX (Ferencváros) es una opción emergente con locales más nuevos."
            }
        ]
    },
    "parks": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils autorisés dans les parcs publics de Budapest ?",
                "a": "Oui. Les chiens sont les bienvenus dans tous les parcs publics de Budapest tenus en laisse. Des espaces sans laisse (kutyafuttató) sont disponibles dans la plupart des grands parcs, notamment l'île Marguerite, Városliget et Feneketlen-tó."
            },
            {
                "q": "Puis-je emmener mon chien dans les collines de Buda pour randonner ?",
                "a": "Absolument. Les collines de Buda disposent de nombreux sentiers forestiers balisés et les chiens y sont admis sur tous. Le train à crémaillère (Fogaskerekű) vers Normafa accepte les chiens. Notez que le télésiège libegő n'accepte pas les chiens."
            },
            {
                "q": "L'île Marguerite est-elle le meilleur parc pour les chiens à Budapest ?",
                "a": "C'est l'un des meilleurs. L'île sans voitures avec 5,4 km de chemins, un espace sans laisse dédié et de magnifiques paysages en fait un endroit idéal. Városliget est également excellent et mieux desservi par le métro."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se permiten perros en los parques públicos de Budapest?",
                "a": "Sí. Los perros son bienvenidos en todos los parques públicos de Budapest con correa. Hay zonas especiales sin correa (kutyafuttató) en la mayoría de los grandes parques, incluyendo la Isla Margarita, Városliget y Feneketlen-tó."
            },
            {
                "q": "¿Puedo llevar a mi perro a las colinas de Buda para hacer senderismo?",
                "a": "Por supuesto. Las colinas de Buda tienen numerosos senderos forestales señalizados y los perros están permitidos en todos ellos. El tren de cremallera (Fogaskerekű) a Normafa admite perros. Ten en cuenta que el teleférico libegő no acepta perros."
            },
            {
                "q": "¿Es la Isla Margarita el mejor parque para perros en Budapest?",
                "a": "Es uno de los mejores. La isla sin coches con 5,4 km de caminos, una zona sin correa dedicada y un paisaje precioso la hace ideal. Városliget también es excelente y está mejor conectado por metro."
            }
        ]
    },
    "transport": {
        "faqsFr": [
            {
                "q": "Puis-je prendre mon chien dans le métro de Budapest ?",
                "a": "Oui. Les petits chiens dans un sac fermé voyagent gratuitement. Les chiens plus grands voyagent avec une laisse et une muselière et nécessitent un demi-tarif enfant. Cela s'applique aux quatre lignes de métro."
            },
            {
                "q": "Existe-t-il un trajet touristique en transports en commun à faire avec un chien à Budapest ?",
                "a": "Oui — le tramway 2 longeant les rives du Danube côté Pest est l'un des plus beaux parcours de tram d'Europe. Les chiens sont admis selon les règles BKK habituelles. Pensez aussi au train à crémaillère Fogaskerekű vers les collines de Buda."
            },
            {
                "q": "Puis-je prendre un taxi ou un VTC avec un chien à Budapest ?",
                "a": "Oui, mais les politiques varient selon les chauffeurs. Bolt et Uber sont présents à Budapest. Mentionnez votre chien lors de la réservation. Certains chauffeurs peuvent refuser les grands chiens — avoir un sac de transport facilite les choses."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro en el metro de Budapest?",
                "a": "Sí. Los perros pequeños en transportín cerrado viajan gratis. Los perros más grandes viajan con correa y bozal y necesitan medio billete infantil. Esto se aplica a las cuatro líneas de metro."
            },
            {
                "q": "¿Hay alguna ruta turística en transporte público recomendable con perro en Budapest?",
                "a": "Sí — el tranvía 2 a lo largo de la orilla del Danubio en Pest es una de las rutas de tranvía más bonitas de Europa. Los perros están permitidos con las normas habituales de BKK. También puedes considerar el tren de cremallera Fogaskerekű a las colinas de Buda."
            },
            {
                "q": "¿Puedo coger un taxi o VTC con perro en Budapest?",
                "a": "Sí, aunque las políticas varían según el conductor. Bolt y Uber operan en Budapest. Menciona tu perro al reservar. Algunos conductores pueden rechazar perros grandes — llevar un transportín ayuda."
            }
        ]
    },
    "beaches": {
        "faqsFr": [
            {
                "q": "Y a-t-il des plages où les chiens sont admis à Budapest ?",
                "a": "Budapest est une ville intérieure mais dispose de plusieurs plages fluviales (strand) et zones au bord du Danube. Les chiens sont bienvenus à Római-part et à Kopaszi-gát. La promenade du Danube côté Pest est excellente pour les balades toute l'année."
            },
            {
                "q": "Mon chien peut-il nager dans le Danube à Budapest ?",
                "a": "C'est techniquement possible à certains endroits, mais déconseillé — le Danube a de forts courants et peut être froid. Limitez-vous aux rives peu profondes de Római-part si votre chien veut se baigner."
            },
            {
                "q": "Quelle est la meilleure zone au bord de l'eau pour une longue balade avec un chien à Budapest ?",
                "a": "Római-part à Óbuda (4 km de parcours) est idéal pour une longue promenade détendue dans une atmosphère locale. La promenade du Danube côté Pest est meilleure pour le tourisme. Kopaszi-gát est parfait pour les sorties au coucher du soleil."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Hay playas aptas para perros en Budapest?",
                "a": "Budapest es una ciudad de interior, pero cuenta con varias playas fluviales (strand) y zonas junto al Danubio. Los perros son bienvenidos en Római-part y Kopaszi-gát. El paseo del Danubio en la orilla de Pest es excelente para pasear todo el año."
            },
            {
                "q": "¿Puede bañarse mi perro en el Danubio en Budapest?",
                "a": "Técnicamente es posible en algunos puntos, pero no es recomendable — el Danubio tiene corrientes fuertes y puede estar frío. Quédate en las orillas poco profundas de Római-part si tu perro quiere mojarse."
            },
            {
                "q": "¿Cuál es la mejor zona ribereña para un largo paseo con perro en Budapest?",
                "a": "Római-part en Óbuda (4 km de recorrido) es la mejor opción para un paseo largo y tranquilo con ambiente local. El paseo del Danubio en el lado de Pest es mejor para el turismo. Kopaszi-gát es ideal para las visitas al atardecer."
            }
        ]
    },
    "vets": {
        "faqsFr": [
            {
                "q": "Ai-je besoin d'un passeport pour animaux pour amener mon chien à Budapest ?",
                "a": "Oui. La Hongrie est un pays de l'UE. Vous avez besoin d'un passeport européen pour animaux avec une puce d'identification valide et un vaccin antirabique à jour. Pour les voyageurs hors UE, des documents équivalents sont exigés."
            },
            {
                "q": "Y a-t-il des vétérinaires ouverts 24h/24 à Budapest ?",
                "a": "Oui. Lósy-Reimann Állatkorház dans le XIVe arrondissement est ouvert 24h/24, 7j/7 et gère les urgences."
            },
            {
                "q": "Combien coûte une visite vétérinaire à Budapest ?",
                "a": "Une consultation standard coûte généralement entre 8 000 et 15 000 HUF (environ 20 à 40 €). Les frais d'urgence et de spécialiste sont plus élevés. Les prix sont nettement inférieurs à ceux de l'Europe occidentale."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Necesito un pasaporte para mascotas para llevar a mi perro a Budapest?",
                "a": "Sí. Hungría es un país de la UE. Necesitas un pasaporte europeo para animales con microchip válido y vacunación antirrábica vigente. Para viajeros de fuera de la UE, se requiere documentación equivalente."
            },
            {
                "q": "¿Hay veterinarios de guardia 24 horas en Budapest?",
                "a": "Sí. Lósy-Reimann Állatkorház en el distrito XIV atiende las 24 horas del día, 7 días a la semana, y gestiona urgencias."
            },
            {
                "q": "¿Cuánto cuesta una visita al veterinario en Budapest?",
                "a": "Una consulta estándar suele costar entre 8.000 y 15.000 HUF (aproximadamente 20-40 €). Las urgencias y especialistas tienen tarifas más altas. Los precios son notablemente más bajos que en Europa occidental."
            }
        ]
    },
    "tips": {
        "faqsFr": [
            {
                "q": "Budapest est-elle globalement accueillante pour les chiens ?",
                "a": "Oui. Budapest est l'une des capitales d'Europe centrale les plus accueillantes pour les chiens. Les chiens sont courants dans les cafés, les parcs et les transports en commun. Les règles sont claires et la culture locale accepte généralement les chiens bien tenus."
            },
            {
                "q": "Quelle est la réglementation sur les laisses à Budapest ?",
                "a": "Les chiens doivent être tenus en laisse dans tous les espaces publics. Dans les espaces sans laisse désignés (kutyafuttató), ils peuvent courir librement. Des amendes s'appliquent en cas d'infraction. Les muselières sont obligatoires dans les transports en commun pour les grands chiens."
            },
            {
                "q": "Quelle est la meilleure période pour visiter Budapest avec un chien ?",
                "a": "Le printemps (avril–mai) et l'automne (septembre–octobre) sont idéaux : temps doux, moins de monde et parcs magnifiques. L'été est chaud, mais les plages fluviales et les bars-jardins sont excellents. L'hiver offre moins d'options extérieures mais les balades hivernales dans les collines de Buda près des bains thermaux restent agréables."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Es Budapest una ciudad acogedora para los perros en general?",
                "a": "Sí. Budapest es una de las capitales de Europa Central más amigables con los perros. Los perros son habituales en cafés, parques y transporte público. Las normas son claras y la cultura local acepta en general a los perros bien portados."
            },
            {
                "q": "¿Cuáles son las normas sobre correa en Budapest?",
                "a": "Los perros deben ir con correa en todos los espacios públicos. En las zonas sin correa designadas (kutyafuttató), pueden correr libremente. Las infracciones están sujetas a multa. El bozal es obligatorio en el transporte público para los perros grandes."
            },
            {
                "q": "¿Cuál es la mejor época del año para visitar Budapest con un perro?",
                "a": "La primavera (abril–mayo) y el otoño (septiembre–octubre) son ideales: clima suave, menos turistas y parques preciosos. El verano es caluroso, pero las playas fluviales y los bares con jardín son estupendos. En invierno hay menos opciones al aire libre, aunque los paseos por las colinas de Buda cerca de los baños termales siguen siendo agradables."
            }
        ]
    },
    "attractions": {
        "faqsFr": [
            {
                "q": "Puis-je emmener mon chien au château de Buda ?",
                "a": "Oui, les chiens tenus en laisse sont admis dans toutes les zones extérieures du quartier de la colline du Château, y compris les cours et les terrasses du Bastion des Pêcheurs. Les chiens ne sont pas admis à l'intérieur des musées du palais ni dans les édifices religieux."
            },
            {
                "q": "Puis-je traverser le Pont des Chaînes avec mon chien ?",
                "a": "Oui. Le Pont des Chaînes est accessible aux piétons et les chiens en laisse y sont les bienvenus. C'est l'une des meilleures traversées du Danube à effectuer à pied avec un chien."
            },
            {
                "q": "Les chiens sont-ils admis dans les bains thermaux de Budapest ?",
                "a": "Non. Les chiens ne sont admis dans aucun des complexes de bains thermaux de Budapest, y compris Széchenyi, Gellért et Rudas. Cette règle s'applique de manière stricte dans tous les établissements."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro al Castillo de Buda?",
                "a": "Sí, los perros con correa están permitidos en todas las zonas exteriores del distrito del Castillo de Buda, incluidos los patios y las terrazas del Bastión de los Pescadores. Los perros no están permitidos dentro de los museos del palacio ni en los interiores de las iglesias."
            },
            {
                "q": "¿Puedo cruzar el Puente de las Cadenas con mi perro?",
                "a": "Sí. El Puente de las Cadenas está abierto a peatones y los perros con correa son bienvenidos. Es uno de los mejores cruces del Danubio para hacer a pie con un perro."
            },
            {
                "q": "¿Se permiten perros en los baños termales de Budapest?",
                "a": "No. Los perros no están permitidos en ninguno de los complejos de baños termales de Budapest, incluidos Széchenyi, Gellért y Rudas. Es una norma estricta en todos los establecimientos."
            }
        ]
    },
    "petsitting": {
        "faqsFr": [
            {
                "q": "Où trouver un gardien de chien à Budapest ?",
                "a": "Pawshake et Rover opèrent tous deux à Budapest avec des profils de gardiens vérifiés. Réservez au moins 48 heures à l'avance. Le concierge de votre hôtel peut également avoir des recommandations."
            },
            {
                "q": "Puis-je laisser mon chien à l'hôtel pendant que je visite les bains thermaux ?",
                "a": "Cela dépend de l'hôtel. Certains hôtels acceptant les animaux proposent une mise en cage ou une garde surveillée. Sinon, réservez un gardien à domicile Rover pour qu'il passe dans votre chambre. Ne laissez jamais un chien sans surveillance dans une chambre d'hôtel en cas de fortes chaleurs estivales."
            },
            {
                "q": "Y a-t-il des structures de garde de chiens de jour à Budapest ?",
                "a": "Oui, il existe des garderies de jour pour chiens (kutyapanzió) à Budapest. Recherchez 'kutyapanzió Budapest' pour trouver des options locales. Les hôtes Pawshake proposent également une garde à la journée."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Dónde puedo encontrar un cuidador de perros en Budapest?",
                "a": "Pawshake y Rover operan en Budapest con perfiles de cuidadores verificados. Reserva con al menos 48 horas de antelación. El conserje de tu hotel también puede tener recomendaciones."
            },
            {
                "q": "¿Puedo dejar a mi perro en el hotel mientras visito los baños termales?",
                "a": "Depende del hotel. Algunos hoteles que admiten mascotas ofrecen jaula o cuidado supervisado. De lo contrario, reserva un cuidador a domicilio de Rover para que pase por tu habitación. Nunca dejes a un perro solo en una habitación de hotel en el calor del verano."
            },
            {
                "q": "¿Hay guarderías caninas de día en Budapest?",
                "a": "Sí, existen instalaciones de guardería diurna para perros (kutyapanzió) en Budapest. Busca 'kutyapanzió Budapest' para encontrar opciones locales. Los anfitriones de Pawshake también ofrecen cuidado durante el día completo."
            }
        ]
    }
}

# ============================================================
# KRAKOW
# ============================================================

krakow_translations = {
    "restaurants": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils admis dans les restaurants de Cracovie ?",
                "a": "De plus en plus, surtout dans les cours de Kazimierz et en terrasse des cafés. Les restaurants de la place du Marché de la vieille ville varient — les terrasses sont généralement plus accueillantes. Demandez toujours avant de vous installer."
            },
            {
                "q": "Quel est le quartier le plus accueillant pour les chiens à Cracovie en matière de restauration ?",
                "a": "Kazimierz est de loin le quartier le plus accueillant pour les chiens. La culture décontractée des cafés en cour intérieure du quartier est naturellement ouverte aux chiens. Podgórze et Zabłocie sont également des options de plus en plus intéressantes."
            },
            {
                "q": "Y a-t-il des brasseries avec jardin où les chiens sont admis à Cracovie ?",
                "a": "Oui. Les ogródki (bars-jardins) saisonniers ouvrent à partir de mai et sont presque universellement accueillants pour les chiens dans leurs espaces extérieurs. Alchemia et Singer à Kazimierz sont les options les plus connues ouvertes toute l'année."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se admiten perros en los restaurantes de Cracovia?",
                "a": "Cada vez más, especialmente en los locales con patio de Kazimierz y en las terrazas de los cafés. Los restaurantes de la Plaza del Mercado del casco antiguo varían — las terrazas suelen ser más permisivas. Pregunta siempre antes de sentarte."
            },
            {
                "q": "¿Cuál es el barrio más amigable con perros de Cracovia para comer?",
                "a": "Kazimierz es con diferencia el barrio más amigable con perros. La cultura relajada de los cafés en patios interiores del barrio es inherentemente acogedora con los perros. Podgórze y Zabłocie son también opciones cada vez mejores."
            },
            {
                "q": "¿Hay jardines de cerveza donde se admitan perros en Cracovia?",
                "a": "Sí. Los ogródki (bares con jardín) de temporada abren desde mayo y son casi universalmente amigables con perros en sus zonas exteriores. Alchemia y Singer en Kazimierz son las opciones más conocidas abiertas todo el año."
            }
        ]
    },
    "parks": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils autorisés dans les parcs de Cracovie ?",
                "a": "Oui. Les chiens en laisse sont bienvenus dans tous les parcs publics de Cracovie, y compris les jardins de Planty, la forêt de Las Wolski et les rives de la Vistule. La prairie de Błonia permet aux chiens de courir sans laisse sur les pelouses ouvertes."
            },
            {
                "q": "Où mon chien peut-il courir sans laisse à Cracovie ?",
                "a": "La prairie de Błonia est le meilleur espace sans laisse — 48 hectares de prairie ouverte. Des espaces sans laisse désignés (wybiegi dla psów) existent dans de nombreux parcs de quartier. Les sentiers de la forêt de Las Wolski sont assez souples sur les règles de laisse."
            },
            {
                "q": "Puis-je emmener mon chien voir le château du Wawel ?",
                "a": "Les chiens en laisse sont admis dans les cours extérieures et les abords de la colline du Wawel. Les intérieurs du château, la cathédrale et les musées n'autorisent pas les chiens."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se permiten perros en los parques de Cracovia?",
                "a": "Sí. Los perros con correa son bienvenidos en todos los parques públicos de Cracovia, incluidos los jardines de Planty, el bosque de Las Wolski y las orillas del Vístula. La pradera de Błonia permite a los perros correr sin correa en la zona abierta de césped."
            },
            {
                "q": "¿Dónde puede correr mi perro sin correa en Cracovia?",
                "a": "La pradera de Błonia es el mejor espacio sin correa — 48 hectáreas de pradera abierta. En muchos parques de barrio existen zonas sin correa designadas (wybiegi dla psów). Los senderos del bosque de Las Wolski son bastante relajados con las normas de correa."
            },
            {
                "q": "¿Puedo llevar a mi perro a ver el Castillo de Wawel?",
                "a": "Los perros con correa son bienvenidos en los patios exteriores y los terrenos de la Colina de Wawel. Los interiores del castillo, la catedral y los museos no admiten perros."
            }
        ]
    },
    "transport": {
        "faqsFr": [
            {
                "q": "Puis-je prendre mon chien dans les transports en commun de Cracovie ?",
                "a": "Oui. Les chiens en laisse voyagent gratuitement sur tous les tramways et bus MPK de Cracovie. Les petits chiens dans un sac fermé voyagent également gratuitement. Il n'y a pas de métro à Cracovie."
            },
            {
                "q": "Mon chien doit-il porter une muselière dans les tramways de Cracovie ?",
                "a": "La muselière n'est pas légalement obligatoire, mais est fortement recommandée sur les lignes fréquentées et aux heures de pointe. C'est la pratique courante parmi les propriétaires de chiens locaux et réduit les frictions avec les autres passagers."
            },
            {
                "q": "Comment se rendre à la prairie de Błonia sans marcher ?",
                "a": "Prenez le tramway 15 ou 18 depuis le centre-ville jusqu'à l'arrêt Al. 3 Maja. Les chiens voyagent gratuitement. Le trajet dure environ 10 minutes depuis la vieille ville."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro en el transporte público de Cracovia?",
                "a": "Sí. Los perros con correa viajan gratis en todos los tranvías y autobuses MPK de Cracovia. Los perros pequeños en transportín cerrado también viajan gratis. Cracovia no tiene metro."
            },
            {
                "q": "¿Necesita bozal mi perro en los tranvías de Cracovia?",
                "a": "El bozal no es obligatorio legalmente, pero se recomienda encarecidamente en las líneas concurridas y en horas punta. Es la práctica habitual entre los dueños de perros locales y reduce los roces con otros pasajeros."
            },
            {
                "q": "¿Cómo llegar a la pradera de Błonia sin caminar?",
                "a": "Toma el tranvía 15 o 18 desde el centro de la ciudad hasta la parada Al. 3 Maja. Los perros viajan gratis. El trayecto dura unos 10 minutos desde el casco antiguo."
            }
        ]
    },
    "beaches": {
        "faqsFr": [
            {
                "q": "Y a-t-il des plages où les chiens sont admis à Cracovie ?",
                "a": "Cracovie est une ville intérieure mais dispose d'excellentes zones au bord de la Vistule. Les Boulevards de la Vistule sous le Wawel, la rive sud plus calme de Dębniki et le lac de Zakrzówek sont les meilleures zones aquatiques accessibles aux chiens."
            },
            {
                "q": "Mon chien peut-il nager dans la Vistule à Cracovie ?",
                "a": "Oui, dans des zones informelles sur la rive sud (Dębniki) et au lac de Zakrzówek. Le chenal principal de la Vistule peut avoir de forts courants — restez près des berges plus calmes."
            },
            {
                "q": "Quelle est la meilleure promenade au bord de la rivière à Cracovie avec un chien ?",
                "a": "Le boulevard de la rive nord sous le château du Wawel, puis en continuant vers l'est le long du fleuve jusqu'à Kazimierz (environ 2 km) est le meilleur. Traversez la passerelle de Bernatka vers la rive sud pour le retour et complétez ainsi une boucle."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Hay playas aptas para perros en Cracovia?",
                "a": "Cracovia es una ciudad de interior, pero cuenta con excelentes zonas a orillas del Vístula. Los Bulevares del Vístula bajo el Wawel, la orilla sur más tranquila de Dębniki y el embalse de Zakrzówek son las mejores zonas de agua para perros."
            },
            {
                "q": "¿Puede bañarse mi perro en el Vístula en Cracovia?",
                "a": "Sí, en zonas informales en la orilla sur (Dębniki) y en el embalse de Zakrzówek. El canal principal del Vístula puede tener corrientes fuertes — quédate cerca de las orillas más tranquilas."
            },
            {
                "q": "¿Cuál es el mejor paseo fluvial en Cracovia con perro?",
                "a": "El bulevar de la orilla norte bajo el Castillo de Wawel, continuando hacia el este a lo largo del río hasta Kazimierz (unos 2 km), es el mejor. Cruza la pasarela de Bernatka hacia la orilla sur para volver y completar el circuito."
            }
        ]
    },
    "vets": {
        "faqsFr": [
            {
                "q": "Ai-je besoin d'un passeport pour animaux pour amener mon chien à Cracovie ?",
                "a": "Oui. La Pologne est un État membre de l'UE. Un passeport européen pour animaux avec puce d'identification valide et vaccination antirabique à jour est requis."
            },
            {
                "q": "Y a-t-il des vétérinaires ouverts 24h/24 à Cracovie ?",
                "a": "Oui. Plusieurs cliniques vétérinaires d'urgence ouvertes 24h/24 opèrent à Cracovie. Notez une adresse avant votre voyage."
            },
            {
                "q": "Combien coûte une visite vétérinaire à Cracovie ?",
                "a": "Une consultation standard coûte environ 80 à 180 PLN (18 à 40 €). Les frais d'urgence et de spécialiste sont plus élevés. Les prix sont nettement inférieurs à ceux de l'Europe occidentale."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Necesito un pasaporte para mascotas para llevar a mi perro a Cracovia?",
                "a": "Sí. Polonia es un Estado miembro de la UE. Se requiere un pasaporte europeo para animales con microchip válido y vacunación antirrábica vigente."
            },
            {
                "q": "¿Hay veterinarios de guardia 24 horas en Cracovia?",
                "a": "Sí. Varias clínicas veterinarias de urgencias abiertas las 24 horas operan en Cracovia. Guarda una dirección antes de viajar."
            },
            {
                "q": "¿Cuánto cuesta una visita al veterinario en Cracovia?",
                "a": "Una consulta estándar cuesta aproximadamente entre 80 y 180 PLN (18-40 €). Las urgencias y especialistas tienen tarifas más altas. Los precios son notablemente más bajos que en Europa occidental."
            }
        ]
    },
    "tips": {
        "faqsFr": [
            {
                "q": "Cracovie est-elle globalement accueillante pour les chiens ?",
                "a": "Oui. Cracovie est l'une des villes polonaises les plus accueillantes pour les chiens. Les chiens voyagent gratuitement dans les transports, la prairie de Błonia offre un excellent espace sans laisse, et la culture des cafés de Kazimierz est décontractée et chaleureuse."
            },
            {
                "q": "Quelle est la réglementation sur les laisses à Cracovie ?",
                "a": "Les chiens doivent être tenus en laisse dans les espaces publics, sauf dans les zones sans laisse désignées (wybiegi dla psów) ou sur la prairie ouverte de Błonia. Des amendes s'appliquent en cas d'infraction dans la vieille ville et sur les grandes places."
            },
            {
                "q": "Quelle est la meilleure période pour visiter Cracovie avec un chien ?",
                "a": "Mai–juin et septembre–octobre sont idéaux : températures agréables, cafés en plein air ouverts, Błonia et les rives de la rivière à leur meilleur sans la chaleur et la foule de l'été."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Es Cracovia una ciudad acogedora para los perros en general?",
                "a": "Sí. Cracovia es una de las ciudades polacas más amigables con los perros. Los perros viajan gratis en el transporte, la pradera de Błonia ofrece un excelente espacio sin correa, y la cultura de los cafés de Kazimierz es relajada y acogedora."
            },
            {
                "q": "¿Cuáles son las normas sobre correa en Cracovia?",
                "a": "Los perros deben ir con correa en los espacios públicos, salvo en las zonas sin correa designadas (wybiegi dla psów) o en la pradera abierta de Błonia. Las infracciones en el casco antiguo y las plazas principales están sujetas a multa."
            },
            {
                "q": "¿Cuál es la mejor época para visitar Cracovia con un perro?",
                "a": "Mayo–junio y septiembre–octubre son ideales: temperaturas agradables, cafés al aire libre abiertos, Błonia y las orillas del río en su mejor momento sin el calor ni las aglomeraciones del verano."
            }
        ]
    },
    "attractions": {
        "faqsFr": [
            {
                "q": "Puis-je emmener mon chien au château du Wawel ?",
                "a": "Oui, dans les cours extérieures et les abords. Les chiens en laisse sont bienvenus sur la colline du Wawel et dans la cour. Les intérieurs du château, l'intérieur de la cathédrale et la grotte du Dragon nécessitent des billets et n'autorisent pas les chiens."
            },
            {
                "q": "Kazimierz est-il accueillant pour les chiens ?",
                "a": "Tout à fait. Kazimierz est le quartier le plus accueillant pour les chiens à Cracovie — bars en cour intérieure informels, terrasses de cafés en plein air et une culture locale détendue en font l'endroit idéal pour explorer avec un chien."
            },
            {
                "q": "Puis-je visiter le mémorial d'Auschwitz-Birkenau avec mon chien ?",
                "a": "Les chiens ne sont pas admis au Musée national d'Auschwitz-Birkenau. Si vous visitez depuis Cracovie (à environ 70 km), organisez une garde de chien pour cette excursion. Rover et Pawshake opèrent tous deux à Cracovie."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro al Castillo de Wawel?",
                "a": "Sí, en los patios exteriores y los terrenos. Los perros con correa son bienvenidos en la Colina de Wawel y en el patio. Los interiores del castillo, el interior de la catedral y la Cueva del Dragón requieren entradas y no admiten perros."
            },
            {
                "q": "¿Es Kazimierz un barrio amigable con perros?",
                "a": "Enormemente. Kazimierz es el barrio más amigable con perros de Cracovia — bares informales en patios interiores, terrazas de cafés al aire libre y una cultura local relajada lo hacen ideal para explorar con un perro."
            },
            {
                "q": "¿Puedo visitar el memorial de Auschwitz-Birkenau con mi perro?",
                "a": "Los perros no están permitidos en el Museo Estatal de Auschwitz-Birkenau. Si visitas desde Cracovia (a unos 70 km), organiza un cuidador para esta excursión. Rover y Pawshake operan en Cracovia."
            }
        ]
    },
    "petsitting": {
        "faqsFr": [
            {
                "q": "Où trouver un gardien de chien à Cracovie ?",
                "a": "Rover et Pawshake opèrent tous deux à Cracovie avec des réseaux de gardiens vérifiés. Réservez au moins 48 heures à l'avance. Le concierge de votre hôtel peut également avoir des recommandations locales."
            },
            {
                "q": "Puis-je emmener mon chien à Auschwitz-Birkenau ?",
                "a": "Non. Les chiens ne sont pas admis au Musée national d'Auschwitz-Birkenau. Organisez une garde de chien avant la sortie — c'est la raison de réservation de gardien la plus fréquente à Cracovie."
            },
            {
                "q": "Puis-je emmener mon chien à la mine de sel de Wieliczka ?",
                "a": "Non. Les chiens ne sont pas admis dans les galeries souterraines de la mine de sel de Wieliczka. Organisez une garde de chien si vous prévoyez de la visiter."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Dónde puedo encontrar un cuidador de perros en Cracovia?",
                "a": "Rover y Pawshake operan en Cracovia con redes de cuidadores verificados. Reserva con al menos 48 horas de antelación. El conserje de tu hotel también puede tener recomendaciones locales."
            },
            {
                "q": "¿Puedo llevar a mi perro a Auschwitz-Birkenau?",
                "a": "No. Los perros no están permitidos en el Museo Estatal de Auschwitz-Birkenau. Organiza un cuidador antes de la excursión — es la razón de reserva de cuidador más habitual en Cracovia."
            },
            {
                "q": "¿Puedo llevar a mi perro a la Mina de Sal de Wieliczka?",
                "a": "No. Los perros no están permitidos en las galerías subterráneas de la Mina de Sal de Wieliczka. Organiza un cuidador si tienes previsto visitarla."
            }
        ]
    }
}

# ============================================================
# PRAGUE
# ============================================================

prague_translations = {
    "restaurants": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils admis dans les restaurants de Prague ?",
                "a": "En général oui, surtout dans les brasseries avec jardin et en terrasse. La culture des pubs tchèques est décontractée avec les chiens. Les zones touristiques de la vieille ville sont plus strictes — préférez les quartiers locaux comme Vinohrady ou Žižkov pour une expérience plus chaleureuse."
            },
            {
                "q": "Quel est le meilleur quartier pour dîner avec son chien à Prague ?",
                "a": "Vinohrady est le quartier le plus régulièrement accueillant pour les chiens, avec de nombreuses terrasses de cafés et jardins de pubs. Letná et Holešovice sont également excellents, avec une clientèle plus jeune et plus décontractée."
            },
            {
                "q": "Y a-t-il des brasseries avec jardin où les chiens sont admis à Prague ?",
                "a": "Oui — les zahrádky (brasseries avec jardin) sont une institution estivale tchèque et presque toutes accueillent les chiens. Le Letná Beer Garden surplombant la Vltava est le plus connu et est entièrement accessible aux chiens."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se admiten perros en los restaurantes de Praga?",
                "a": "En general sí, especialmente en los jardines de cerveza y en las terrazas. La cultura de los pubs checos es relajada con los perros. Las zonas más turísticas del casco antiguo son más estrictas — los barrios locales como Vinohrady o Žižkov ofrecen una experiencia más acogedora."
            },
            {
                "q": "¿Cuál es el mejor barrio para comer con perro en Praga?",
                "a": "Vinohrady es el barrio más consistentemente amigable con perros, con muchas terrazas de cafés y jardines de pubs. Letná y Holešovice también son excelentes, con un ambiente más joven y relajado."
            },
            {
                "q": "¿Hay jardines de cerveza donde se admitan perros en Praga?",
                "a": "Sí — los zahrádky (jardines de cerveza) son una institución veraniega checa y casi todos admiten perros. El Letná Beer Garden con vistas al Vltava es el más famoso y es completamente apto para perros."
            }
        ]
    },
    "parks": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils autorisés dans les parcs de Prague ?",
                "a": "Oui. Les chiens en laisse sont bienvenus dans tous les parcs publics de Prague. Des espaces sans laisse (volný výběh) existent dans la plupart des grands parcs, notamment Stromovka, Letná et Riegrovy sady."
            },
            {
                "q": "Où mon chien peut-il nager près de Prague ?",
                "a": "La réserve naturelle de Divoká Šárka dispose d'un lac naturel (Šárecký rybník) avec une zone informelle de baignade pour chiens. C'est la meilleure option proche du centre-ville."
            },
            {
                "q": "Quel est le parc le plus accueillant pour les chiens à Prague ?",
                "a": "Stromovka est le plus grand et le plus populaire pour les promenades. Letná est mieux pour les vues et l'accès aux brasseries avec jardin. Divoká Šárka est idéal pour la nature et les randonnées sans laisse."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se permiten perros en los parques de Praga?",
                "a": "Sí. Los perros con correa son bienvenidos en todos los parques públicos de Praga. Existen zonas sin correa (volný výběh) en la mayoría de los grandes parques, incluyendo Stromovka, Letná y Riegrovy sady."
            },
            {
                "q": "¿Dónde puede bañarse mi perro cerca de Praga?",
                "a": "La reserva natural de Divoká Šárka tiene un lago natural (Šárecký rybník) con una zona informal de baño para perros. Es la mejor opción cerca del centro de la ciudad."
            },
            {
                "q": "¿Cuál es el parque más amigable con perros en Praga?",
                "a": "Stromovka es el más grande y popular para pasear. Letná es mejor para las vistas y el acceso a los jardines de cerveza. Divoká Šárka es ideal para la naturaleza y el senderismo sin correa."
            }
        ]
    },
    "transport": {
        "faqsFr": [
            {
                "q": "Puis-je prendre mon chien dans les transports en commun de Prague ?",
                "a": "Oui. Les chiens avec muselière et laisse voyagent dans le métro, les tramways et les bus avec un demi-tarif enfant. Les petits chiens dans un sac fermé voyagent gratuitement. Cela s'applique à tous les transports PID."
            },
            {
                "q": "Mon chien doit-il porter une muselière dans les tramways de Prague ?",
                "a": "Oui. La muselière est obligatoire pour tous les chiens (hors sac de transport) dans les transports en commun PID à Prague. C'est appliqué. Emportez une muselière de voyage même si votre chien est docile."
            },
            {
                "q": "Puis-je prendre mon chien sur le funiculaire de Petřín ?",
                "a": "Oui. La Petřínská lanová dráha (funiculaire de la colline Petřín) accepte les chiens en laisse. Les règles habituelles de tarification PID s'appliquent."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro en el transporte público de Praga?",
                "a": "Sí. Los perros con bozal y correa viajan en metro, tranvías y autobuses con medio billete infantil. Los perros pequeños en transportín cerrado viajan gratis. Esto se aplica a todo el transporte PID."
            },
            {
                "q": "¿Necesita bozal mi perro en los tranvías de Praga?",
                "a": "Sí. El bozal es obligatorio para todos los perros (no en transportín) en el transporte público PID de Praga. Se cumple estrictamente. Lleva un bozal de viaje aunque tu perro sea tranquilo."
            },
            {
                "q": "¿Puedo llevar a mi perro en el funicular de Petřín?",
                "a": "Sí. La Petřínská lanová dráha (funicular de la Colina Petřín) admite perros con correa. Se aplican las tarifas habituales de PID."
            }
        ]
    },
    "beaches": {
        "faqsFr": [
            {
                "q": "Y a-t-il des plages où les chiens sont admis à Prague ?",
                "a": "Prague est une ville intérieure mais dispose de plusieurs plages fluviales et quais le long de la Vltava. Les chiens sont bienvenus à l'île Císařský ostrov (baignade), au quai Náplavka et le long du sentier du ruisseau Botič."
            },
            {
                "q": "Mon chien peut-il nager dans la Vltava à Prague ?",
                "a": "Oui, dans des zones dédiées. L'île Císařský ostrov offre les spots de baignade pour chiens les plus sûrs près de la ville. Évitez le chenal principal qui a de forts courants."
            },
            {
                "q": "Le quai Náplavka est-il accueillant pour les chiens ?",
                "a": "Oui, totalement. Le Náplavka est l'un des espaces publics de Prague les plus accueillants pour les chiens. Le marché de producteurs du week-end y est particulièrement apprécié des propriétaires de chiens."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Hay playas aptas para perros en Praga?",
                "a": "Praga es una ciudad de interior, pero cuenta con varias playas fluviales y paseos a lo largo del Vltava. Los perros son bienvenidos en la isla Císařský ostrov (baño), el paseo Náplavka y el sendero del arroyo Botič."
            },
            {
                "q": "¿Puede bañarse mi perro en el Vltava en Praga?",
                "a": "Sí, en zonas designadas. La isla Císařský ostrov tiene los mejores puntos de baño para perros cerca de la ciudad. Evita el canal principal, que tiene corrientes fuertes."
            },
            {
                "q": "¿El paseo Náplavka es apto para perros?",
                "a": "Sí, completamente. El Náplavka es uno de los espacios públicos más amigables con perros de Praga. El mercado de agricultores del fin de semana es especialmente popular entre los dueños de perros."
            }
        ]
    },
    "vets": {
        "faqsFr": [
            {
                "q": "Ai-je besoin d'un passeport pour animaux pour amener mon chien à Prague ?",
                "a": "Oui. La République tchèque est un État membre de l'UE. Vous avez besoin d'un passeport européen pour animaux avec une puce d'identification valide et un vaccin antirabique à jour."
            },
            {
                "q": "Y a-t-il des vétérinaires anglophones à Prague ?",
                "a": "Oui. De nombreux vétérinaires de Prague, notamment dans les quartiers centraux, parlent anglais. Les cliniques de Vinohrady et Holešovice sont généralement bien équipées pour recevoir des visiteurs anglophones."
            },
            {
                "q": "Combien coûte une visite vétérinaire à Prague ?",
                "a": "Une consultation standard coûte environ 500 à 1 500 CZK (20 à 60 €). Les frais d'urgence et de spécialiste sont plus élevés. Les prix sont inférieurs à ceux de l'Europe occidentale."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Necesito un pasaporte para mascotas para llevar a mi perro a Praga?",
                "a": "Sí. La República Checa es un Estado miembro de la UE. Necesitas un pasaporte europeo para animales con microchip válido y vacunación antirrábica vigente."
            },
            {
                "q": "¿Hay veterinarios que hablen inglés en Praga?",
                "a": "Sí. Muchos veterinarios de Praga, especialmente en los distritos centrales, hablan inglés. Las clínicas de Vinohrady y Holešovice suelen estar bien equipadas para atender a visitantes anglófonos."
            },
            {
                "q": "¿Cuánto cuesta una visita al veterinario en Praga?",
                "a": "Una consulta estándar cuesta aproximadamente entre 500 y 1500 CZK (20-60 €). Las urgencias y especialistas tienen tarifas más altas. Los precios son más bajos que en Europa occidental."
            }
        ]
    },
    "tips": {
        "faqsFr": [
            {
                "q": "Prague est-elle globalement accueillante pour les chiens ?",
                "a": "Oui. Prague est généralement accueillante pour les chiens, surtout hors des quartiers touristiques. La culture des pubs et cafés tchèques accepte volontiers les chiens. Les transports en commun permettent les chiens avec muselière et laisse. Les parcs sont excellents."
            },
            {
                "q": "Le Pont Charles est-il accessible aux chiens ?",
                "a": "Les chiens en laisse sont techniquement autorisés sur le Pont Charles. Cependant, en haute saison touristique (juin–août), le pont est extrêmement bondé et inconfortable pour les chiens. Préférez le matin tôt ou la basse saison."
            },
            {
                "q": "Quelle est la meilleure période pour visiter Prague avec un chien ?",
                "a": "Le printemps (avril–mai) et le début de l'automne (septembre–octobre) sont idéaux : temps doux, parcs magnifiques, moins de touristes et brasseries avec jardin ouvertes. L'été est chaud mais les zones au bord de la rivière et les parcs sont excellents."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Es Praga una ciudad acogedora para los perros en general?",
                "a": "Sí. Praga es en general amigable con los perros, especialmente fuera de los barrios turísticos. La cultura de los pubs y cafés checos acepta a los perros con facilidad. El transporte público permite perros con bozal y correa. Los parques son excelentes."
            },
            {
                "q": "¿Es el Puente de Carlos apto para perros?",
                "a": "Los perros con correa están técnicamente permitidos en el Puente de Carlos. Sin embargo, en temporada alta turística (junio–agosto) el puente está extremadamente concurrido y es incómodo para los perros. Visítalo por la mañana temprano o en temporada baja."
            },
            {
                "q": "¿Cuál es la mejor época para visitar Praga con un perro?",
                "a": "La primavera (abril–mayo) y el inicio del otoño (septiembre–octubre) son ideales: clima suave, parques preciosos, menos turistas y jardines de cerveza abiertos. El verano es caluroso, pero las zonas ribereñas y los parques son excelentes."
            }
        ]
    },
    "attractions": {
        "faqsFr": [
            {
                "q": "Puis-je emmener mon chien au château de Prague ?",
                "a": "Oui, dans les cours et jardins extérieurs. Les chiens en laisse sont bienvenus dans le Jardin Royal, les Jardins du Sud et les cours du château. Les chiens ne sont pas admis dans la cathédrale Saint-Guy ni dans les bâtiments du palais."
            },
            {
                "q": "Puis-je traverser le Pont Charles avec mon chien ?",
                "a": "Oui. Le Pont Charles est ouvert aux piétons et les chiens en laisse y sont autorisés. Il est extrêmement bondé en été — visitez à l'aube pour la meilleure expérience."
            },
            {
                "q": "Vyšehrad est-il préférable au quartier du château pour une visite avec un chien ?",
                "a": "Pour une visite tranquille avec un chien, oui. Vyšehrad est bien moins fréquenté, le parc est magnifique et les vues sur la Vltava depuis les falaises sont spectaculaires. Le quartier du château offre plus de grandeur architecturale mais une pression touristique plus forte."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro al Castillo de Praga?",
                "a": "Sí, en los patios y jardines exteriores. Los perros con correa son bienvenidos en el Jardín Real, los Jardines del Sur y los patios del castillo. Los perros no están permitidos dentro de la Catedral de San Vito ni en los edificios del palacio."
            },
            {
                "q": "¿Puedo cruzar el Puente de Carlos con mi perro?",
                "a": "Sí. El Puente de Carlos está abierto a los peatones y los perros con correa están permitidos. Está extremadamente concurrido en verano — visítalo al amanecer para disfrutar mejor de la experiencia."
            },
            {
                "q": "¿Es Vyšehrad mejor que el barrio del castillo para visitar con un perro?",
                "a": "Para una visita tranquila con un perro, sí. Vyšehrad está mucho menos concurrido, el parque es precioso y las vistas al Vltava desde los acantilados son espectaculares. El barrio del castillo tiene más grandiosidad arquitectónica, pero mayor presión turística."
            }
        ]
    },
    "petsitting": {
        "faqsFr": [
            {
                "q": "Où trouver un gardien de chien à Prague ?",
                "a": "Rover et Pawshake opèrent tous deux à Prague avec des réseaux de gardiens vérifiés. Réservez au moins 48 heures à l'avance. Le concierge de votre hôtel peut également avoir des recommandations."
            },
            {
                "q": "Puis-je laisser mon chien à l'hôtel pendant que je visite le château de Prague ?",
                "a": "Les abords du château sont accessibles aux chiens, vous pouvez donc y explorer les espaces extérieurs avec votre animal. Si vous souhaitez entrer dans les bâtiments, organisez un gardien à domicile Rover ou demandez de l'aide à votre hôtel."
            },
            {
                "q": "Y a-t-il des structures de garde de chiens de jour à Prague ?",
                "a": "Oui. Recherchez 'psí hotel Praha' ou 'psí školka Praha' pour trouver des garderies de jour et des pensions pour chiens locales. Les hôtes Pawshake proposent également une garde à la journée."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Dónde puedo encontrar un cuidador de perros en Praga?",
                "a": "Rover y Pawshake operan en Praga con redes de cuidadores verificados. Reserva con al menos 48 horas de antelación. El conserje de tu hotel también puede tener recomendaciones."
            },
            {
                "q": "¿Puedo dejar a mi perro en el hotel mientras visito el Castillo de Praga?",
                "a": "Los terrenos del castillo son aptos para perros, por lo que puedes explorar las zonas exteriores con tu perro. Si quieres entrar en los edificios, organiza un cuidador a domicilio de Rover o pide ayuda a tu hotel."
            },
            {
                "q": "¿Hay guarderías caninas de día en Praga?",
                "a": "Sí. Busca 'psí hotel Praha' o 'psí školka Praha' para encontrar guarderías y residencias caninas locales. Los anfitriones de Pawshake también ofrecen cuidado durante el día completo."
            }
        ]
    }
}

# ============================================================
# WARSAW
# ============================================================

warsaw_translations = {
    "restaurants": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils admis dans les restaurants de Varsovie ?",
                "a": "De plus en plus oui, surtout en terrasse et dans les bars-jardins. Le quartier de Praga est le plus accueillant pour les chiens. Les cafés du centre de Varsovie varient — les terrasses sont généralement correctes, tandis que les dîners en intérieur dépendent de l'établissement."
            },
            {
                "q": "Quel est le quartier le plus accueillant pour les chiens à Varsovie en matière de restauration ?",
                "a": "Praga-Północ (rive est) est le plus régulièrement accueillant pour la restauration, avec des établissements informels en cour intérieure. Śródmieście dispose également de nombreux cafés en terrasse qui accueillent les chiens."
            },
            {
                "q": "Y a-t-il une culture de brasseries avec jardin où les chiens sont admis à Varsovie ?",
                "a": "Oui. Varsovie a une forte culture des bars-jardins (ogródek) de mai à septembre. Ces espaces extérieurs sont presque universellement accueillants pour les chiens."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se admiten perros en los restaurantes de Varsovia?",
                "a": "Cada vez más, especialmente en terrazas y bares con jardín. El barrio de Praga es el más amigable con los perros. Los cafés del centro de Varsovia varían — las terrazas suelen estar bien, mientras que la cena en interior depende del local."
            },
            {
                "q": "¿Cuál es el barrio más amigable con perros de Varsovia para comer?",
                "a": "Praga-Północ (orilla este) es el más consistentemente amigable para comer, con locales informales en patios interiores. Śródmieście también tiene muchos cafés con terraza que admiten perros."
            },
            {
                "q": "¿Hay cultura de jardines de cerveza donde se admitan perros en Varsovia?",
                "a": "Sí. Varsovia tiene una fuerte cultura de bares con jardín (ogródek) de mayo a septiembre. Estos espacios al aire libre son casi universalmente amigables con los perros."
            }
        ]
    },
    "parks": {
        "faqsFr": [
            {
                "q": "Les chiens sont-ils autorisés dans les parcs de Varsovie ?",
                "a": "Oui. Les chiens en laisse sont bienvenus dans tous les parcs publics de Varsovie. Des espaces sans laisse (wybieg dla psów) sont disponibles dans la plupart des grands parcs, notamment Łazienki, Park Praski et Pole Mokotowskie."
            },
            {
                "q": "Quel est le meilleur parc pour les balades sans laisse à Varsovie ?",
                "a": "Pole Mokotowskie est le plus populaire pour courir sans laisse. Las Kabacki est le mieux pour de longues promenades dans la nature. Park Praski dispose de bons espaces sans laisse et d'une atmosphère locale."
            },
            {
                "q": "Les chiens sont-ils admis dans le parc de Łazienki ?",
                "a": "Oui, les chiens en laisse sont bienvenus dans tout le parc de Łazienki. Le parc abrite des paons en liberté — gardez les chiens bien tenus à leur proximité. Il n'y a pas d'espace sans laisse désigné à l'intérieur de Łazienki."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Se permiten perros en los parques de Varsovia?",
                "a": "Sí. Los perros con correa son bienvenidos en todos los parques públicos de Varsovia. Hay zonas sin correa (wybieg dla psów) en la mayoría de los grandes parques, incluyendo Łazienki, Park Praski y Pole Mokotowskie."
            },
            {
                "q": "¿Cuál es el mejor parque para pasear sin correa en Varsovia?",
                "a": "Pole Mokotowskie es el más popular para correr sin correa. Las Kabacki es el mejor para paseos largos en la naturaleza. Park Praski tiene buenas zonas sin correa y un ambiente local auténtico."
            },
            {
                "q": "¿Se admiten perros en el parque de Łazienki?",
                "a": "Sí, los perros con correa son bienvenidos en todo el parque de Łazienki. El parque cuenta con pavos reales que deambulan libremente — mantén a tu perro bien controlado cerca de ellos. No hay zona sin correa designada dentro de Łazienki."
            }
        ]
    },
    "transport": {
        "faqsFr": [
            {
                "q": "Puis-je prendre mon chien dans les transports en commun de Varsovie ?",
                "a": "Oui. Les chiens en laisse voyagent gratuitement sur tous les transports ZTM (métro, tramways, bus). Les petits chiens dans un sac fermé voyagent également gratuitement. Aucun ticket n'est requis pour les chiens — c'est l'une des meilleures politiques de transport pour animaux en Europe."
            },
            {
                "q": "Mon chien doit-il porter une muselière dans les transports en commun de Varsovie ?",
                "a": "La muselière n'est pas légalement obligatoire, mais est fortement recommandée, notamment dans le métro et les tramways bondés. Elle réduit les frictions avec les autres passagers et est la pratique courante des propriétaires de chiens varsoviens."
            },
            {
                "q": "Comment se rendre au parc de Łazienki en transport en commun ?",
                "a": "Plusieurs lignes de tramway s'arrêtent à Łazienki (lignes 15, 17, 33 et d'autres le long des Aleje Ujazdowskie). Les chiens voyagent gratuitement sur tous les tramways de Varsovie."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro en el transporte público de Varsovia?",
                "a": "Sí. Los perros con correa viajan gratis en todo el transporte ZTM (metro, tranvías, autobuses). Los perros pequeños en transportín cerrado también viajan gratis. No se necesita billete para los perros — una de las mejores políticas de transporte para mascotas en Europa."
            },
            {
                "q": "¿Necesita bozal mi perro en el transporte público de Varsovia?",
                "a": "El bozal no es obligatorio legalmente, pero se recomienda encarecidamente, especialmente en el metro y los tranvías concurridos. Reduce los roces con otros pasajeros y es la práctica habitual entre los dueños de perros varsovianios."
            },
            {
                "q": "¿Cómo llegar al parque de Łazienki en transporte público?",
                "a": "Varias líneas de tranvía paran en Łazienki (líneas 15, 17, 33 y otras a lo largo de las Aleje Ujazdowskie). Los perros viajan gratis en todos los tranvías de Varsovia."
            }
        ]
    },
    "beaches": {
        "faqsFr": [
            {
                "q": "Y a-t-il des plages où les chiens sont admis à Varsovie ?",
                "a": "Oui. Les plages de la Vistule (plaże wiślane) sur les deux rives accueillent les chiens. La rive de Praga (est) a l'atmosphère la plus décontractée et la plus accueillante pour les chiens. Les Boulevards de la Vistule sur la rive gauche sont excellents toute l'année."
            },
            {
                "q": "Mon chien peut-il nager dans la Vistule à Varsovie ?",
                "a": "Oui, dans les zones de baignade désignées sur la rive est. La qualité de l'eau s'est considérablement améliorée ces dernières années. Évitez le fort courant du chenal principal."
            },
            {
                "q": "Quelle est la meilleure zone au bord de la Vistule pour une longue balade avec un chien à Varsovie ?",
                "a": "Les Boulevards de la Vistule (3,5 km, rive gauche) sont les meilleurs pour une promenade structurée. La rive est de Praga est plus décontractée et informelle. Les deux sont excellents et les chiens y sont les bienvenus."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Hay playas aptas para perros en Varsovia?",
                "a": "Sí. Las playas del Vístula (plaże wiślane) en ambas orillas son aptas para perros. La orilla de Praga (este) tiene el ambiente más relajado y acogedor para los perros. Los Bulevares del Vístula en la orilla izquierda son excelentes durante todo el año."
            },
            {
                "q": "¿Puede bañarse mi perro en el Vístula en Varsovia?",
                "a": "Sí, en las zonas de baño designadas en la orilla este. La calidad del agua ha mejorado significativamente en los últimos años. Evita la fuerte corriente del canal principal."
            },
            {
                "q": "¿Cuál es la mejor zona ribereña para un largo paseo con perro en Varsovia?",
                "a": "Los Bulevares del Vístula (3,5 km, orilla izquierda) son los mejores para un paseo estructurado. La orilla este de Praga es más relajada e informal. Ambas son excelentes y los perros son bienvenidos en todo el recorrido."
            }
        ]
    },
    "vets": {
        "faqsFr": [
            {
                "q": "Ai-je besoin d'un passeport pour animaux pour amener mon chien à Varsovie ?",
                "a": "Oui. La Pologne est un État membre de l'UE. Un passeport européen pour animaux avec puce d'identification valide et vaccination antirabique à jour est requis."
            },
            {
                "q": "Y a-t-il des vétérinaires ouverts 24h/24 à Varsovie ?",
                "a": "Oui. Plusieurs cliniques vétérinaires d'urgence ouvertes 24h/24 opèrent à Varsovie. Notez une adresse avant votre voyage."
            },
            {
                "q": "Combien coûte une visite vétérinaire à Varsovie ?",
                "a": "Une consultation standard coûte environ 80 à 200 PLN (18 à 45 €). Les frais d'urgence et de spécialiste sont plus élevés. Les prix sont nettement inférieurs à ceux de l'Europe occidentale."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Necesito un pasaporte para mascotas para llevar a mi perro a Varsovia?",
                "a": "Sí. Polonia es un Estado miembro de la UE. Se requiere un pasaporte europeo para animales con microchip válido y vacunación antirrábica vigente."
            },
            {
                "q": "¿Hay veterinarios de guardia 24 horas en Varsovia?",
                "a": "Sí. Varias clínicas veterinarias de urgencias abiertas las 24 horas operan en Varsovia. Guarda una dirección antes de viajar."
            },
            {
                "q": "¿Cuánto cuesta una visita al veterinario en Varsovia?",
                "a": "Una consulta estándar cuesta aproximadamente entre 80 y 200 PLN (18-45 €). Las urgencias y especialistas tienen tarifas más altas. Los precios son notablemente más bajos que en Europa occidental."
            }
        ]
    },
    "tips": {
        "faqsFr": [
            {
                "q": "Varsovie est-elle globalement accueillante pour les chiens ?",
                "a": "Oui. Varsovie est devenue nettement plus accueillante pour les chiens ces dernières années. Les chiens voyagent gratuitement dans les transports, les parcs sont bien équipés en espaces sans laisse, et les plages de la Vistule et le quartier de Praga sont excellents pour les propriétaires de chiens."
            },
            {
                "q": "Quelle est la réglementation sur les laisses à Varsovie ?",
                "a": "Les chiens doivent être tenus en laisse dans tous les espaces publics de Varsovie, sauf dans les zones sans laisse désignées (wybieg dla psów). Des amendes s'appliquent en cas d'infraction dans les espaces publics."
            },
            {
                "q": "Quelle est la meilleure période pour visiter Varsovie avec un chien ?",
                "a": "Mai–juin et septembre–octobre sont idéaux : temps agréable, bars de plage et restaurants-jardins ouverts, moins de foule estivale. Juillet–août peut être très chaud. Les plages de la Vistule sont au mieux en juillet–août mais peuvent être envahissantes lors des week-ends caniculaires."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Es Varsovia una ciudad acogedora para los perros en general?",
                "a": "Sí. Varsovia se ha vuelto notablemente más amigable con los perros en los últimos años. Los perros viajan gratis en el transporte, los parques están bien equipados con zonas sin correa, y las playas del Vístula y el barrio de Praga son excelentes para los dueños de perros."
            },
            {
                "q": "¿Cuáles son las normas sobre correa en Varsovia?",
                "a": "Los perros deben ir con correa en todos los espacios públicos de Varsovia, salvo en las zonas sin correa designadas (wybieg dla psów). Las infracciones en espacios públicos están sujetas a multa."
            },
            {
                "q": "¿Cuál es la mejor época para visitar Varsovia con un perro?",
                "a": "Mayo–junio y septiembre–octubre son ideales: clima agradable, bares de playa y restaurantes con jardín abiertos, menos aglomeraciones veraniegas. Julio–agosto puede ser muy caluroso. Las playas del Vístula están en su mejor momento en julio–agosto, aunque pueden ser agobiantes los fines de semana de más calor."
            }
        ]
    },
    "attractions": {
        "faqsFr": [
            {
                "q": "Puis-je emmener mon chien dans la vieille ville de Varsovie ?",
                "a": "Oui. La place du Marché de la vieille ville et les rues environnantes sont toutes accessibles avec des chiens en laisse. Le quartier est très fréquenté en été — les visites matinales sont bien plus agréables."
            },
            {
                "q": "Le quartier de Praga est-il agréable pour les chiens ?",
                "a": "Excellent. Praga est le quartier le plus accueillant pour les chiens à Varsovie — des établissements informels tournés vers l'extérieur, de bons parcs et une atmosphère authentique d'avant-guerre. Très recommandé."
            },
            {
                "q": "Puis-je emmener mon chien au Musée de l'Insurrection de Varsovie ?",
                "a": "L'extérieur du musée et le jardin du mémorial sont accessibles aux chiens. L'intérieur du musée n'autorise pas les chiens. Visitez les zones mémorielles extérieures avec votre chien et organisez une garde pour la partie intérieure."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Puedo llevar a mi perro al casco antiguo de Varsovia?",
                "a": "Sí. La Plaza del Mercado del casco antiguo y las calles circundantes son accesibles con perros con correa. La zona se llena mucho en verano — las visitas por la mañana son mucho más agradables."
            },
            {
                "q": "¿Es el barrio de Praga bueno para los perros?",
                "a": "Excelente. Praga es el barrio más amigable con perros de Varsovia — locales informales orientados al exterior, buenos parques y una auténtica atmósfera de entreguerras. Muy recomendable."
            },
            {
                "q": "¿Puedo llevar a mi perro al Museo del Alzamiento de Varsovia?",
                "a": "El exterior del museo y el jardín memorial son aptos para perros. El interior del museo no admite perros. Visita las zonas memoriales exteriores con tu perro y organiza un cuidador para la parte interior."
            }
        ]
    },
    "petsitting": {
        "faqsFr": [
            {
                "q": "Où trouver un gardien de chien à Varsovie ?",
                "a": "Rover et Pawshake opèrent tous deux à Varsovie avec des réseaux de gardiens vérifiés. Réservez au moins 48 heures à l'avance. Le concierge de votre hôtel peut également avoir des recommandations locales."
            },
            {
                "q": "Puis-je visiter le Musée de l'Insurrection de Varsovie avec mon chien ?",
                "a": "Les zones mémorielles extérieures sont accessibles aux chiens. L'intérieur du musée n'autorise pas les chiens. Organisez un gardien à domicile Rover pour la partie intérieure de la visite."
            },
            {
                "q": "Y a-t-il des structures de garde de chiens de jour à Varsovie ?",
                "a": "Oui. Recherchez 'psia pensja Warszawa' ou 'hotel dla psów Warszawa' pour trouver des pensions locales pour chiens. Les hôtes Pawshake proposent également une garde à la journée dans toute la ville."
            }
        ],
        "faqsEs": [
            {
                "q": "¿Dónde puedo encontrar un cuidador de perros en Varsovia?",
                "a": "Rover y Pawshake operan en Varsovia con redes de cuidadores verificados. Reserva con al menos 48 horas de antelación. El conserje de tu hotel también puede tener recomendaciones locales."
            },
            {
                "q": "¿Puedo visitar el Museo del Alzamiento de Varsovia con mi perro?",
                "a": "Las zonas memoriales exteriores son aptas para perros. El interior del museo no admite perros. Organiza un cuidador a domicilio de Rover para la parte interior de la visita."
            },
            {
                "q": "¿Hay guarderías caninas de día en Varsovia?",
                "a": "Sí. Busca 'psia pensja Warszawa' o 'hotel dla psów Warszawa' para encontrar residencias caninas locales. Los anfitriones de Pawshake también ofrecen cuidado durante el día completo en toda la ciudad."
            }
        ]
    }
}

# ============================================================
# APPLY PATCHES
# ============================================================

city_translations = {
    "budapest": budapest_translations,
    "krakow": krakow_translations,
    "prague": prague_translations,
    "warsaw": warsaw_translations,
}

sections = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting']

for city, translations in city_translations.items():
    path = f"data/city-guides/{city}.json"
    with open(path) as f:
        data = json.load(f)

    guides = data["guides"]
    for section in sections:
        sec = guides[section]
        t = translations[section]
        sec["faqsFr"] = t["faqsFr"]
        sec["faqsEs"] = t["faqsEs"]

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    print(f"Patched {city}.json")

print("Done.")
