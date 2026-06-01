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
        <div className="container">
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
