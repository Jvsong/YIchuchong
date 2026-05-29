"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { navItems } from "@/data/site";

export function Header() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="易趣宠首页">
          <span className="brand-mark" aria-hidden="true">
            <PawPrint size={23} />
          </span>
          <span translate="no">易趣宠</span>
        </Link>
        <nav className="nav-links" aria-label="主导航">
          {navItems.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="pill" href="/admin">
            管理后台入口
          </Link>
        </nav>
      </div>
    </header>
  );
}
