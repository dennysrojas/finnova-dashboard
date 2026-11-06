import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FINNOVA · FashionClub Executive Suite',
  description: 'Plataforma Analítica Ejecutiva y Soporte a la Decisión para el equipo Finnova (FashionClub - Simulación Corbatul)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full bg-pastel-50 text-obsidian-900 font-sans antialiased overflow-x-hidden selection:bg-pastel-200 selection:text-obsidian-950">
        {children}
      </body>
    </html>
  );
}
