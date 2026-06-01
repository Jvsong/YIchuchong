import { PageHero } from "@/components/PageHero";
import { WikiExplorer } from "@/components/WikiExplorer";
import { getBreedList, getPageHeroImages } from "@/services/content";

export default function WikiPage() {
  const breeds = getBreedList();
  const heroImages = getPageHeroImages();
  return (
    <>
      <PageHero
        eyebrow="宠物百科"
        title="狗狗、猫咪与小宠的养护知识库"
        description="覆盖狗狗、猫咪和小宠的差异化养护信息，支持分类、搜索、标签筛选和详情页，方便后续接入真实宠物数据库。"
        image={heroImages.wiki}
        imageAlt="猫咪百科图片"
      />
      <section className="section compact">
        <div className="container">
          <WikiExplorer breeds={breeds} />
        </div>
      </section>
    </>
  );
}
