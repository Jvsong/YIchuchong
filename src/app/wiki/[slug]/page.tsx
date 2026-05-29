import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { breeds } from "@/data/site";

export function generateStaticParams() {
  return breeds.map((breed) => ({ slug: breed.slug }));
}

export default function BreedDetailPage({ params }: { params: { slug: string } }) {
  const breed = breeds.find((item) => item.slug === params.slug);
  if (!breed) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="品种详情"
        title={breed.name}
        description={breed.summary}
        image={breed.image}
        imageAlt={`${breed.name}图片`}
      />
      <section className="section compact">
        <div className="container grid cols-3">
          {[
            ["性格", breed.temperament],
            ["养护难度", breed.careLevel],
            ["活动需求", breed.activity]
          ].map(([label, value]) => (
            <article className="card feature-card" key={label}>
              <span className="tag">{label}</span>
              <h3 style={{ marginTop: 14 }}>{value}</h3>
              <p>建议结合宠物年龄、健康状态、家庭时间和居住环境制定日常养护计划。</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
