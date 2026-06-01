import { PageHero } from "@/components/PageHero";
import { getGamificationConfig, getPageHeroImages } from "@/services/content";

export default function FunPage() {
  const gamification = getGamificationConfig();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="趣味互动"
        title="任务、成长值与安全守护勋章"
        description="每日遛狗任务、城市探索、连续打卡和排行榜模拟数据，让安全习惯更容易坚持。"
        image={heroImages.fun}
        imageAlt="城市遛狗互动"
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="grid cols-4">
          {gamification.modules.map((item, index) => (
            <article className="card feature-card" key={item.title}>
              <span className="tag">排名 {index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
          </div>
          <div className="grid cols-3">
            <article className="card feature-card">
              <span className="eyebrow">每日任务</span>
              {gamification.tasks.map((task) => <p key={task.id}><strong>{task.title}</strong> · {task.points} 成长值 · {task.status}</p>)}
            </article>
            <article className="card feature-card">
              <span className="eyebrow">勋章墙</span>
              {gamification.badges.map((badge) => <p key={badge.id}><strong>{badge.name}</strong> · {badge.requirement}</p>)}
            </article>
            <article className="card feature-card">
              <span className="eyebrow">排行榜模拟</span>
              {gamification.rankings.map((user) => <p key={user.id}>{user.name} 和 {user.petName} · {user.score} 分 · 连续 {user.streak} 天</p>)}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
