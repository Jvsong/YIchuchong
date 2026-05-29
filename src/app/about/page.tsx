import { PageHero } from "@/components/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="关于易趣宠"
        title="以宠物安全为起点，构建未来养宠生态"
        description="易趣宠第一版先完成品牌展示、内容框架、轻量后台和 AI 规则 Demo，为真实设备、服务和内容运营打基础。"
        image="/assets/pets/lifestyle/pet-family-bright-001.jpg"
        imageAlt="家庭宠物生活"
      />
      <section className="section compact">
        <div className="container grid cols-3">
          <article className="card feature-card"><h3>品牌定位</h3><p>智能宠物生态平台，以宠物定位器为核心入口。</p></article>
          <article className="card feature-card" id="privacy"><h3>隐私政策</h3><p>第一版不采集真实支付、真实定位和真实设备控制数据。</p></article>
          <article className="card feature-card" id="terms"><h3>用户协议</h3><p>当前内容为展示与本地 Demo，后续接入真实服务时再完善协议条款。</p></article>
        </div>
      </section>
    </>
  );
}
