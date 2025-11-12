import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background-2 px-6 text-center">
      <div className="max-w-lg space-y-8">
        <p className="text-7xl font-black uppercase tracking-[0.35em] text-primary sm:text-8xl">
          404
        </p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          The cake you&apos;re looking for might have been devoured or never
          baked. Let&apos;s take you back to safer treats.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
