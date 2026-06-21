import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getLocale } from "@/i18n/server";
import { getBrand } from "@/lib/siteSettings";
import { getFunFacts } from "@/lib/content";

const META = {
  zh: { title: "易趣宠 Web 生态平台", description: "以宠物定位器为核心的智能宠物生态平台" },
  en: { title: "Epet · Pet Safety Ecosystem", description: "A smart pet ecosystem centered on the pet tracker." },
  es: { title: "Epet · Ecosistema para mascotas", description: "Un ecosistema inteligente centrado en el localizador para mascotas." }
} as const;

const SKIP = { zh: "跳到主要内容", en: "Skip to main content", es: "Saltar al contenido" } as const;
const HTML_LANG = { zh: "zh-CN", en: "en", es: "es" } as const;

export function generateMetadata(): Metadata {
  const meta = META[getLocale()];
  return {
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }
  };
}

export const viewport: Viewport = {
  themeColor: "#F7FAF9"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const brand = getBrand();
  const facts = getFunFacts("home");
  return (
    <html lang={HTML_LANG[locale]}>
      <body>
        <a className="skip-link" href="#main">
          {SKIP[locale]}
        </a>
        <LocaleProvider locale={locale}>
          <SiteChrome brandEmail={brand.email} facts={facts}>{children}</SiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
