"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getPageHeroImages, getProducts } from "@/services/content";

export default function DevicesPage() {
  const products = getProducts();
  const heroImages = getPageHeroImages();
  const [category, setCategory] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(products.map((item) => item.category)))], [products]);
  const visible = products.filter((item) => category === "全部" || item.category === category);
  return (
    <>
      <PageHero
        eyebrow="智能设备生态"
        title="从定位器延展到喂养、饮水与看护"
        description="自动出粮机、宠物监控器、远程喂猫、智能饮水机和寄养监控设备都以生态规划方式呈现。"
        image={heroImages.devices}
        imageAlt="智能宠物设备场景"
      />
      <section className="section compact">
        <div className="container product-showcase">
          <div className="catalog-intro">
            <div>
              <span className="eyebrow">Product Lineup</span>
              <h2>按真实养宠场景组织设备，而不是堆规划</h2>
              <p>定位器是当前核心产品，喂食、饮水、看护和寄养监控作为智能生态目录展示。真实上线状态以后端产品数据为准。</p>
            </div>
            <a className="pill" href="/partners">咨询设备合作</a>
          </div>
          <div className="segmented" role="tablist" aria-label="设备分类">
            {categories.map((item) => (
              <button className={category === item ? "active" : ""} key={item} type="button" onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="grid cols-3">
            {visible.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className="device-compare">
            {[
              ["外出安全", "定位器 + 电子围栏 + 家庭共享", "日常遛狗、寄养外出、走失预防"],
              ["居家照护", "喂食器 + 饮水机 + 监控器", "上班、短途出行、多宠家庭"],
              ["门店服务", "寄养监控 + 安全档案 + 服务日报", "寄养、代溜、门店合作"]
            ].map(([title, combo, scene]) => (
              <article className="card feature-card" key={title}>
                <span className="tag">{title}</span>
                <h3 style={{ marginTop: 14 }}>{combo}</h3>
                <p>{scene}</p>
              </article>
            ))}
          </div>
          <div className="card feature-card">
            <span className="eyebrow">设备联动场景</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>定位器 + 喂养 + 看护 + 养宠建议报告</h2>
            <p>当前页面以产品目录和场景解释为主，不虚构已上线能力。后续接入真实设备后，可由设备状态、宠物档案和服务记录共同生成联动建议。</p>
          </div>
        </div>
      </section>
    </>
  );
}
