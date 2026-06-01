import { ProductCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getProducts } from "@/services/content";

export default function DevicesPage() {
  const products = getProducts();
  return (
    <>
      <PageHero
        eyebrow="智能设备生态"
        title="从定位器延展到喂养、饮水与看护"
        description="自动出粮机、宠物监控器、远程喂猫、智能饮水机和寄养监控设备都以生态规划方式呈现。"
        image="/assets/pets/device-scenes/device-feeder-home-001.jpg"
        imageAlt="智能宠物设备场景"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </>
  );
}
