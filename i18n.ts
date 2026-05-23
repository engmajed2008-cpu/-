import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeConfig = {
  ar: {
    label: "العربية",
    dir: "rtl",
    font: "font-arabic",
    flag: "🇸🇦",
    dateLocale: "ar-SA",
  },
  en: {
    label: "English",
    dir: "ltr",
    font: "font-english",
    flag: "🇬🇧",
    dateLocale: "en-US",
  },
} as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate the locale
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
