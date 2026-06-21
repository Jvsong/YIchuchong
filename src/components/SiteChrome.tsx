"use client";

import { usePathname } from "next/navigation";
import type { FunFact } from "@/data/types";
import { Footer } from "@/components/Footer";
import { FunFactTicker } from "@/components/FunFactTicker";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";

export function SiteChrome({ children, brandEmail, facts }: { children: React.ReactNode; brandEmail: string; facts: FunFact[] }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className={isAdmin ? "site-shell admin-route" : "site-shell"}>
      {!isAdmin ? (
        <>
          <FunFactTicker facts={facts} />
          <Header />
        </>
      ) : null}
      <main id="main">{children}</main>
      {!isAdmin ? <Footer brandEmail={brandEmail} /> : null}
      {!isAdmin ? <ScrollReveal /> : null}
    </div>
  );
}
