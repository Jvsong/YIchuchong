import { PageHero } from "@/components/PageHero";

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="合作入驻"
        title="面向门店、寄养与代溜服务方的生态入口"
        description="第一版提供合作展示和内容管理能力，后续可扩展资质审核、服务排期和线索分发。"
        image="/assets/pets/service-scenes/service-store-front-001.jpg"
        imageAlt="宠物门店合作"
      />
      <section className="section compact">
        <div className="container">
          <form className="card feature-card" aria-label="合作入驻表单">
            <div className="form-grid">
              <label className="field"><span>机构名称</span><input name="company" autoComplete="organization" placeholder="例：易趣宠友好门店…" /></label>
              <label className="field"><span>联系人</span><input name="contact" autoComplete="name" placeholder="例：王女士…" /></label>
              <label className="field"><span>联系电话</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="例：13800000000…" /></label>
              <label className="field"><span>合作类型</span><select name="type" autoComplete="off"><option>宠物寄养</option><option>宠物代溜</option><option>门店合作</option><option>设备场景合作</option></select></label>
            </div>
            <div className="button-row"><button className="pill" type="button">提交合作意向</button></div>
          </form>
        </div>
      </section>
    </>
  );
}
