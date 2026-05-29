import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FunFactPopup } from "@/components/FunFactPopup";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "易趣宠 Web 生态平台",
  description: "以宠物定位器为核心的智能宠物生态平台"
};

export const viewport: Viewport = {
  themeColor: "#F7FAF9"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main">
          跳到主要内容
        </a>
        <div className="site-shell">
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FunFactPopup />
        </div>
      </body>
    </html>
  );
}
