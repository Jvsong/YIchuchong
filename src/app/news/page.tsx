import { NewsExplorer } from "@/components/NewsExplorer";
import { PageHero } from "@/components/PageHero";
import { getPageHeroImages } from "@/services/content";
import { getNewsList } from "@/lib/serverData";

export const dynamic = 'force-dynamic';

export default function NewsPage() {
  const newsItems = getNewsList();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="宠物资讯"
        title="今日宠物热点与智能养宠科普"
        description="覆盖新手养宠、走失预防、智能设备、寄养注意和服务安全。"
        image={heroImages.news}
        imageAlt="主人查看宠物资讯"
      />
      <section className="section compact">
        <div className="container">
          <NewsExplorer items={newsItems} />
        </div>
      </section>
    </>
  );
}
