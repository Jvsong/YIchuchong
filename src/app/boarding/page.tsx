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
          <div className="grid cols-3">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
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
