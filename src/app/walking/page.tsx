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
          <div className="service-pricing">
            {[
              ["30 分钟基础路线", "小区周边日常活动", "出发确认 / 路线打卡 / 服务照片"],
              ["60 分钟探索路线", "公园或长距离散步", "轨迹记录 / 饮水提醒 / 异常反馈"],
              ["家庭协作照护", "多人共同查看服务", "家庭共享 / 服务评价 / 周报沉淀"]
            ].map(([title, sub, detail]) => (
              <article className="card feature-card" key={title}>
                <span className="tag">{sub}</span>
                <h3 style={{ marginTop: 14 }}>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="grid cols-3">
            {services.filter((service) => service.id !== "boarding").map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
          <div className="card feature-card">
            <span className="eyebrow">安全保障</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>实名认证、学生认证、全程轨迹、服务评价</h2>
            <p>页面展示代溜服务应有的安全节点和后续定位器联动方向；真实下单、支付和服务者审核会在后端上线后接入。</p>
          </div>
          <ServiceLeadForm />
        </div>
      </section>
    </>
  );
}
