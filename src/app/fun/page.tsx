import { PageHero } from "@/components/PageHero";
import { getGamificationConfig } from "@/services/content";
import { getPageHeroImages } from "@/lib/siteSettings";
import { getLocale } from "@/i18n/server";
import { getPageDictionary } from "@/i18n/pageDictionaries";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";
import { enumLabel, taskStatusLabels } from "@/i18n/enums";

export default function FunPage() {
  const locale = getLocale();
  const t = getPageDictionary(locale).fun;
  const gamification = getGamificationConfig();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.desc}
        image={heroImages.fun}
        imageAlt={t.title}
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="grid cols-4">
          {gamification.modules.map((item, index) => (
            <article className="card feature-card" key={index}>
              <span className="tag">{t.rankPrefix} {index + 1}</span>
              <h3>{pick(item.title, locale)}</h3>
              <p>{pick(item.text, locale)}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
          </div>
          <div className="grid cols-3">
            <article className="card feature-card">
              <span className="eyebrow">{t.dailyTasks}</span>
              {gamification.tasks.map((task) => <p key={task.id}><strong>{pick(task.title, locale)}</strong> · {task.points} {t.pointsUnit} · {enumLabel(taskStatusLabels, task.status, locale)}</p>)}
            </article>
            <article className="card feature-card">
              <span className="eyebrow">{t.badgeWall}</span>
              {gamification.badges.map((badge) => <p key={badge.id}><strong>{pick(badge.name, locale)}</strong> · {pick(badge.requirement, locale)}</p>)}
            </article>
            <article className="card feature-card">
              <span className="eyebrow">{t.leaderboard}</span>
              {gamification.rankings.map((user) => <p key={user.id}>{user.name} {t.and} {user.petName} · {user.score} {t.scoreUnit} · {t.streakPrefix} {user.streak} {t.streakSuffix}</p>)}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
