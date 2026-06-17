import { AiCareDemo } from "@/components/AiCareDemo";
import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/services/content";

export default function AiCarePage() {
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="养宠建议"
        title="用日常数据生成更可靠的养宠计划"
        description="根据宠物类型、品种、年龄、体型、健康状态、天气、场景和主人可用时间，生成运动、喂养、健康与定位器使用建议。"
        image={heroImages.aiCare}
        imageAlt="主人和宠物在家互动"
      />
      <section className="section compact">
        <div className="container">
          <AiCareDemo />
          <div className="grid cols-3" style={{ marginTop: 22 }}>
            {["科学日常计划", "设备联动建议", "不能替代兽医诊断"].map((item) => (
              <article className="card feature-card" key={item}>
                <span className="tag">养宠建议</span>
                <h3 style={{ marginTop: 14 }}>{item}</h3>
                <p>根据宠物档案、天气、场景和主人时间生成结构化建议；当宠物持续异常时，应及时咨询专业兽医。</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
