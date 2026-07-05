import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { Link, getTranslatedPathname } from "@/i18n/navigation";

export default async function SitemapPage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  const mainLinks = [
    { href: "/", label: t.common.home },
    {
      href: getTranslatedPathname("/explore", locale),
      label: t.common.explore,
    },
    {
      href: getTranslatedPathname("/qui-est-heidi", locale),
      label: t.common.whoIsHeidi,
    },
    {
      href: getTranslatedPathname("/services", locale),
      label: t.common.services,
    },
    {
      href: getTranslatedPathname("/contact", locale),
      label: t.common.contact,
    },
  ];

  const legalLinks = [
    {
      href: getTranslatedPathname("/mentions-legales", locale),
      label: t.footer.legal,
    },
    {
      href: getTranslatedPathname("/cgv", locale),
      label: t.footer.terms,
    },
  ];

  return (
    <main className="bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle title={t.sitemap.title} textMaxWidth="7xl" align="left" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {t.sitemap.sectionMain}
            </h2>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 leading-relaxed hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {t.sitemap.sectionLegal}
            </h2>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 leading-relaxed hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
