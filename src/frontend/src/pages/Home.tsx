import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSubmitPartnerRegistration,
  useSubscribeNewsletter,
} from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import {
  Building,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Globe2,
  Headphones,
  Loader2,
  MapPin,
  Plane,
  ShieldCheck,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Domestic & international flights with best B2B fares and instant confirmation.",
  },
  {
    icon: Building,
    title: "Hotel Booking",
    desc: "5000+ hotels worldwide with negotiated rates exclusively for travel agents.",
  },
  {
    icon: MapPin,
    title: "Domestic Packages",
    desc: "Curated India tour packages covering top 100+ destinations with customization.",
  },
  {
    icon: Globe,
    title: "International Packages",
    desc: "Ready-to-sell international packages for 50+ countries with full support.",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "Expert visa processing services for 40+ countries with high approval rates.",
  },
  {
    icon: Car,
    title: "Transport Services",
    desc: "Airport transfers, car rentals, and sightseeing cabs at wholesale rates.",
  },
];

const whyChooseUs = [
  {
    icon: Tag,
    title: "Best B2B Rates",
    desc: "Exclusive wholesale pricing unavailable to the public",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Real-time confirmations in seconds, not hours",
  },
  {
    icon: Globe2,
    title: "Global Destinations",
    desc: "Access 50+ countries and 5000+ hotels worldwide",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated partner support any time you need us",
  },
  {
    icon: Users,
    title: "Trusted Network",
    desc: "500+ verified travel agencies in our partner network",
  },
];

