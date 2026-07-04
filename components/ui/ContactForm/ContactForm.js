"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";

const ContactForm = ({ prestation = null }) => {
  const t = useTranslations("contact.form");
  const [formData, setFormData] = useState({
    firstName: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    prestation: prestation || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.firstName || !formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: "error", message: t("error.required") });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: t("error.email") });
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus({ type: "success", message: t("success") });
      setFormData({
        firstName: "",
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        prestation: prestation || "",
      });
    } catch {
      setSubmitStatus({ type: "error", message: t("error.generic") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border text-gray-700 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-light bg-white";
  const labelClass = "block text-sm font-light text-anthracite mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Prénom + Nom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              {t("firstName")} <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={t("firstNamePlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="name" className={labelClass}>
              {t("name")} <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={t("namePlaceholder")}
            />
          </div>
        </div>

        {/* Email + Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              {t("email")} <span className="text-primary">{t("required")}</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={t("emailPlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder={t("phonePlaceholder")}
            />
          </div>
        </div>

        {/* Sujet */}
        <div>
          <label htmlFor="subject" className={labelClass}>
            {t("subject")}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
            placeholder={t("subjectPlaceholder")}
          />
        </div>

        {/* Prestation (si applicable) */}
        {prestation && (
          <div>
            <label htmlFor="prestation" className={labelClass}>
              {t("prestation")}
            </label>
            <input
              type="text"
              id="prestation"
              name="prestation"
              value={formData.prestation}
              readOnly
              className={`${inputClass} bg-gray-50 cursor-not-allowed`}
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            {t("message")} <span className="text-primary">{t("required")}</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder={t("messagePlaceholder")}
          />
        </div>

        {submitStatus && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="font-light">{submitStatus.message}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" rounded="full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
