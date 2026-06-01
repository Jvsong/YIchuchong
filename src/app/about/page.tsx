import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/services/content";

export default function AboutPage() {
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="关于易趣宠"
        title="以宠物安全为起点，构建未来养宠生态"
        description="从宠物定位器出发，连接智能设备、养宠建议、内容与生态服务，为真实设备、服务和内容运营打基础。"
        image={heroImages.about}
        imageAlt="家庭宠物生活"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          <article className="card feature-card"><h3>品牌定位</h3><p>智能宠物生态平台，以宠物定位器为核心入口，逐步连接设备、内容、养宠建议和服务。</p></article>
          <article className="card feature-card" id="privacy"><h3>隐私政策</h3><p>当前版本不采集真实支付、真实定位和真实设备控制数据。</p></article>
          <article className="card feature-card" id="terms"><h3>用户协议</h3><p>当前内容为展示与本地 Demo，后续接入真实服务时再完善协议条款。</p></article>
        </div>
        <div className="container roadmap">
          {["第一阶段：宠物定位器", "第二阶段：内容与养宠建议", "第三阶段：智能设备生态", "第四阶段：寄养代溜服务", "第五阶段：宠物社区和服务闭环"].map((item) => (
            <article className="card feature-card" key={item}>
              <span className="tag">Roadmap</span>
              <h3 style={{ marginTop: 14 }}>{item}</h3>
              <p>保持前端、数据和 service 边界清晰，便于后续接入 Java Spring Boot + MySQL。</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
