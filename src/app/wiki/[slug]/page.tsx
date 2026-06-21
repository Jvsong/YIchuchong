import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getBreedById } from "@/lib/content";
import { getLocale, getServerDictionary } from "@/i18n/server";
import { pick } from "@/i18n/index";
import { tt } from "@/i18n/terms";

export const dynamic = 'force-dynamic';

export default function BreedDetailPage({ params }: { params: { slug: string } }) {
  const locale = getLocale();
  const dict = getServerDictionary();
  const breed = getBreedById(params.slug);
  if (!breed) {
    notFound();
  }
  const name = pick(breed.name, locale);

  const zh = locale === "zh";
  const rows: [string, string, string][] = [
    [dict.detail.temperament, pick(breed.temperament, locale), zh ? "性格会受早期社会化、生活经历和个体差异影响。" : "Temperament also reflects socialization, life experience and individual variation."],
    [dict.detail.careLevel, tt(breed.careLevel, locale), zh ? "护理难度综合毛发、运动、环境和健康观察需求。" : "Care level combines grooming, exercise, environment and health-observation needs."],
    [dict.detail.activityLevel, tt(breed.activityLevel, locale), zh ? "活动需求应按年龄、天气、体况和恢复速度调整。" : "Adjust activity for age, weather, body condition and recovery speed."],
    [dict.detail.suitablePeople, pick(breed.suitablePeople, locale), zh ? "选择宠物前应确认家庭时间、空间和长期预算。" : "Before choosing a pet, confirm family time, space and long-term budget."],
    [dict.detail.dailyExercise, pick(breed.dailyExercise, locale), zh ? "建议拆分为多次活动，并保留休息和自由探索时间。" : "Split activity into sessions and leave time for rest and free exploration."],
    [dict.detail.deviceSuggestion, pick(breed.deviceSuggestion, locale), zh ? "设备用于辅助记录与提醒，不能替代现场照护。" : "Devices support records and reminders but never replace direct care."],
    [dict.detail.feedingTips, pick(breed.feedingTips, locale), zh ? "换粮应循序渐进，并结合体重、便便和食欲持续观察。" : "Transition food gradually and monitor weight, stool and appetite."],
    [dict.detail.healthRisks, pick(breed.healthRisks, locale), zh ? "风险提示不是诊断；持续异常应由兽医评估。" : "Risk notes are not a diagnosis; persistent changes need veterinary assessment."],
    [zh ? "预期寿命" : "Expected lifespan", pick(breed.lifespan, locale), zh ? "寿命范围会受遗传、营养、环境和医疗条件影响。" : "Lifespan varies with genetics, nutrition, environment and veterinary care."],
    [zh ? "日常护理" : "Grooming & care", pick(breed.groomingNeeds, locale), zh ? "把护理拆成固定周计划，更容易及时发现变化。" : "A weekly care routine makes changes easier to notice early."],
    [zh ? "环境需求" : "Home environment", pick(breed.environmentNeeds, locale), zh ? "环境布置应兼顾安全、休息、活动和清洁。" : "The home should balance safety, rest, activity and hygiene."],
    [zh ? "安全提醒" : "Safety notes", pick(breed.safetyTips, locale), zh ? "记录异常发生的时间、频率和诱因，便于后续判断。" : "Record timing, frequency and triggers of unusual changes for follow-up." ]
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.detail.breedEyebrow}
        title={name}
        description={pick(breed.summary, locale)}
        image={breed.image}
        imageAlt={name}
      />
      <section className="section compact">
        <div className="container grid cols-3">
          {rows.map(([label, value, note]) => (
            <article className="card feature-card" key={label}>
              <span className="tag">{label}</span>
              <h3 style={{ marginTop: 14 }}>{value}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
