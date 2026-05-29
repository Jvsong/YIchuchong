import { NewsCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { newsItems } from "@/data/site";

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="宠物资讯"
        title="今日宠物热点与智能养宠科普"
        description="覆盖新手养宠、走失预防、智能设备、寄养注意和服务安全。"
        image="/assets/pets/lifestyle/pet-owner-phone-001.jpg"
        imageAlt="主人查看宠物资讯"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          {newsItems.map((item) => <NewsCard key={item.id} item={item} />)}
        </div>
      </section>
    </>
  );
}
