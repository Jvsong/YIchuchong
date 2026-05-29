import { AiCareDemo } from "@/components/AiCareDemo";
import { PageHero } from "@/components/PageHero";

export default function AiCarePage() {
  return (
    <>
      <PageHero
        eyebrow="AI养宠助手"
        title="先用规则 Demo 跑通个性化建议"
        description="根据宠物类型、品种、年龄、体型、健康状态、今日天气和主人可用时间输出当天养宠建议。"
        image="/assets/pets/lifestyle/pet-lifestyle-home-001.jpg"
        imageAlt="主人和宠物在家互动"
      />
      <section className="section compact">
        <div className="container">
          <AiCareDemo />
        </div>
      </section>
    </>
  );
}
