import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Readiness check — Super VPN",
  robots: { index: false, follow: false },
};

export default function ReadinessPage() {
  return (
    <main className="health-page">
      <p className="eyebrow">Super VPN local preview</p>
      <h1>Readiness check</h1>
      <p>status: ready</p>
    </main>
  );
}
