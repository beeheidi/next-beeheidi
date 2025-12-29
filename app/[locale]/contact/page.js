import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ContactForm from "@/components/ui/ContactForm/ContactForm";

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  return (
    <div className=" bg-background pt-24 pb-16">
      <PageTitle
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        description={t.contact.description}
        textMaxWidth="7xl"
      />
      <div className="max-w-laptop mx-auto px-6">
        <ContactForm />
      </div>
    </div>
  );
}
