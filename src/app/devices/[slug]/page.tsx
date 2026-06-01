import { notFound } from "next/navigation";
import { ProductCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getProductBySlug, getProducts } from "@/services/content";

export function generateStaticParams() {
  return getProducts().filter((product) => product.id !== "tracker").map((product) => ({ slug: product.slug }));
}

export default function DeviceDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product || product.id === "tracker") {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={product.statusLabel}
        title={product.name}
        description={product.description}
        image={product.coverImage}
        imageAlt={product.name}
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="grid cols-3">
            <ProductCard product={product} />
            <article className="card feature-card">
              <span className="eyebrow">适用场景</span>
              {product.scenarios.map((item) => <p key={item}>{item}</p>)}
            </article>
            <article className="card feature-card">
              <span className="eyebrow">未来联动</span>
              {product.futureIntegrations.map((item) => <p key={item}>{item}</p>)}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
