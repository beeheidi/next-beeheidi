import React from "react";
import TopImage from "../ui/TopImage/TopImage";
import { MailIcon, PhoneIcon } from "lucide-react";
import Button from "../ui/Button/Button";
import Link from "next/link";
import { gsap } from "gsap";

export default function WhoAreWe({ t }) {
  return (
    <div className="max-w-laptop mx-auto px-6  shadow-2xl rounded-2xl p-16 bg-white relative">
      <TopImage position="bottom-right" size="small" />
      <h2 className="text-4xl font-bold text-center text-primary mb-4">
        {t("home.whoAreWe")}
      </h2>
      <h3 className="text-2xl font-bold text-center text-gray-500 mb-8">
        {t("home.whoAreWeSubtitle")}
      </h3>
      <p className="text-center text-gray-500 mb-8">
        {t("home.whoAreWeDescription")}
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="tel:0041275654440">
          <PhoneIcon className="w-6 h-6 text-primary" />
        </Link>
        <Link href="mailto:info@beeheidi.ch">
          <MailIcon className="w-6 h-6 text-primary" />
        </Link>
      </div>
      <div className="flex justify-center relative z-10 mt-8">
        <Button
          variant="outline"
          rounded="full"
          size="lg"
          href="/qui-est-heidi"
        >
          {t("home.learn more")}
        </Button>
      </div>
    </div>
  );
}
