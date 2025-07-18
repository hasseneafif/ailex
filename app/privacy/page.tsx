"use client";


export default function PrivacyPolicy() {
  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-20 md:pb-20 lg:pb-28">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
          Politique de confidentialité
        </h1>

        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Chez Vestr.ai, nous prenons très au sérieux la confidentialité de vos données personnelles.  
          Cette politique explique quelles données nous collectons, comment nous les utilisons et vos droits.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Données collectées</h2>
        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Nous collectons uniquement les informations que vous nous fournissez volontairement, comme votre adresse email, ainsi que des données techniques anonymisées (par exemple, données d'utilisation et cookies) pour améliorer votre expérience.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Utilisation des données</h2>
        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Les données collectées sont utilisées pour vous fournir nos services, vous envoyer des communications importantes, et améliorer notre plateforme.  
          Nous ne partageons vos informations avec aucun tiers à des fins commerciales sans votre consentement.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Vos droits</h2>
        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Vous pouvez à tout moment accéder, modifier ou demander la suppression de vos données personnelles en nous contactant à l’adresse :  
          <a href="mailto:contact@vestr.ai" className="text-primary hover:underline">contact@vestr.ai</a>.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Cookies et outils tiers</h2>
        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Nous utilisons des cookies et services tiers (comme Google Analytics) pour analyser l’usage et améliorer la qualité de Vestr.ai. Vous pouvez gérer vos préférences dans les paramètres de votre navigateur.
        </p>

        <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Modifications de cette politique</h2>
        <p className="mb-10 text-base text-body-color dark:text-body-color-dark">
          Cette politique peut être mise à jour de temps à autre. Nous vous invitons à la consulter régulièrement.
        </p>
      </div>
    </section>
  );
}
