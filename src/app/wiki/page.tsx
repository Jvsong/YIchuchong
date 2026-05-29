import { BreedCard } from "@/components/Cards";
import { PageHero } from "@/components/PageHero";
import { breeds } from "@/data/site";

export default function WikiPage() {
  return (
    <>
      <PageHero
        eyebrow="宠物百科"
        title="狗狗、猫咪与小宠的养护知识库"
        description="第一版覆盖狗狗 10 个品种、猫咪 8 个品种和小宠 5 类，为内容平台搭好基础结构。"
        image="/assets/pets/cats/cat-ragdoll-window-001.jpg"
        imageAlt="猫咪百科图片"
      />
      <section className="section compact">
        <div className="container grid cols-4">
          {breeds.map((breed) => <BreedCard key={breed.slug} breed={breed} />)}
        </div>
      </section>
    </>
  );
}
