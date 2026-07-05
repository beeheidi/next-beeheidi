import PageTitle from "@/components/ui/PageTitle/PageTitle";
import ContactForm from "@/components/ui/ContactForm/ContactForm";
import TopImage from "@/components/ui/TopImage/TopImage";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Contact - Beeheidi",
  description: "Contactez-nous pour planifier votre expérience",
};

export default async function ContactPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const prestation = resolvedSearchParams?.prestation
    ? decodeURIComponent(resolvedSearchParams.prestation)
    : null;
  const t = await getTranslations({ locale });

  return (
    <main className="bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
      <PageTitle
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        description={t("contact.description")}
        align="left"
        textMaxWidth="full"
      />
      </div>
      <div className="max-w-laptop mx-auto px-6">
        <ContactForm prestation={prestation} />
      </div>
      <TopImage position="bottom-right" size="small" />
    </main>
  );
}
