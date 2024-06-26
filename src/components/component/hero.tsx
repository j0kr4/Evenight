import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative w-full h-[40vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/placeholder.svg?height=800&width=1920")',
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 text-center space-y-6 px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Découvrez notre prochain événement
        </h1>
        <p className="text-lg text-white md:text-xl">
          Ne manquez pas cette occasion unique de vous joindre à nous pour une
          expérience inoubliable.
        </p>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          En savoir plus
        </Link>
      </div>
    </section>
  );
}
