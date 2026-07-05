import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";

export default async function CGVPage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  const sections = t.cgv.sections;

  return (
    <main className="bg-background pt-8 pb-8 md:pt-24 md:pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle title={t.cgv.title} textMaxWidth="7xl" align="left" />

        <div className="prose prose-lg max-w-none mt-12 space-y-12">
          {/* Généralités */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.generalities.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.generalities.content}
            </p>
          </section>

          {/* Conclusion du contrat */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.contract.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.contract.content}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.contract.content2}
            </p>
          </section>

          {/* Prix */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.prices.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.prices.content}
            </p>
          </section>

          {/* Modalités de paiement */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.payment.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.payment.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.payment.content2}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.payment.content3}
            </p>
          </section>

          {/* Responsabilités */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.liability.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.liability.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.liability.content2}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.liability.content3}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.liability.content4}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.liability.content5}
            </p>
          </section>

          {/* Assurances */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.insurance.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.insurance.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.insurance.content2}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.insurance.content3}
            </p>
          </section>

          {/* Annulation */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.cancellation.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.cancellation.content}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.cancellation.content2}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.cancellation.content3}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.cancellation.content4}
            </p>
          </section>

          {/* Force majeure */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.forceMajeure.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.forceMajeure.content}
            </p>
          </section>

          {/* Confidentialité */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.confidentiality.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.confidentiality.content}
            </p>
          </section>

          {/* Interprétation */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.interpretation.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {sections.interpretation.content}
            </p>
          </section>

          {/* Juridiction */}
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {sections.jurisdiction.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {sections.jurisdiction.content}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {sections.jurisdiction.content2}
            </p>
          </section>
        </div>
      </div>
      <TopImage position="bottom-right" size="small" />
    </main>
  );
}
