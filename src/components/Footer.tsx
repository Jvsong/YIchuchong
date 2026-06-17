import Link from "next/link";
import { Headphones, LockKeyhole, RotateCcw, ShieldCheck } from "lucide-react";

const footerGroups = [
  { title: "生态", links: [["宠物定位器", "/locator"], ["智能设备", "/devices"], ["养宠建议", "/ai-care"]] },
  { title: "内容", links: [["宠物资讯", "/news"], ["宠物百科", "/wiki"], ["趣味互动", "/fun"]] },
  { title: "服务", links: [["宠物寄养", "/boarding"], ["宠物代溜", "/walking"], ["合作入驻", "/partners"]] }
];

const servicePromises = [
  { icon: ShieldCheck, title: "安全优先", text: "定位器、围栏和家庭共享围绕宠物安全设计。" },
  { icon: Headphones, title: "服务支持", text: "设备咨询、服务预约和内容反馈集中响应。" },
  { icon: RotateCcw, title: "灵活服务", text: "寄养、代溜、门店合作按场景逐步接入。" },
  { icon: LockKeyhole, title: "隐私保护", text: "真实业务将采用权限控制和安全的数据存储策略。" }
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-service-strip">
        {servicePromises.map((item) => {
          const Icon = item.icon;
          return (
            <article className="footer-service" key={item.title}>
              <Icon size={22} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="container footer-newsletter">
        <div>
          <span className="eyebrow">YiQu Pet Club</span>
          <h2>获取定位器、智能设备和养宠建议更新</h2>
          <p>订阅后可收到产品上新、服务开放和养宠内容更新。当前不会发送营销邮件。</p>
        </div>
        <form className="newsletter-form">
          <label className="field">
            <span>邮箱</span>
            <input type="email" placeholder="your@email.com" />
          </label>
          <button className="pill" type="button">订阅更新</button>
        </form>
      </div>
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{ color: "white" }}>
            <span className="brand-emblem" aria-hidden="true">趣</span>
            <span className="brand-text">易趣宠</span>
          </div>
          <p style={{ marginTop: 16 }}>从宠物定位器出发，连接安全、智能设备、日常建议、内容与服务。</p>
          <p>联系我们：hello@yiquchong.example</p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 style={{ color: "white" }}>{group.title}</h3>
            {group.links.map(([label, href]) => (
              <p key={href}>
                <Link href={href}>{label}</Link>
              </p>
            ))}
          </div>
        ))}
        <div>
          <h3 style={{ color: "white" }}>条款</h3>
          <p><Link href="/about">关于易趣宠</Link></p>
          <p><Link href="/partners">合作入驻</Link></p>
          <p><Link href="/about#privacy">隐私政策</Link></p>
          <p><Link href="/about#terms">用户协议</Link></p>
          <p><Link href="/admin/login">内容管理</Link></p>
        </div>
      </div>
    </footer>
  );
}
