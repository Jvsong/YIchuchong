import Image from "next/image";
import { ProductCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getCoreProduct, getPageHeroImages } from "@/services/content";

export default function LocatorPage() {
  const tracker = getCoreProduct();
  const heroImages = getPageHeroImages();
  const productSpecs = [
    ["适用场景", "日常遛狗、寄养、家庭共享"],
    ["核心能力", "定位、围栏、轨迹、提醒"],
    ["设备状态", "核心产品展示"],
    ["服务支持", "上新提醒与咨询入口"]
  ];
  return (
    <>
      <PageHero
        eyebrow="核心产品"
        title="宠物定位器，把走失预防放在日常"
        description="实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻和家庭共享，是易趣宠生态的第一块拼图。"
        image={heroImages.locator}
        imageAlt="易趣宠宠物定位器场景"
      >
        <div className="hero-actions">
          <span className="ghost-pill">实时定位在线</span>
          <span className="ghost-pill">电子围栏已开启</span>
        </div>
      </PageHero>
      <section className="section compact">
        <div className="container product-showcase">
          <div className="product-buy-panel">
            <div>
              <span className="eyebrow">Product Detail</span>
              <h2>易趣宠定位器</h2>
              <p>当前重点展示产品能力和预约咨询入口。真实售价、套餐和硬件参数以上线版本为准。</p>
            </div>
            <div className="buy-actions">
              <a className="pill" href="#locator-lead">获取上新提醒</a>
              <a className="ghost-pill" href="#locator-faq">查看常见问题</a>
            </div>
          </div>
          <div className="spec-grid">
            {productSpecs.map(([label, value]) => (
              <article className="card feature-card" key={label}>
                <span className="tag">{label}</span>
                <h3 style={{ marginTop: 14 }}>{value}</h3>
              </article>
            ))}
          </div>
          <div className="locator-stage">
            <div className="locator-photo"><Image src="/assets/pets/hero/hero-dog-safety-walk-001.jpg" alt="户外安全遛狗轨迹场景" width={1200} height={760} /></div>
            <div className="map-panel">
              <span className="tag">路线记录</span>
              <h3>家附近 1.2 公里安全活动圈</h3>
              <p>用简洁路线、安全区域和定位点表现外出守护体验；真实轨迹数据由后续硬件和 App 接入。</p>
              <div className="map-path" aria-hidden="true"><span /><span /><span /></div>
            </div>
          </div>
          <div className="grid cols-4">
            {tracker.features.map((feature) => (
              <article className="card feature-card" key={feature}>
                <span className="tag">定位器能力</span>
                <h3 style={{ marginTop: 14 }}>{feature}</h3>
                <p>{tracker.scenarios.join("、")}等场景都能通过定位器形成安全记录。</p>
              </article>
            ))}
          </div>
          <div className="grid cols-3">
            <ProductCard product={tracker} />
            {["日常遛狗", "宠物寄养", "走失协寻"].map((scene) => (
              <article className="card feature-card" key={scene}>
                <span className="tag">场景</span>
                <h3 style={{ marginTop: 14 }}>{scene}</h3>
                <p>通过家庭共享、轨迹复盘和协寻模板，把突发风险前置到日常管理里。</p>
              </article>
            ))}
          </div>
          <div className="faq-grid" id="locator-faq">
            {[
              "定位器适合猫还是狗？",
              "没电会提醒吗？",
              "可以看历史轨迹吗？",
              "家人能不能一起看？",
              "定位器是否替代牵引绳？",
              "电子围栏会限制宠物活动吗？"
            ].map((question) => (
              <article className="card feature-card" key={question}>
                <h3>{question}</h3>
                <p>不会替代线下安全措施。定位器提供提醒和记录，真正的安全仍来自牵引、训练和及时响应。</p>
              </article>
            ))}
          </div>
          <div id="locator-lead" className="card feature-card">
            <span className="eyebrow">上新提醒</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>想了解定位器上线、套餐和试用计划？</h2>
            <p>当前不展示虚构价格和库存。后续接入真实后端后，可在这里连接预约、库存、售后和门店咨询。</p>
            <a className="pill" href="/partners">联系合作与咨询</a>
          </div>
        </div>
      </section>
    </>
  );
}
