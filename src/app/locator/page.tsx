import { ProductCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getProducts } from "@/services/content";

export default function LocatorPage() {
  const tracker = getProducts()[0];
  return (
    <>
      <PageHero
        eyebrow="核心产品"
        title="宠物定位器，把走失预防放在日常"
        description="实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻和家庭共享，是易趣宠生态的第一块拼图。"
        image={tracker.image}
        imageAlt="易趣宠宠物定位器场景"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          <ProductCard product={tracker} />
          {tracker.features.map((feature) => (
            <article className="card feature-card" key={feature}>
              <span className="tag">定位器能力</span>
              <h3 style={{ marginTop: 14 }}>{feature}</h3>
              <p>第一版以展示和内容管理为主，后续可接入真实定位、设备状态和提醒接口。</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
