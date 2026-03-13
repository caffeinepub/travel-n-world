interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative pt-10 pb-12 md:pt-14 md:pb-16 blue-gradient overflow-hidden">
      {/* Geometric decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-white opacity-30" />
        <div
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
      </div>
      <div className="container-custom relative z-10 text-center">
        {breadcrumb && (
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-5"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {breadcrumb}
          </span>
        )}
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
