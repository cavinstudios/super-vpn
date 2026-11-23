import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Super VPN — Local preview",
  description:
    "Explore a VPN-style dashboard with mock connection controls. This preview does not route or encrypt network traffic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
