import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building,
  Car,
  FileText,
  Globe,
  MapPin,
  Plane,
} from "lucide-react";
import { useEffect } from "react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Access to all domestic and international airlines with exclusive B2B fares. Real-time availability, instant e-tickets, group bookings, and corporate fare negotiation all in one platform.",
    features: [
      "All major airlines",
      "Group booking support",
      "Instant e-ticket",
      "Best fare guarantee",
    ],
  },
  {
    icon: Building,
    title: "Hotel Booking",
    desc: "Over 5,000 hotels worldwide with pre-negotiated rates unavailable to the public. From budget properties to 5-star luxury resorts, find the perfect accommodation for every traveler.",
    features: [
      "5000+ properties",
      "Instant confirmation",
      "Free cancellation options",
      "Exclusive B2B rates",
    ],
  },
  {
    icon: MapPin,
    title: "Domestic Packages",
    desc: "Comprehensive India tour packages covering 100+ destinations including Rajasthan, Kerala, Himachal Pradesh, and the Northeast. Fully customizable with flexible itineraries.",
    features: [
      "100+ destinations",
      "Customizable itineraries",
      "Guide included",
      "All-inclusive options",
    ],
  },
  {
    icon: Globe,
    title: "International Packages",
    desc: "Ready-to-sell international tour packages for 50+ countries. Fully escorted group tours and FIT packages with complete documentation support and on-ground assistance.",
    features: [
      "50+ countries",
      "Group & FIT options",
      "Visa support included",
      "24/7 on-ground help",
    ],
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "Expert visa processing for 40+ countries with high approval rates. Complete documentation guidance, application tracking, and priority appointment booking services.",
    features: [
      "40+ countries",
      "Fast processing",
      "Document guidance",
      "High approval rate",
    ],
  },
  {
    icon: Car,
    title: "Transport Services",
    desc: "Complete ground transportation solutions including airport transfers, city tours, intercity travel, and luxury vehicle rentals. All vehicles GPS-tracked and drivers verified.",
    features: [
      "Airport transfers",
      "City & outstation",
      "Luxury vehicles",
      "GPS-tracked fleet",
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Register",
    desc: "Sign up as a partner in minutes with basic business details",
  },
  {
    num: "02",
    title: "Get Access",
    desc: "Instant access to our B2B portal, rates, and inventory",
  },
  {
    num: "03",
    title: "Book",
    desc: "Search, compare and book flights, hotels, and packages",
  },
  {
    num: "04",
    title: "Earn",
    desc: "Earn competitive commissions on every successful booking",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services — Travel N World";
  }, []);
  useScrollReveal();

  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="Everything a travel agent needs to run a successful business — under one roof"
        breadcrumb="Services"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-3xl border border-border shadow-card p-8 group card-hover`}
              >
                <div className="w-16 h-16 bg-royal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-[#1E40AF] rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="inline-block px-4 py-1.5 bg-royal-200 text-primary rounded-full text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`reveal reveal-delay-${i + 1} relative`}
              >
                <div className="bg-white rounded-3xl p-7 border border-border shadow-card text-center">
                  <div className="font-bold text-5xl text-royal-200 mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-light text-white font-semibold h-14 px-10 rounded-2xl border-0 shadow-blue"
            >
              <Link to="/partner">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
