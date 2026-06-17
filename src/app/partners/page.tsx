import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getPageHeroImages } from "@/services/content";

export default function PartnersPage() {
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="合作入驻"
        title="面向门店、寄养与代溜服务方的生态入口"
        description="提供合作展示、线索表单和内容管理能力，后续可扩展资质审核、服务排期和线索分发。"
        image={heroImages.partners}
        imageAlt="宠物门店合作"
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="partner-grid">
            {[
              ["寄养门店", "展示环境、房型、日报与监控规划，提升主人信任。"],
              ["代溜服务者", "提交身份、服务范围和路线规范，沉淀评价记录。"],
              ["宠物用品/设备合作", "围绕定位器、喂养、饮水和监控形成组合方案。"]
            ].map(([title, text]) => (
              <article className="card feature-card" key={title}>
                <span className="tag">合作对象</span>
                <h3 style={{ marginTop: 14 }}>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="partner-process">
            {["提交资料", "资质核验", "完善服务内容", "配置设备方案", "接收线索"].map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
