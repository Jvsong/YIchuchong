"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        setError("账号或密码错误");
        return;
      }

      window.localStorage.setItem("yqc-admin-demo", "signed-in");
      router.replace(searchParams.get("from") ?? "/admin");
      router.refresh();
    });
  }

  return (
    <form className="admin-login-card" onSubmit={handleSubmit}>
      <span className="eyebrow">Content Studio</span>
      <h1>易趣宠内容管理平台</h1>
      <p>用于管理宠物资讯、百科、小科普、产品内容和素材库。</p>
      <label className="field">
        <span>管理员账号</span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          spellCheck={false}
          placeholder="输入管理员账号…"
        />
      </label>
      <label className="field">
        <span>管理员密码</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="输入管理员密码…"
        />
      </label>
      {error ? <p className="form-error" aria-live="polite">{error}</p> : null}
      <button className="pill admin-login-submit" type="submit" disabled={isPending}>
        <LogIn size={18} aria-hidden="true" />
        {isPending ? "登录中…" : "登录管理后台"}
      </button>
    </form>
  );
}
