"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { FunFactTicker } from "@/components/FunFactTicker";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className={isAdmin ? "site-shell admin-route" : "site-shell"}>
      {!isAdmin ? (
        <>
          <FunFactTicker />
          <Header />
        </>
      ) : null}
      <main id="main">{children}</main>
      {!isAdmin ? <Footer /> : null}
    </div>
  );
}
