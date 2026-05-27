/**
 * Mandatory disclosure for the Amazon Associates programme (FR market).
 * Must appear clearly on any page containing Amazon affiliate links.
 * Source: Amazon Operating Agreement, EU section 5 (affiliate disclosure).
 */
export default function AmazonDisclosure() {
  return (
    <div className="text-xs text-stone-500 bg-stone-100 rounded-lg p-4 leading-relaxed">
      <strong className="text-stone-700">Transparence affiliation Amazon :</strong>{' '}
      HotelsWithPets.com participe au Programme Partenaires d&apos;Amazon EU,
      un programme d&apos;affiliation conçu pour permettre à des sites de
      percevoir une rémunération grâce à la création de liens vers
      Amazon.fr. Les liens sur cette page sont sponsorisés : si vous
      achetez un produit après avoir cliqué, nous touchons une petite
      commission sans surcoût pour vous. Cela ne change rien à notre
      sélection éditoriale — nous ne recommandons que des produits que
      nous trouvons réellement utiles pour voyager avec son animal.
    </div>
  )
}
