"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  const { dict } = useLocale();
  return (
    <section className="page-hero">
      <Image className="page-hero-bg" src={image} alt="" fill priority sizes="100vw" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          {children}
        </div>
        <div className="page-hero-media">
          <Image src={image} alt={imageAlt} width={900} height={620} priority />
          <div className="page-hero-card" aria-hidden="true">
            <span>Epet Ecosystem</span>
            <strong>{dict.pageHero.badge}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
