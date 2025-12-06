import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Prestation non trouvée
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Désolé, la prestation que vous recherchez n'existe pas ou n'est plus
          disponible.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/explore"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Voir toutes les prestations
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
