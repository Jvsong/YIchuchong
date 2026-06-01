import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
        </div>
        <div className="page-hero-media">
          <Image src={image} alt={imageAlt} width={900} height={620} priority />
        </div>
      </div>
    </section>
  );
}
