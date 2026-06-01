"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
import { getNavigationItems } from "@/services/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavigationItems();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="易趣宠首页">
          <span className="brand-emblem" aria-hidden="true">趣</span>
          <span className="brand-text" translate="no">易趣宠</span>
        </Link>
        <button className="nav-menu-button" type="button" aria-label={open ? "关闭导航" : "打开导航"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="主导航">
          {navItems.map((item) => (
            <Link className={`nav-link ${pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)) ? "active" : ""}`} href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="nav-icon-link" href="/news" aria-label="搜索宠物内容">
            <Search size={18} aria-hidden="true" />
          </Link>
          <Link className="nav-subtle-link" href="/admin/login" aria-label="进入内容管理">
            <UserRound size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
