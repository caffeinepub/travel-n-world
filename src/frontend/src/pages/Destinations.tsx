import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import { Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const destinations = [
  {
    name: "Dubai",
    country: "UAE",
    img: "/assets/generated/dest-dubai.dim_600x400.jpg",
    tag: "Most Popular",
    category: "asia",
    desc: "Experience the ultimate luxury in the City of Gold. Iconic Burj Khalifa, desert safaris, world-class shopping, and stunning waterfront views.",
    nights: "4N/5D",
    price: "From ₹45,000",
  },
  {
    name: "Thailand",
    country: "Asia",
    img: "/assets/generated/dest-thailand.dim_600x400.jpg",
    tag: "Best Seller",
    category: "asia",
    desc: "Tropical beaches, ancient temples, vibrant nightlife, and delicious street food. Thailand has something magical for every kind of traveler.",
    nights: "5N/6D",
    price: "From ₹38,000",
  },
  {
    name: "Singapore",
    country: "Asia",
    img: "/assets/generated/dest-singapore.dim_600x400.jpg",
    tag: "Trending",
    category: "asia",
    desc: "The futuristic city-state that blends cultures seamlessly. Gardens by the Bay, Marina Bay Sands, and incredible food courts await.",
    nights: "4N/5D",
    price: "From ₹52,000",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    img: "/assets/generated/dest-maldives.dim_600x400.jpg",
    tag: "Luxury",
    category: "asia",
    desc: "The ultimate luxury escape with overwater villas, crystal-clear lagoons, pristine coral reefs, and absolute seclusion from the world.",
    nights: "3N/4D",
    price: "From ₹80,000",
  },
  {
    name: "Kashmir",
    country: "India",
    img: "/assets/generated/dest-kashmir.dim_600x400.jpg",
    tag: "Domestic",
    category: "domestic",
    desc: "Paradise on Earth. Dal Lake shikaras, snow-capped Himalayan peaks, Mughal gardens, and the warmth of Kashmiri hospitality.",
    nights: "5N/6D",
    price: "From ₹22,000",
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "/assets/generated/dest-bali.dim_600x400.jpg",
    tag: "Exotic",
    category: "asia",
    desc: "The Island of the Gods offers terraced rice paddies, ancient temples, vibrant arts scene, and some of the world's best surf beaches.",
    nights: "5N/6D",
    price: "From ₹42,000",
  },
  {
    name: "Europe",
    country: "Multi-Country",
    img: "/assets/generated/dest-europe.dim_600x400.jpg",
    tag: "Grand Tour",
    category: "europe",
    desc: "From Santorini's blue domes to Paris's Eiffel Tower, Swiss Alps to Venice canals — a European journey is the trip of a lifetime.",
    nights: "10N/11D",
    price: "From ₹1,20,000",
  },
];

type Filter = "all" | "asia" | "europe" | "domestic";

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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-center mb-12 reveal">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <TabsList className="bg-royal-50 p-1 rounded-2xl h-auto gap-1">
                {(["all", "asia", "europe", "domestic"] as Filter[]).map(
                  (f) => (
                    <TabsTrigger
                      key={f}
                      value={f}
                      data-ocid={`destinations.${f}.tab`}
                      className="rounded-xl px-5 py-2.5 text-sm font-medium capitalize data-[state=active]:bg-primary data-[state=active]:text-white"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((dest, i) => (
              <div
                key={dest.name}
                data-ocid={`destinations.card.${i + 1}`}
                className="dest-card reveal bg-white rounded-3xl overflow-hidden border border-border shadow-card card-hover group"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/2" }}
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="dest-img w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-white text-xs font-bold rounded-full bg-[#1E40AF]">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="font-bold text-xl text-white">
                        {dest.name}
                      </div>
                      <div
                        className="flex items-center gap-1 text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        <MapPin className="h-3 w-3" /> {dest.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {dest.nights}
                      </div>
                      <div className="font-semibold text-white text-sm">
                        {dest.price}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {dest.desc}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl border-primary text-primary hover:bg-primary hover:text-white font-medium"
                  >
                    <Link to="/partner">Enquire Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              data-ocid="destinations.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <Globe className="h-12 w-12 mx-auto mb-4 text-royal-200" />
              <p className="text-lg">No destinations in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
