import { ImageResponse } from "next/og";
import { site } from "./data";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stats = [
  ["6+", "years"],
  ["200M+", "records / day"],
  ["99.9%", "SLA"],
  ["$40K", "saved / yr"],
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0d12",
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(45,212,191,0.22) 0%, rgba(10,13,18,0) 55%)",
          color: "#e8edf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#042f2a",
              background: "linear-gradient(135deg, #5eead4, #eec35b)",
            }}
          >
            PD
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
            <div style={{ fontSize: 24, color: "#5eead4" }}>{`${site.role} · AWS & Databricks`}</div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
          Data platforms that hold up at 200M records a day.
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {stats.map(([v, l]) => (
            <div
              key={l}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 26px",
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.25)",
                background: "rgba(17,22,30,0.8)",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 20, color: "#a9b4c2" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
