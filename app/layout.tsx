import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Một bức thư nhỏ gửi em",
  description: "Một món quà nhỏ từ Dương Đỏ gửi đến em bé của anh.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
