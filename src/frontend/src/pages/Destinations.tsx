import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import { Clock, Globe, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from "react";

const destinations = [
  {
    name: "Dubai",
    country: "UAE",
    img: "/assets/generated/dest-dubai.dim_600x400.jpg",
    tag: "Most Popular",
    tagColor: "bg-[#1E40AF]",
    category: "asia",
    desc: "Experience ultimate luxury in the City of Gold — iconic Burj Khalifa, desert safaris, world-class shopping, and stunning waterfront views.",
    nights: "4N/5D",
    price: "₹45,000",
  },
  {
    name: "Thailand",
    country: "Asia",
    img: "/assets/generated/dest-thailand.dim_600x400.jpg",
    tag: "Best Seller",
    tagColor: "bg-[#E53935]",
    category: "asia",
    desc: "Tropical beaches, ancient temples, vibrant nightlife, and delicious street food. Thailand has something magical for every traveler.",
    nights: "5N/6D",
    price: "₹38,000",
  },
  {
    name: "Singapore",
    country: "Asia",
    img: "/assets/generated/dest-singapore.dim_600x400.jpg",
    tag: "Trending",
    tagColor: "bg-emerald-600",
    category: "asia",
    desc: "The futuristic city-state blending cultures seamlessly. Gardens by the Bay, Marina Bay Sands, and incredible cuisine await.",
    nights: "4N/5D",
    price: "₹52,000",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    img: "/assets/generated/dest-maldives.dim_600x400.jpg",
    tag: "Luxury",
    tagColor: "bg-purple-600",
    category: "asia",
    desc: "The ultimate luxury escape with overwater villas, crystal-clear lagoons, pristine coral reefs, and absolute seclusion.",
    nights: "3N/4D",
    price: "₹80,000",
  },
  {
    name: "Kashmir",
    country: "India",
    img: "/assets/generated/dest-kashmir.dim_600x400.jpg",
    tag: "Domestic",
    tagColor: "bg-orange-500",
    category: "domestic",
    desc: "Paradise on Earth — Dal Lake shikaras, snow-capped Himalayan peaks, Mughal gardens, and warm Kashmiri hospitality.",
    nights: "5N/6D",
    price: "₹22,000",
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "/assets/generated/dest-bali.dim_600x400.jpg",
    tag: "Exotic",
    tagColor: "bg-teal-600",
    category: "asia",
    desc: "The Island of the Gods — terraced rice paddies, ancient temples, vibrant arts scene, and world-class surf beaches.",
    nights: "5N/6D",
    price: "₹42,000",
  },
  {
    name: "Europe",
    country: "Multi-Country",
    img: "/assets/generated/dest-europe.dim_600x400.jpg",
    tag: "Grand Tour",
    tagColor: "bg-[#1E40AF]",
    category: "europe",
    desc: "From Santorini's blue domes to Paris's Eiffel Tower, Swiss Alps to Venice canals — a European journey is the trip of a lifetime.",
    nights: "10N/11D",
    price: "₹1,20,000",
  },
];

type Filter = "all" | "asia" | "europe" | "domestic";

function DestCard({
  dest,
  index,
}: { dest: (typeof destinations)[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      data-ocid={`destinations.card.${index + 1}`}
      className="reveal bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center">
            <Globe className="h-10 w-10 text-blue-400 mb-2" />
            <span className="text-blue-500 text-sm font-medium">
              {dest.name}
            </span>
          </div>
        ) : (
          <img
            src={dest.img}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        )}
        {/* Soft gradient overlay — bottom only, lighter */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
        />
        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 text-white text-xs font-bold rounded-full ${dest.tagColor}`}
          >
            {dest.tag}
          </span>
        </div>
        {/* Name + Location overlay at bottom of image */}
        <div className="absolute bottom-3 left-4">
          <div className="font-bold text-xl text-white drop-shadow">
            {dest.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-white/80 mt-0.5">
            <MapPin className="h-3 w-3" /> {dest.country}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Duration & Price row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            {dest.nights}
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Starting from</div>
            <div className="font-bold text-[#1E40AF] text-base">
              {dest.price}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {dest.desc}
        </p>

        {/* CTA */}
        <Button
          asChild
          className="w-full rounded-xl bg-[#1E40AF] hover:bg-blue-800 active:bg-blue-900 text-white font-semibold h-10 text-sm transition-all duration-300 hover:shadow-md"
        >
          <Link to="/partner">Enquire Now</Link>
        </Button>
      </div>
    </div>
  );
}

export default function Destinations() {
  const [filter, setFilter] = useState<Filter>("all");
  useEffect(() => {
    document.title = "Destinations — Travel N World";
  }, []);
  useScrollReveal();

  const filtered =
    filter === "all"
      ? destinations
      : destinations.filter((d) => d.category === filter);

  return (
    <div>
      <PageHero
        title="Popular Destinations"
        subtitle="Discover handpicked destinations with best-selling packages loved by Indian travelers"
        breadcrumb="Destinations"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex justify-center mb-10 reveal">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <TabsList className="bg-white border border-gray-200 p-1 rounded-2xl h-auto gap-1 shadow-sm">
                {(["all", "asia", "europe", "domestic"] as Filter[]).map(
                  (f) => (
                    <TabsTrigger
                      key={f}
                      value={f}
                      data-ocid={`destinations.${f}.tab`}
                      className="rounded-xl px-5 py-2.5 text-sm font-medium capitalize data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white"
                    >
                      {f === "all"
                        ? "All"
                        : f === "asia"
                          ? "Asia & Middle East"
                          : f === "europe"
                            ? "Europe"
                            : "Domestic India"}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <DestCard key={dest.name} dest={dest} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              data-ocid="destinations.empty_state"
              className="text-center py-20 text-gray-400"
            >
              <Globe className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <p className="text-lg">No destinations in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
