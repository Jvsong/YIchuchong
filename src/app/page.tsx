import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, Battery, Bell, MapPin, Route, ShieldCheck, Users } from "lucide-react";
import { AiCareDemo } from "@/components/AiCareDemo";
import { BreedCard, CollectionCard, EcoImageCard, NewsCard, ProductCard, ServiceCard } from "@/components/Cards";
import { getBreedList, getCollectionCards, getEcoCategories, getFunModules, getHeroImages, getHomeConfig, getNewsList, getProducts, getServices, getSmartEcosystem } from "@/services/content";

export default function HomePage() {
  const home = getHomeConfig();
  const products = getProducts();
  const newsItems = getNewsList();
  const breeds = getBreedList();
  const services = getServices();
  const heroImages = getHeroImages();
  const ecoCategories = getEcoCategories();
  const collectionCards = getCollectionCards();
  const funModules = getFunModules();
  const smartEcosystem = getSmartEcosystem();
  const tracker = products[0];
  const trackerFeatures = [
    { icon: MapPin, label: "实时定位", text: "外出、寄养和家庭共享场景都能快速确认位置。" },
    { icon: Route, label: "历史轨迹", text: "按时间回看行动路线，帮助复盘走失风险点。" },
    { icon: ShieldCheck, label: "电子围栏", text: "离开安全区域时第一时间提醒主人。" },
    { icon: Battery, label: "低电量提醒", text: "把设备维护变成日常安全习惯。" },
    { icon: Bell, label: "丢宠协寻", text: "预留照片、地点和联系方式的协寻入口。" },
    { icon: Users, label: "家庭共享", text: "多人共同守护宠物，不靠单一主人记忆。" },
    { icon: Activity, label: "活动报告", text: "用运动时长和趋势观察宠物状态。" }
  ];

  return (
    <>
      <section className="hero brand-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><MapPin size={16} aria-hidden="true" /> 宠物定位器 + 智能养宠生态</span>
            <h1>{home.heroTitle}</h1>
            <p className="lead">
              {home.heroSubtitle}
            </p>
            <div className="hero-actions">
              <Link className="pill" href="/locator">{home.primaryAction} <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="ghost-pill" href="/devices">{home.secondaryAction}</Link>
            </div>
            <div className="hero-proof">
              <span>实时定位</span>
              <span>电子围栏</span>
              <span>家庭共享</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="宠物与智能设备场景">
            <div className="photo-stack">
              <div className="hero-photo main">
                <Image src={heroImages[0]} alt="明亮家居中的宠物生活场景" width={900} height={1100} priority />
              </div>
              <div className="hero-photo side">
                <Image src={heroImages[1]} alt="户外佩戴定位器的狗狗" width={620} height={520} />
              </div>
              <div className="floating-panel">
                <span className="tag">安全状态</span>
                <h3 style={{ marginTop: 12 }}>外出路线已记录</h3>
                <p style={{ marginBottom: 0 }}>家庭成员共享位置，今日活动报告已更新。</p>
                <div className="signal-row">
                  <span>实时在线</span>
                  <span className="status-dot" aria-hidden="true" />
                </div>
              </div>
              <div className="phone-card">
                <span className="tag">今日运动</span>
                <strong>42 分钟</strong>
                <p>安全围栏已开启，宠物状态良好。</p>
                <div className="route-line" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Collection</span>
              <h2>围绕安全、喂养与看护的产品入口</h2>
            </div>
            <p>先让用户理解每个功能解决什么问题，再进入对应产品、内容或服务页面。</p>
          </div>
          <div className="collection-grid">
            {collectionCards.map((item) => <CollectionCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>

      <section className="section product-stories-section">
        <div className="container">
          <div className="product-story">
            <div className="product-story-media">
              <Image src="/assets/pets/hero/hero-dog-safety-walk-001.jpg" alt="户外遛狗定位器安全场景" width={1080} height={760} />
            </div>
            <div className="product-story-copy">
              <span className="eyebrow">易趣宠定位器</span>
              <h2>把走失预防，放进每一次散步</h2>
              <p>实时定位、电子围栏、历史轨迹、低电量提醒和家庭共享，面向小区散步、公园活动、寄养和走失协寻等真实场景。</p>
              <Link className="pill" href="/locator">查看定位器 <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="product-story reverse">
            <div className="product-story-media">
              <Image src="/assets/pets/device-scenes/device-smart-home-001.jpg" alt="居家智能宠物设备生态" width={1080} height={760} />
            </div>
            <div className="product-story-copy">
              <span className="eyebrow">智能设备生态</span>
              <h2>喂食、饮水、看护，连接成日常照护网络</h2>
              <p>自动出粮机、智能饮水机、宠物监控器与寄养监控设备以生态规划方式呈现，为后续真实设备接入预留结构。</p>
              <Link className="ghost-pill" href="/devices">查看智能设备</Link>
            </div>
          </div>
          <div className="product-story">
            <div className="product-story-media">
              <Image src="/assets/pets/lifestyle/pet-owner-phone-001.jpg" alt="主人查看宠物养宠建议" width={1080} height={760} />
            </div>
            <div className="product-story-copy">
              <span className="eyebrow">智能养宠建议</span>
              <h2>用日常数据，生成更可靠的养宠计划</h2>
              <p>根据宠物类型、品种、年龄、体型、天气、健康状态和当前场景，生成运动、喂食饮水、健康观察和定位器使用建议。</p>
              <Link className="ghost-pill" href="/ai-care">生成养宠建议</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">生态分类</span>
              <h2>从安全入口，延展到完整养宠生活</h2>
            </div>
            <p>前台保持品牌官网表达，数据仍通过 service 层读取，方便后续替换为 Spring Boot + MySQL。</p>
          </div>
          <div className="grid cols-3 reveal-grid">
            {ecoCategories.map((item) => <EcoImageCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>

      <section className="section smart-home-section">
        <Image className="section-bg-image" src="/assets/pets/hero/hero-cat-smart-home-001.jpg" alt="" fill sizes="100vw" />
        <div className="container smart-home-panel">
          <div className="section-head">
            <div>
              <span className="eyebrow">Smart Pet Life</span>
              <h2>易趣宠智能宠物生态</h2>
            </div>
            <p>以宠物定位器为核心，连接定位安全、智能喂养、远程看护、养宠建议、宠物内容与寄养代溜服务，让每一次外出、每一次喂养、每一次陪伴都被更好记录和守护。</p>
          </div>
          <div className="ecosystem-chain">
            {smartEcosystem.map((item, index) => (
              <Link className="chain-card" href={item.href} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-showcase-section">
        <div className="container product-showcase">
          <div className="section-head product-copy">
            <div>
              <span className="eyebrow">核心产品</span>
              <h2>{tracker.name}</h2>
            </div>
            <p>围绕实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻、家庭共享与活动报告构建安全感。</p>
          </div>
          <div className="locator-stage">
            <div className="locator-photo">
              <Image src="/assets/pets/hero/hero-dog-safety-walk-001.jpg" alt="户外遛狗定位器安全场景" width={960} height={720} />
            </div>
            <div className="map-panel">
              <span className="tag">安全围栏</span>
              <h3>家附近 1.2 公里活动圈</h3>
              <p>模拟轨迹、低电量提醒与家庭共享入口，为后续真实设备数据预留。</p>
              <div className="map-path" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="grid cols-4 tracker-feature-grid">
            {trackerFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="card feature-card tracker-mini-card" key={feature.label}>
                  <div className="icon-badge" aria-hidden="true"><Icon size={21} /></div>
                  <h3>{feature.label}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">生态规划 / 即将接入 / 未来能力</span>
              <h2>未来智能设备展示</h2>
            </div>
            <p>自动出粮机、宠物监控器、远程喂猫、智能饮水机与寄养监控设备会作为生态规划逐步接入。</p>
          </div>
          <div className="grid cols-3 product-matrix">
            {products.slice(1).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">宠物内容</span>
              <h2>热点、百科与安全科普</h2>
            </div>
            <Link className="ghost-pill" href="/news">查看更多资讯</Link>
          </div>
          <div className="grid cols-3 editorial-grid">
            {newsItems.slice(0, 6).map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">养宠建议</span>
              <h2>用日常数据生成结构化建议</h2>
            </div>
            <p>根据宠物类型、品种、年龄、体型、健康状态、天气和主人可用时间生成运动、喂养、设备和任务建议。</p>
          </div>
          <AiCareDemo />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">趣味互动</span>
              <h2>把安全习惯变成每日陪伴</h2>
            </div>
            <Link className="ghost-pill" href="/fun">进入互动中心</Link>
          </div>
          <div className="grid cols-4">
            {funModules.map((item) => (
              <article className="card feature-card" key={item.title}>
                <span className="tag">{item.value}</span>
                <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">宠物服务入口</span>
              <h2>寄养监控、宠物代溜与门店合作</h2>
            </div>
            <Link className="ghost-pill" href="/partners">合作入驻</Link>
          </div>
          <div className="grid cols-4">
            {services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">热门百科</span>
              <h2>认识不同宠物的生活需求</h2>
            </div>
            <Link className="ghost-pill" href="/wiki">打开宠物百科</Link>
          </div>
          <div className="grid cols-4">
            {breeds.slice(0, 8).map((breed) => <BreedCard key={breed.slug} breed={breed} />)}
          </div>
        </div>
      </section>
    </>
  );
}
