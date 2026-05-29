import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/site";

export default function BoardingPage() {
  return (
    <>
      <PageHero
        eyebrow="宠物寄养"
        title="让寄养服务更透明、更安心"
        description="展示寄养环境、服务记录与未来寄养监控方案，帮助主人建立信任。"
        image="/assets/pets/service-scenes/service-boarding-room-001.jpg"
        imageAlt="宠物寄养空间"
      />
      <section className="section compact">
        <div className="container grid cols-4">
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>
    </>
  );
}