const destinations = [
  {
    name: "Dubai",
    country: "UAE",
    img: "/assets/generated/dest-dubai.dim_600x400.jpg",
    tag: "Most Popular",
  },
  {
    name: "Thailand",
    country: "Asia",
    img: "/assets/generated/dest-thailand.dim_600x400.jpg",
    tag: "Best Seller",
  },
  {
    name: "Singapore",
    country: "Asia",
    img: "/assets/generated/dest-singapore.dim_600x400.jpg",
    tag: "Trending",
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    img: "/assets/generated/dest-maldives.dim_600x400.jpg",
    tag: "Luxury",
  },
  {
    name: "Kashmir",
    country: "India",
    img: "/assets/generated/dest-kashmir.dim_600x400.jpg",
    tag: "Domestic",
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "/assets/generated/dest-bali.dim_600x400.jpg",
    tag: "Exotic",
  },
  {
    name: "Europe",
    country: "Multi-Country",
    img: "/assets/generated/dest-europe.dim_600x400.jpg",
    tag: "Grand Tour",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    city: "Mumbai",
    role: "Tour Operator",
    quote:
      "Travel N World has transformed our business. The B2B rates are unbeatable and the platform is incredibly easy to use. Our bookings have grown by 60% in just 6 months.",
    rating: 5,
    initials: "RK",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    role: "Travel Agency Owner",
    quote:
      "The support team is phenomenal. They're available round the clock and always resolve issues within minutes. Best B2B platform for Indian travel agents, hands down.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Mohammed Farhan",
    city: "Hyderabad",
    role: "Corporate Travel Manager",
    quote:
      "We handle over 200 corporate travel bookings monthly. Travel N World's instant confirmation and competitive pricing has made us the go-to agency for our clients.",
    rating: 5,
    initials: "MF",
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    city: "",
    businessType: "",
  });

  const partnerMutation = useSubmitPartnerRegistration();
  const newsletterMutation = useSubscribeNewsletter();

  useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = "Travel N World — India's Trusted B2B Travel Platform";
  }, []);

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.businessType) {
      toast.error("Please select a business type");
      return;
    }
    try {
      await partnerMutation.mutateAsync(partnerForm);
      toast.success(
        "Registration submitted! Our team will contact you within 24 hours.",
      );
      setPartnerForm({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        city: "",
        businessType: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await newsletterMutation.mutateAsync(newsletterEmail);
      toast.success("Subscribed successfully! Welcome to our network.");
      setNewsletterEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/assets/generated/hero-travel.dim_1920x1080.jpg"
          alt="World travel destinations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="container-custom relative z-10 text-center py-32">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8 animate-fade-in"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              Trusted by 500+ Travel Agents Across India
            </span>
          </div>

          <h1
            className="font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 animate-fade-up"
            style={{ textWrap: "balance" }}
          >
            India's Trusted
            <br />
            <span className="gradient-text">B2B Travel Platform</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ color: "rgba(255,255,255,0.8)", animationDelay: "0.2s" }}
          >
            Your gateway to seamless travel solutions for agents across India.
            Best rates. Instant booking. Unbeatable support.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <Button
              asChild
              size="lg"
              data-ocid="hero.primary_button"
              className="bg-primary hover:bg-primary-light text-white font-semibold h-14 px-8 rounded-2xl text-base shadow-blue-lg border-0 transition-all hover:scale-105"
            >
              <Link to="/partner">Join Now — It's Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              className="red-gradient border-0 text-white font-semibold h-14 px-8 rounded-2xl text-base transition-all hover:opacity-90 shadow-red"
            >
              <Link to="/partner">Become a Partner</Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { num: "500+", label: "Travel Partners" },
              { num: "50+", label: "Destinations" },
              { num: "10K+", label: "Bookings Done" },
              { num: "5 Yrs", label: "Experience" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl py-4 px-2 border"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <div className="font-bold text-2xl text-gold">{s.num}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "oklch(50 0.22 27 / 0.08)",
                color: "oklch(50 0.22 27)",
              }}
            >
              What We Offer
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              Our Services
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
              Comprehensive travel solutions designed exclusively for B2B travel
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                data-ocid={`services.card.${i + 1}`}
                className={`card-hover reveal reveal-delay-${(i % 3) + 1} bg-white rounded-2xl p-7 border border-border shadow-card group`}
              >
                <div className="w-14 h-14 bg-royal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-medium">
                  <span>Learn more</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="inline-block px-4 py-1.5 bg-royal-100 text-primary rounded-full text-sm font-semibold mb-4">
              Our Advantage
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${i + 1} text-center p-6 bg-white rounded-2xl border border-border shadow-card card-hover`}
              >
                <div className="w-16 h-16 blue-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "oklch(50 0.22 27 / 0.08)",
                color: "oklch(50 0.22 27)",
              }}
            >
              Explore the World
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
              Handpicked destinations with best-selling packages loved by Indian
              travelers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {destinations.map((dest, i) => (
              <div
                key={dest.name}
                data-ocid={`destinations.card.${i + 1}`}
                className={`dest-card reveal reveal-delay-${(i % 4) + 1} relative rounded-2xl overflow-hidden group cursor-pointer shadow-card`}
                style={{ aspectRatio: "3/2" }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="dest-img absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-white text-xs font-semibold rounded-full bg-gold">
                    {dest.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-bold text-xl text-white">
                    {dest.name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {dest.country}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl px-8 font-semibold"
            >
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding blue-gradient">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              Partner Stories
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white gold-line gold-line-center">
              What Our Partners Say
            </h2>
          </div>

          <div
            data-ocid="testimonials.panel"
            className="max-w-3xl mx-auto reveal"
          >
            <div
              className="relative rounded-3xl p-8 md:p-10 border text-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5]
                  .slice(0, testimonials[currentTestimonial].rating)
                  .map((n) => (
                    <Star key={n} className="h-5 w-5 fill-gold text-gold" />
                  ))}
              </div>

              <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-8 italic">
                “{testimonials[currentTestimonial].quote}”
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 blue-gradient rounded-full flex items-center justify-center font-bold text-white text-sm border-2 border-white/20">
                  {testimonials[currentTestimonial].initials}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {testimonials[currentTestimonial].role} ·{" "}
                    {testimonials[currentTestimonial].city}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((t, i) => (
                  <button
                    type="button"
                    key={t.name}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`rounded-full transition-all ${
                      i === currentTestimonial
                        ? "w-8 h-2.5 bg-gold"
                        : "w-2.5 h-2.5 hover:opacity-70"
                    }`}
                    style={
                      i !== currentTestimonial
                        ? { background: "rgba(255,255,255,0.3)" }
                        : {}
                    }
                  />
                ))}
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -left-4 hidden md:block">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentTestimonial(
                      (p) =>
                        (p - 1 + testimonials.length) % testimonials.length,
                    )
                  }
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden md:block">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentTestimonial((p) => (p + 1) % testimonials.length)
                  }
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER REGISTRATION */}
      <section id="register" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
                style={{
                  background: "oklch(50 0.22 27 / 0.08)",
                  color: "oklch(50 0.22 27)",
                }}
              >
                Join Our Network
              </span>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 gold-line">
                Register as a Partner
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Join 500+ travel agents who are already growing their business
                with Travel N World. Get instant access to exclusive B2B rates,
                real-time inventory, and dedicated support.
              </p>
              <ul className="space-y-4">
                {[
                  "Instant access to wholesale travel rates",
                  "Dedicated account manager assigned",
                  "Real-time booking and confirmation",
                  "24/7 priority partner support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal reveal-delay-2">
              <form
                onSubmit={handlePartnerSubmit}
                className="bg-white rounded-3xl border border-border shadow-blue-lg p-8"
              >
                <h3 className="font-bold text-xl text-foreground mb-6">
                  Partner Registration Form
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="h-p-name"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="h-p-name"
                      required
                      data-ocid="partner.name.input"
                      placeholder="Your full name"
                      value={partnerForm.name}
                      onChange={(e) =>
                        setPartnerForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-p-company"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Company Name *
                    </label>
                    <Input
                      id="h-p-company"
                      required
                      data-ocid="partner.company.input"
                      placeholder="Your company"
                      value={partnerForm.companyName}
                      onChange={(e) =>
                        setPartnerForm((p) => ({
                          ...p,
                          companyName: e.target.value,
                        }))
                      }
                      className="rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-p-phone"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Phone *
                    </label>
                    <Input
                      id="h-p-phone"
                      required
                      type="tel"
                      data-ocid="partner.phone.input"
                      placeholder="+91 XXXXX XXXXX"
                      value={partnerForm.phone}
                      onChange={(e) =>
                        setPartnerForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-p-email"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Email *
                    </label>
                    <Input
                      id="h-p-email"
                      required
                      type="email"
                      data-ocid="partner.email.input"
                      placeholder="your@email.com"
                      value={partnerForm.email}
                      onChange={(e) =>
                        setPartnerForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-p-city"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      City *
                    </label>
                    <Input
                      id="h-p-city"
                      required
                      data-ocid="partner.city.input"
                      placeholder="Your city"
                      value={partnerForm.city}
                      onChange={(e) =>
                        setPartnerForm((p) => ({ ...p, city: e.target.value }))
                      }
                      className="rounded-xl border-border"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-p-btype"
                      className="text-sm font-medium text-foreground mb-1.5 block"
                    >
                      Business Type *
                    </label>
                    <Select
                      value={partnerForm.businessType}
                      onValueChange={(v) =>
                        setPartnerForm((p) => ({ ...p, businessType: v }))
                      }
                    >
                      <SelectTrigger
                        id="h-p-btype"
                        data-ocid="partner.businesstype.select"
                        className="rounded-xl border-border"
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tour Operator">
                          Tour Operator
                        </SelectItem>
                        <SelectItem value="Travel Agent">
                          Travel Agent
                        </SelectItem>
                        <SelectItem value="Corporate Travel">
                          Corporate Travel
                        </SelectItem>
                        <SelectItem value="Online Travel Agency">
                          Online Travel Agency
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  data-ocid="partner.submit_button"
                  disabled={partnerMutation.isPending}
                  className="w-full mt-6 bg-primary hover:bg-primary-light text-white font-semibold h-12 rounded-xl border-0"
                >
                  {partnerMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Register as Partner"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED PARTNERS TEASER */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "oklch(50 0.22 27 / 0.08)",
                color: "oklch(50 0.22 27)",
              }}
            >
              Our Network
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              Verified Travel Partners
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
              Meet 150+ thoroughly vetted travel agencies trusted by thousands
              of travelers across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                name: "Horizon Travels",
                city: "Mumbai",
                category: "International",
                rating: 4.9,
                reviews: 312,
              },
              {
                name: "Royal Journeys",
                city: "Bangalore",
                category: "Luxury",
                rating: 5.0,
                reviews: 189,
              },
              {
                name: "Summit Adventures",
                city: "Pune",
                category: "Adventure",
                rating: 4.8,
                reviews: 156,
              },
              {
                name: "Blue Ocean Trips",
                city: "Chennai",
                category: "Honeymoon",
                rating: 4.7,
                reviews: 234,
              },
              {
                name: "Global Wings Travel",
                city: "Hyderabad",
                category: "International",
                rating: 4.9,
                reviews: 345,
              },
              {
                name: "CityBreak Corporate",
                city: "Mumbai",
                category: "Corporate",
                rating: 4.8,
                reviews: 267,
              },
            ].map((agency, i) => (
              <div
                key={agency.name}
                data-ocid={`home.partners.card.${i + 1}`}
                className="group partner-card-hover reveal bg-white rounded-2xl border border-border shadow-sm p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 blue-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {agency.name.charAt(0)}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">
                      Verified
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {agency.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {agency.city}
                </p>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-royal-100 text-primary mb-4">
                  {agency.category}
                </span>
                <div className="flex items-center gap-1.5 pt-3 border-t border-border">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  <span className="font-bold text-sm">{agency.rating}</span>
                  <span className="text-muted-foreground text-xs">
                    ({agency.reviews} reviews)
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <Button
              asChild
              size="lg"
              data-ocid="home.partners.primary_button"
              className="red-gradient hover:opacity-90 text-white font-semibold h-12 px-8 rounded-2xl border-0 shadow-red transition-opacity"
            >
              <Link to="/partners">View All 150 Partners →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl text-white mb-3">
              Stay Updated
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Get exclusive deals, new destinations, and industry insights
              delivered to your inbox
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                data-ocid="newsletter.input"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 h-12 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "white",
                }}
              />
              <Button
                type="submit"
                data-ocid="newsletter.submit_button"
                disabled={newsletterMutation.isPending}
                className="h-12 px-6 bg-gold hover:bg-gold-dark text-white font-semibold rounded-xl border-0 flex-shrink-0"
              >
                {newsletterMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="blue-gradient rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-60 h-60 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
              style={{ background: "rgba(var(--accent), 0.1)" }}
            />
            <div className="relative z-10">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                Ready to Grow Your Travel Business?
              </h2>
              <p
                className="text-lg max-w-xl mx-auto mb-8"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Join India's fastest growing B2B travel network today. No
                joining fee. Instant activation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-white font-semibold h-14 px-10 rounded-2xl border-0 shadow-gold"
                >
                  <Link to="/partner">Join Now — Free</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent font-semibold h-14 px-8 rounded-2xl text-white hover:bg-white hover:text-primary"
                  style={{ borderColor: "rgba(255,255,255,0.5)" }}
                >
                  <Link to="/contact">Talk to Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
