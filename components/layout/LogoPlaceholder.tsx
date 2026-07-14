import Link from "next/link";

export function LogoPlaceholder() {
  return (
    <Link
      href="/"
      className="flex h-10 w-40 items-center justify-center border border-brand-red bg-white text-xs font-extrabold uppercase tracking-wide text-brand-red"
      aria-label="Turan Arıcan ana sayfa"
    >
      Logo Alanı
    </Link>
  );
}

