import { ServiceCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/services/content";

export default function WalkingPage() {
  const services = getServices();
  return (
    <>
      <PageHero
        eyebrow="宠物代溜"
        title="用路线、打卡和记录守住代溜安全"
        description="围绕服务前确认、服务中轨迹和服务后反馈，建立轻量但完整的代溜体验。"
        image="/assets/pets/service-scenes/service-dog-walking-001.jpg"
        imageAlt="宠物代溜服务"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          {services.filter((service) => service.id !== "boarding").map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>
    </>
  );
}
