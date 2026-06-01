import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { getPageHeroImages, getServices } from "@/services/content";

export default function WalkingPage() {
  const services = getServices();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="宠物代溜"
        title="用路线、打卡和记录守住代溜安全"
        description="围绕服务前确认、服务中轨迹和服务后反馈，建立轻量但完整的代溜体验。"
        image={heroImages.walking}
        imageAlt="宠物代溜服务"
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="grid cols-3">
            {services.filter((service) => service.id !== "boarding").map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          <div className="card feature-card">
            <span className="eyebrow">安全保障</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>实名认证、学生认证、全程轨迹、服务评价</h2>
            <p>当前不做真实订单和支付，只展示代溜服务应有的安全节点和后续定位器联动方向。</p>
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
