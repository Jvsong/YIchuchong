import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getPageHeroImages, getServices } from "@/services/content";

export default function BoardingPage() {
  const services = getServices();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="宠物寄养"
        title="让寄养服务更透明、更安心"
        description="展示寄养环境、服务记录与未来寄养监控方案，帮助主人建立信任。"
        image={heroImages.boarding}
        imageAlt="宠物寄养空间"
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="service-pricing">
            {[
              ["日间寄养", "适合白天照护", "环境展示 / 饮水喂食 / 图文反馈"],
              ["过夜寄养", "适合短途出行", "独立休息区 / 晚间巡检 / 次日报告"],
              ["透明看护", "适合敏感宠物", "监控规划 / 服务留痕 / 异常提醒"]
            ].map(([title, sub, detail]) => (
              <article className="card feature-card" key={title}>
                <span className="tag">{sub}</span>
                <h3 style={{ marginTop: 14 }}>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="grid cols-3">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          <div className="service-checklist">
            {["疫苗记录", "过敏禁忌", "饮食作息", "紧急联系人", "牵引规范", "日报授权"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="grid cols-3">
            {services.slice(0, 3).map((service) => (
              <article className="card feature-card" key={service.id}>
                <span className="tag">{service.name}流程</span>
                {service.processSteps.map((step, index) => <p key={step}>{index + 1}. {step}</p>)}
              </article>
            ))}
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
