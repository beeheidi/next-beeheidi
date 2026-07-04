import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MailIcon, PhoneIcon } from "lucide-react";
import TopImage from "../ui/TopImage/TopImage";

export default function WhoAreWe({ t }) {
  return (
    <div className="max-w-laptop mx-auto px-6 ">
      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-card p-8 md:p-12">
        <Image
          src="/images/logo/logo-dore.svg"
          alt="Beeheidi"
          width={160}
          height={60}
          className="h-10 w-auto mb-6"
        />

        <p className="text-primary font-semibold text-sm tracking-wide mb-4">
          {t("home.whoAreWeSubtitle")}
        </p>

        <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
          {t("home.whoAreWeDescription")}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-anthracite font-light text-sm">
            {t("home.contactUs")}
          </span>
          <Link href="tel:0041275654440" aria-label="Appeler Beeheidi">
            <PhoneIcon className="w-5 h-5 text-primary hover:opacity-70 transition-opacity duration-200" />
          </Link>
          <Link href="/contact" aria-label="Envoyer un email">
            <MailIcon className="w-5 h-5 text-primary hover:opacity-70 transition-opacity duration-200" />
          </Link>
        </div>

      </div>
    </div>
  );
}
