import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ContactForm from "@/components/ui/ContactForm/ContactForm";
import TopImage from "@/components/ui/TopImage/TopImage";

export default async function ContactPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const prestation = resolvedSearchParams?.prestation
    ? decodeURIComponent(resolvedSearchParams.prestation)
    : null;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  return (
    <main className=" bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />
      <PageTitle
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        description={t.contact.description}
        textMaxWidth="7xl"
      />
      <div className="max-w-laptop mx-auto px-6">
        <ContactForm prestation={prestation} />
      </div>
      <TopImage position="bottom-right" size="small" />
    </main>
  );
}
