"use client";

// App Router 在每次路由切换时重挂 template，用它做进场过渡（淡入 + 轻微上移）。
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>;
}
