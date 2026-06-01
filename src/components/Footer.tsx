import Link from "next/link";

const footerGroups = [
  { title: "生态", links: [["宠物定位器", "/locator"], ["智能设备", "/devices"], ["养宠建议", "/ai-care"]] },
  { title: "内容", links: [["宠物资讯", "/news"], ["宠物百科", "/wiki"], ["趣味互动", "/fun"]] },
  { title: "服务", links: [["宠物寄养", "/boarding"], ["宠物代溜", "/walking"], ["合作入驻", "/partners"]] }
];

export function Footer() {
  return (
    <footer className="footer">
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
