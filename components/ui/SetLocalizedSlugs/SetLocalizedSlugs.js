"use client";
import { useEffect } from "react";

export default function SetLocalizedSlugs({ slugs }) {
  useEffect(() => {
    window.__LOCALIZED_SLUGS__ = slugs;
    return () => {
      delete window.__LOCALIZED_SLUGS__;
    };
  }, [slugs]);

  return null;
}
