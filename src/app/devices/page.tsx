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
          <div className="card feature-card">
            <span className="eyebrow">设备联动场景</span>
            <h2 style={{ fontSize: "2.4rem", marginTop: 14 }}>定位器 + 喂养 + 看护 + 养宠建议报告</h2>
            <p>第四版只展示生态规划，不假装未来设备已经真实上线。后续接入 Spring Boot 后，可由设备状态、宠物档案和服务记录共同生成联动建议。</p>
          </div>
        </div>
      </section>
    </>
  );
}
