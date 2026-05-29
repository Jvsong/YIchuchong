import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { AiCareDemo } from "@/components/AiCareDemo";
import { BreedCard, EcoCard, NewsCard, ProductCard, ServiceCard } from "@/components/Cards";
import { breeds, ecoCategories, funModules, heroImages, newsItems, products, services } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><MapPin size={16} aria-hidden="true" /> 智能宠物生态第一站</span>
            <h1>易趣宠，让宠物更安全，让养宠更智能</h1>
            <p className="lead">
              从宠物定位器出发，连接智能设备、AI养宠建议、宠物百科、寄养代溜与趣味互动，打造未来宠物生活生态。
            </p>
            <div className="hero-actions">
              <Link className="pill" href="/locator">了解定位器 <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="ghost-pill" href="/devices">探索智能生态</Link>
              <Link className="ghost-pill" href="/ai-care">体验AI养宠助手</Link>
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
                <h3 style={{ marginTop: 12 }}>电子围栏已守护</h3>
                <p style={{ marginBottom: 0 }}>家庭成员共享位置，今日活动报告已更新。</p>
                <div className="signal-row">
                  <span>实时在线</span>
                  <span className="status-dot" aria-hidden="true" />
                </div>
              </div>
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
            <p>第一版聚焦展示型官网与轻量内容管理，为后续设备接入、服务交易和真实定位能力保留结构。</p>
          </div>
          <div className="grid cols-3">
            {ecoCategories.map((item) => <EcoCard key={item.title} {...item} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">核心产品</span>
              <h2>易趣宠宠物定位器</h2>
            </div>
            <p>围绕实时定位、历史轨迹、电子围栏、低电量提醒、丢宠协寻、家庭共享与活动报告构建安全感。</p>
          </div>
          <div className="grid cols-3">
            {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
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
          <div className="grid cols-3">
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
          <div className="grid cols-3">
            {newsItems.slice(0, 6).map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">AI养宠助手 Demo</span>
              <h2>用规则先跑通每日建议体验</h2>
            </div>
            <p>根据宠物类型、品种、年龄、体型、健康状态、天气和主人可用时间生成运动、设备和任务建议。</p>
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
