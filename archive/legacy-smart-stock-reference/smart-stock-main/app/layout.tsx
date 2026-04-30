import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Negocio Autónomo",
  description: "Capa operativa para negocios locales de servicios"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
