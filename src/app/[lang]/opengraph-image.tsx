import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/get-dictionary";

export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await loadDictionary(hasLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0a",
        color: "#ededed",
      }}
    >
      <div style={{ fontSize: 28, color: "#9a9a9a", letterSpacing: 2 }}>
        {dict.hero.eyebrow.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: "#9a9a9a", maxWidth: 900, lineHeight: 1.35 }}>
          {dict.hero.title}
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#6b9cff" }}>ozdemirmustafa.com</div>
    </div>,
    size,
  );
}
