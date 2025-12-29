import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <div className=" bg-background pt-24 pb-16 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Prestation introuvable
        </h2>
        <p className="text-gray-600 mb-8">
          La prestation que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <Link href="/explore">
          <Button variant="primary" size="lg" rounded="full">
            Retour à l'exploration
          </Button>
        </Link>
      </div>
    </div>
  );
}
