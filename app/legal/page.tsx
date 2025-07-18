"use client";

export default function LegalDisclaimer() {
  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-20 md:pb-20 lg:pb-28">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-black dark:text-white">
          Clause de non-responsabilité
        </h1>

        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Les informations, analyses, prédictions et recommandations fournies par Vestr.ai sont générées automatiquement à partir de données historiques et de la performance quotidienne des entreprises.
        </p>

        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Ces contenus ne constituent en aucun cas un conseil financier, juridique ou d’investissement personnalisé.  
          Vous êtes seul responsable de vos décisions d’investissement et devez faire preuve de discernement avant toute action.
        </p>

        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Vestr.ai décline toute responsabilité en cas de pertes, erreurs, omissions ou dommages résultant de l’utilisation de ses services.
        </p>

        <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
          Nous recommandons vivement de consulter un professionnel avant toute décision financière importante.
        </p>
      </div>
    </section>
  );
}
