import { Link } from "@/i18n/navigation";

export default function PrestationBreadcrumb({ t, title }) {
  return (
    <nav className="mb-8">
      <div className="flex items-center gap-2 text-sm text-black">
        <Link href="/" className="hover:text-primary transition-colors">
          {t.common.home}
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-primary transition-colors">
          {t.common.explore}
        </Link>
        <span>/</span>
        <span className="text-primary">{title}</span>
      </div>
    </nav>
  );
}
