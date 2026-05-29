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
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5.4rem)", marginTop: 18 }}>{title}</h1>
          <p className="lead">{description}</p>
        </div>
        <Image src={image} alt={imageAlt} width={900} height={620} priority />
      </div>
    </section>
  );
}
