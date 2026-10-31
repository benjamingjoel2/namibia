import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Not found · Namib Light", robots: { index: false } };

/** Shown for URLs that match no page in any language (each language's own 404 handles missing slugs). */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <main id="main" className="gutter flex min-h-[80vh] flex-col justify-center py-24">
          <p className="label">404</p>
          <h1 className="statement mt-4 text-[2.5rem]">Off the map</h1>
          <p className="mt-4 max-w-xl">This page isn&rsquo;t here. Even the best road books have gaps.</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" lang="en" className="underline underline-offset-4">Back to the start</Link>
            <Link href="/fr" lang="fr" className="underline underline-offset-4">Retour à l’accueil</Link>
            <Link href="/de" lang="de" className="underline underline-offset-4">Zur Startseite</Link>
            <Link href="/es" lang="es" className="underline underline-offset-4">Volver al inicio</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
