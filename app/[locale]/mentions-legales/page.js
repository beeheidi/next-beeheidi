import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { Link } from "@/i18n/navigation";

export default async function LegalNoticePage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  return (
    <main className="bg-background pt-8 pb-8 md:pt-24 md:pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle title={t.legal.title} textMaxWidth="7xl" align="left" titleColor="primary" titleBold />

        <div className="prose prose-lg max-w-none mt-12 space-y-12 font-light">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.introduction.content}
            </p>
          </section>

          {/* Droits d'auteur */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.copyright.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.legal.copyright.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.legal.copyright.content2}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.legal.copyright.content3}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.copyright.content4}
            </p>
          </section>

          {/* Exclusion de garantie */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.warranty.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t.legal.warranty.content}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.warranty.content2}
            </p>
          </section>

          {/* Restriction de la responsabilité */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.liability.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.liability.content}
            </p>
          </section>

          {/* Liens vers d'autres sites */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.externalLinks.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.externalLinks.content}
            </p>
          </section>

          {/* Contenu embarqué */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.embeddedContent.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.embeddedContent.content}
            </p>
          </section>

          {/* Protection des Données Personnelles */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.privacy.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t.legal.privacy.introduction}
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {t.legal.privacy.collection.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.legal.privacy.collection.content}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {t.legal.privacy.usage.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.legal.privacy.usage.content}
                </p>
              </div>

              <div>
                  <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {t.legal.privacy.security.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.legal.privacy.security.content}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {t.legal.privacy.sharing.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.legal.privacy.sharing.content}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-anthracite mb-3">
                  {t.legal.privacy.newsletter.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.legal.privacy.newsletter.content}
                </p>
              </div>
            </div>
          </section>

          {/* Général */}
          <section>
            <h2 className="text-3xl font-bold text-anthracite mb-4">
              {t.legal.general.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t.legal.general.content}
            </p>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-anthracite mb-6">
              {t.legal.contact.title}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-anthracite text-m">{t.legal.contact.company}</p>
              <p>{t.legal.contact.address}</p>
              <p>
                <a
                  href={`mailto:${t.legal.contact.email}`}
                  className="text-anthracite hover:underline"
                >
                  {t.legal.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${t.legal.contact.phone.replace(/\s/g, "")}`}
                  className="text-anthracite hover:underline"
                >
                  {t.legal.contact.phone}
                </a>
              </p>
            </div>
          </section>

          {/* Lien vers CGV */}
          <section className="pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              <Link href="/cgv" className="text-anthracite hover:underline">
                {t.legal.linkToCGV}
              </Link>
            </p>
          </section>
        </div>
      </div>
      <TopImage position="bottom-right" size="small" />
    </main>
  );
}
