"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export function ImageInput({ value, onChange }: { value: string; onChange: (path: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { path?: string; message?: string };
      if (!res.ok || !data.path) throw new Error(data.message ?? "上传失败");
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "上传失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="image-input">
      <div className="image-input-preview">
        {value ? (
          <Image src={value} alt="预览" width={120} height={84} />
        ) : (
          <span className="image-input-empty">无图片</span>
        )}
      </div>
      <div className="image-input-controls">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="/assets/... 或点击上传"
        />
        <button type="button" className="ghost-pill" onClick={() => inputRef.current?.click()} disabled={busy}>
          <ImagePlus size={15} aria-hidden="true" /> {busy ? "上传中…" : "上传"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
            event.target.value = "";
          }}
        />
      </div>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
