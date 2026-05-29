import { PageHero } from "@/components/PageHero";
import { funModules } from "@/data/site";

export default function FunPage() {
  return (
    <>
      <PageHero
        eyebrow="趣味互动"
        title="任务、成长值与安全守护勋章"
        description="每日遛狗任务、城市探索、连续打卡和排行榜模拟数据，让安全习惯更容易坚持。"
        image="/assets/pets/dogs/dog-walking-city-001.jpg"
        imageAlt="城市遛狗互动"
      />
      <section className="section compact">
        <div className="container grid cols-4">
          {funModules.map((item, index) => (
            <article className="card feature-card" key={item.title}>
              <span className="tag">排名 {index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
