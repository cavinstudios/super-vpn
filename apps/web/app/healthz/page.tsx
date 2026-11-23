import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Health check — Super VPN",
  robots: { index: false, follow: false },
};

export default function HealthPage() {
  return (
    <main className="health-page">
      <p className="eyebrow">Super VPN local preview</p>
      <h1>Health check</h1>
      <p>status: ok</p>
    </main>
  );
}
