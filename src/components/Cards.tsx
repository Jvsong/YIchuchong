import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Cpu,
  Medal,
  Shield,
  Sparkles,
  Store,
  type LucideIcon
} from "lucide-react";
import type { Breed, NewsItem, Product, Service } from "@/data/types";

const iconMap: Record<string, LucideIcon> = { Shield, Cpu, Sparkles, BookOpen, Medal, Store };

export function EcoCard({ title, text, icon }: { title: string; text: string; icon: string }) {
  const Icon = iconMap[icon] ?? Sparkles;
  return (
    <article className="card feature-card">
      <div className="icon-badge" aria-hidden="true">
        <Icon size={23} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="card-link">进入生态 <span aria-hidden="true">→</span></span>
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card product-card">
      <Image src={product.image} alt={product.name} width={760} height={520} />
      <div className="card-body">
        <span className="tag">{product.status}</span>
        <h3 style={{ marginTop: 12 }}>{product.name}</h3>
        <p>{product.summary}</p>
        <ul className="feature-list" aria-label={`${product.name}能力`}>
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Link className="card-link" href={product.id === "tracker" ? "/locator" : "/devices"}>
          查看详情 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card news-card">
      <Image src={item.image} alt={item.title} width={720} height={480} />
      <div className="card-body">
        <span className="tag">{item.category}</span>
        <h3 style={{ marginTop: 12 }}>{item.title}</h3>
        <p>{item.summary}</p>
        <p>{item.date} · {item.readTime}</p>
      </div>
    </article>
  );
}

export function BreedCard({ breed }: { breed: Breed }) {
  return (
    <Link className="card breed-card" href={`/wiki/${breed.slug}`}>
      <Image src={breed.image} alt={breed.name} width={720} height={480} />
      <div className="card-body">
        <span className="tag">{breed.species === "dog" ? "狗狗" : breed.species === "cat" ? "猫咪" : "小宠"}</span>
        <h3 style={{ marginTop: 12 }}>{breed.name}</h3>
        <p>{breed.summary}</p>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card service-card">
      <Image src={service.image} alt={service.name} width={720} height={480} />
      <div className="card-body">
        <h3>{service.name}</h3>
        <p>{service.summary}</p>
        <ul className="feature-list">
          {service.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
