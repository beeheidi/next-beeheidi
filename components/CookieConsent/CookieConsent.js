"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { getTranslatedPathname } from "@/i18n/navigation";

const GTAG_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function CookieConsent() {
  const locale = useLocale();

  useEffect(() => {
    window.tarteaucitronForceLanguage = locale;

    const script = document.createElement("script");
    script.src = "/tarteaucitron/tarteaucitron.min.js";
    script.async = true;
    script.onload = () => {
      window.tarteaucitron.init({
        privacyUrl: `/${locale}${getTranslatedPathname("/mentions-legales", locale)}`,
        bodyPosition: "bottom",
        hashtag: "#tarteaucitron",
        cookieName: "tarteaucitron",
        orientation: "bottom",
        groupServices: false,
        showDetailsOnClick: true,
        serviceDefaultState: "wait",
        showAlertSmall: false,
        showTitleBanner: false,
        cookieslist: false,
        showIcon: true,
        iconPosition: "BottomRight",
        adblocker: false,
        DenyAllCta: true,
        AcceptAllCta: true,
        highPrivacy: true,
        alwaysNeedConsent: false,
        handleBrowserDNTRequest: false,
        removeCredit: true,
        moreInfoLink: true,
        useExternalCss: false,
        useExternalJs: false,
        mandatory: true,
        mandatoryCta: true,
        googleConsentMode: true,
        bingConsentMode: true,
        partnersList: false,
      });

      if (GTAG_ID) {
        window.tarteaucitron.user.gtagUa = GTAG_ID;
        (window.tarteaucitron.job = window.tarteaucitron.job || []).push("gtag");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.tarteaucitron;
      delete window.tarteaucitronForceLanguage;
      document.getElementById("tarteaucitronRoot")?.remove();
    };
  }, [locale]);

  return null;
}
