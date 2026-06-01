import Image from "next/image";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <section className="admin-login-page">
      <div className="admin-login-shell">
        <div className="admin-login-visual">
          <Image
            src="/assets/pets/hero/hero-pet-owner-dog-001.jpg"
            alt="明亮的宠物生活场景"
            width={780}
            height={980}
            priority
          />
          <div className="admin-login-note">
            <span className="tag">本地演示登录</span>
            <p>生产环境需替换为 Spring Boot 接口、密码哈希和 JWT 或 Session 鉴权。</p>
          </div>
        </div>
        <Suspense fallback={<div className="admin-login-card">登录模块加载中…</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </section>
  );
}
