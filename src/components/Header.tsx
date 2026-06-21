"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { getNavigationItems } from "@/services/content";
import { useLocale } from "@/i18n/LocaleProvider";
import { brandEmblem, brandName, pick } from "@/i18n/index";
import { LocaleSwitch } from "@/components/LocaleSwitch";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavigationItems();
  const { locale, dict } = useLocale();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label={dict.a11y.brandHome}>
          <span className="brand-emblem" aria-hidden="true">{brandEmblem(locale)}</span>
          <span className="brand-text" translate="no">{brandName(locale)}</span>
        </Link>
        <button className="nav-menu-button" type="button" aria-label={open ? dict.a11y.closeNav : dict.a11y.openNav} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label={dict.a11y.mainNav}>
          {navItems.map((item) => (
            <Link className={`nav-link ${pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)) ? "active" : ""}`} href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {pick(item.label, locale)}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="nav-primary-link" href="/locator">
            {dict.nav.primaryCta} <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <LocaleSwitch />
        </div>
      </div>
    </header>
  );
}
