import { TravelLeadsSections } from "@/components/TravelLeadsSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useSubmitPartnerRegistration,
  useSubscribeNewsletter,
} from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
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
  Sparkles,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── useCountUp hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── StatCounter component ────────────────────────────────────────────────────
function StatCounter({
  target,
  suffix,
  label,
  ocid,
}: {
  target: number;
  suffix: string;
  label: string;
  ocid: string;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} data-ocid={ocid} className="text-center">
      <div className="font-bold text-3xl md:text-4xl text-primary">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Domestic & international flights with best B2B fares and instant confirmation.",
    badge: "B2B Only",
  },
  {
    icon: Building,
    title: "Hotel Booking",
    desc: "5000+ hotels worldwide with negotiated rates exclusively for travel agents.",
    badge: "Wholesale",
  },
  {
    icon: MapPin,
    title: "Domestic Packages",
    desc: "Curated India tour packages covering top 100+ destinations with customization.",
    badge: "B2B Only",
  },
  {
    icon: Globe,
    title: "International Packages",
    desc: "Ready-to-sell international packages for 50+ countries with full support.",
    badge: "Wholesale",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    desc: "Expert visa processing services for 40+ countries with high approval rates.",
    badge: "B2B Only",
  },
  {
    icon: Car,
    title: "Transport Services",
    desc: "Airport transfers, car rentals, and sightseeing cabs at wholesale rates.",
    badge: "Wholesale",
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
    desc: "150+ verified travel agencies in our partner network",
  },
];

const destinations = [
  {
    name: "Dubai",
    country: "UAE",
    img: "/assets/generated/dest-dubai.dim_600x400.jpg",
    tag: "Most Popular",
    packages: 24,
  },
  {
    name: "Thailand",
    country: "Asia",
    img: "/assets/generated/dest-thailand.dim_600x400.jpg",
    tag: "Best Seller",
    packages: 18,
  },
  {
    name: "Singapore",
    country: "Asia",
    img: "/assets/generated/dest-singapore.dim_600x400.jpg",
    tag: "Trending",
    packages: 14,
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    img: "/assets/generated/dest-maldives.dim_600x400.jpg",
    tag: "Luxury",
    packages: 12,
  },
  {
    name: "Kashmir",
    country: "India",
    img: "/assets/generated/dest-kashmir.dim_600x400.jpg",
    tag: "Domestic",
    packages: 20,
  },
  {
    name: "Bali",
    country: "Indonesia",
    img: "/assets/generated/dest-bali.dim_600x400.jpg",
    tag: "Exotic",
    packages: 16,
  },
  {
    name: "Europe",
    country: "Multi-Country",
    img: "/assets/generated/dest-europe.dim_600x400.jpg",
    tag: "Grand Tour",
    packages: 30,
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

// ── Customer Reviews Data ───────────────────────────────────────────────────
const customerReviews = [
  {
    name: "Rahul Sharma",
    city: "Delhi",
    rating: 5,
    review:
      "Great experience booking our Dubai trip through Travel N World. The team was very professional and got us the best package rates. Highly recommended!",
    initials: "RS",
  },
  {
    name: "Priya Mehta",
    city: "Mumbai",
    rating: 5,
    review:
      "Very helpful travel partners and fast support. Any query I had was resolved within hours. The B2B platform is a game-changer for travel agents.",
    initials: "PM",
  },
  {
    name: "Aman Gupta",
    city: "Jaipur",
    rating: 4,
    review:
      "Best B2B travel platform for agents. I've increased my bookings by 40% since joining Travel N World. The verified partner network is excellent.",
    initials: "AG",
  },
  {
    name: "Sunita Rao",
    city: "Bangalore",
    rating: 5,
    review:
      "Booking international packages has never been easier. Travel N World provides great deals with instant confirmation. My clients are very happy!",
    initials: "SR",
  },
  {
    name: "Vikram Nair",
    city: "Chennai",
    rating: 5,
    review:
      "I joined as a travel partner 6 months ago and already have 200+ successful bookings. The support team and resources are outstanding.",
    initials: "VN",
  },
  {
    name: "Anita Kapoor",
    city: "Hyderabad",
    rating: 4,
    review:
      "Travel N World has a wide range of destinations and competitive pricing. My corporate clients love the seamless booking experience.",
    initials: "AK",
  },
  {
    name: "Suresh Bansal",
    city: "Kolkata",
    rating: 5,
    review:
      "Excellent platform for travel agents. The daily leads I receive have transformed my business. The quality of inquiries is very high.",
    initials: "SB",
  },
  {
    name: "Neha Singh",
    city: "Ahmedabad",
    rating: 5,
    review:
      "Travel N World is the most reliable B2B travel platform I have used. Great packages, fast support, and verified partners. Truly trustworthy!",
    initials: "NS",
  },
  {
    name: "Deepak Malhotra",
    city: "Pune",
    rating: 4,
    review:
      "The platform helped me connect with international tour operators and offer better packages to my clients. My revenue has grown significantly.",
    initials: "DM",
  },
];

// ── Customer Reviews Slider ───────────────────────────────────────────────────
function CustomerReviewsSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(3);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlidesPerPage(1);
      else if (window.innerWidth < 1024) setSlidesPerPage(2);
      else setSlidesPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(customerReviews.length / slidesPerPage);

  useEffect(() => {
    autoTimer.current = setInterval(() => {
      setCurrentPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [totalPages]);

  const resetTimer = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrentPage((p) => (p + 1) % totalPages);
    }, 4000);
  };

  const goTo = (page: number) => {
    setCurrentPage(page);
    resetTimer();
  };

  const prev = () => {
    goTo((currentPage - 1 + totalPages) % totalPages);
  };
  const next = () => {
    goTo((currentPage + 1) % totalPages);
  };

  const visibleReviews = customerReviews.slice(
    currentPage * slidesPerPage,
    currentPage * slidesPerPage + slidesPerPage,
  );

  return (
    <section className="section-padding" style={{ background: "#F5F7FA" }}>
      <div className="container-custom">
        <div className="text-center mb-14 reveal">
          <span className="section-label-red">Customer Testimonials</span>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
            Thousands of travel agents and partners trust Travel N World for
            reliable B2B travel solutions across India.
          </p>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
                />
              ))}
            </div>
            <span className="font-bold text-[#1E40AF]">4.8 / 5</span>
            <span className="text-[#6B7280] text-sm">
              · 7,000+ verified reviews
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[260px]">
            {visibleReviews.map((review, i) => (
              <div
                key={`${review.name}-${currentPage}`}
                data-ocid={`reviews.item.${i + 1}`}
                className="reveal"
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid oklch(93 0.01 240)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  animation: "fadeSlideIn 0.35s ease both",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`h-4 w-4 ${n <= review.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
                {/* Review text */}
                <p className="text-[#374151] text-sm leading-relaxed flex-1 italic">
                  "{review.review}"
                </p>
                {/* Author */}
                <div
                  className="flex items-center gap-3 pt-2"
                  style={{ borderTop: "1px solid oklch(93 0.01 240)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
                    }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[#111827] text-sm">
                      {review.name}
                    </div>
                    <div className="text-[#6B7280] text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {review.city}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(38 0.18 264 / 0.08)",
                        color: "#1E40AF",
                      }}
                    >
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev/Next arrows */}
          <button
            type="button"
            data-ocid="reviews.pagination_prev"
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -left-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-all hover:scale-110"
            style={{
              background: "#1E40AF",
              color: "white",
              boxShadow: "0 4px 12px rgba(30,64,175,0.3)",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            data-ocid="reviews.pagination_next"
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -right-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-all hover:scale-110"
            style={{
              background: "#1E40AF",
              color: "white",
              boxShadow: "0 4px 12px rgba(30,64,175,0.3)",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
            <button
              type="button"
              key={`review-page-${page}`}
              data-ocid={"reviews.tab"}
              onClick={() => goTo(page)}
              className="rounded-full transition-all"
              style={{
                width: page === currentPage ? "32px" : "10px",
                height: "10px",
                background:
                  page === currentPage ? "#1E40AF" : "oklch(78 0.04 240)",
              }}
            />
          ))}
        </div>

        {/* Mobile prev/next */}
        <div className="flex items-center justify-center gap-4 mt-6 md:hidden">
          <button
            type="button"
            onClick={prev}
            className="flex w-10 h-10 rounded-full items-center justify-center"
            style={{ background: "#1E40AF", color: "white" }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex w-10 h-10 rounded-full items-center justify-center"
            style={{ background: "#1E40AF", color: "white" }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ── Hero Slider Component ────────────────────────────────────────────────────
const heroSlides = [
  {
    name: "Goa, India",
    url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
  },
  {
    name: "Dubai, UAE",
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  },
  {
    name: "Maldives",
    url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80",
  },
  {
    name: "Bali, Indonesia",
    url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
  },
  {
    name: "Kashmir, India",
    url: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80",
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    mobile: "",
    email: "",
    location: "",
    requirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % heroSlides.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  const prev = () =>
    setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((p) => (p + 1) % heroSlides.length);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    toast.success(
      "Inquiry submitted! Our team will contact you within 24 hours.",
    );
    setInquiryForm({
      name: "",
      company: "",
      mobile: "",
      email: "",
      location: "",
      requirements: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-[600px] md:min-h-[700px] lg:min-h-screen">
      {/* ── Left: Image Slider ── */}
      <div
        data-ocid="hero.slider"
        className="relative w-full md:w-[60%] min-h-[340px] md:min-h-full overflow-hidden"
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.url}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <img
              src={slide.url}
              alt={slide.name}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Hero text overlay — bottom left */}
        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-10 lg:p-12 max-w-[90%]">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4"
            style={{
              background: "rgba(255,255,255,0.12)",
              borderColor: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#E53935" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              India's #1 B2B Travel Platform
            </span>
          </div>
          <h1
            className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}
          >
            India's Trusted B2B
            <br />
            <span style={{ color: "#ffffff" }}>Travel Partner Network</span>
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: "#E5E7EB", fontFamily: "'Inter', sans-serif" }}
          >
            Premium travel solutions for travel agents and partners across
            India.
          </p>
        </div>

        {/* Destination pill — bottom right */}
        <div className="absolute bottom-6 right-6 z-20">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
            }}
          >
            <MapPin className="h-3 w-3" />
            {heroSlides[current].name}
          </div>
        </div>

        {/* Arrow navigation */}
        <button
          type="button"
          data-ocid="hero.prev_button"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button
          type="button"
          data-ocid="hero.next_button"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.name}
              type="button"
              onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                background:
                  i === current ? "#ffffff" : "rgba(255,255,255,0.45)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Inquiry Form ── */}
      <div
        className="w-full md:w-[40%] flex items-center justify-center p-6 md:p-8 lg:p-10"
        style={{ background: "#F5F7FA" }}
      >
        <div
          className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8"
          style={{ boxShadow: "0 8px 40px rgba(30,64,175,0.13)" }}
        >
          {/* Card header */}
          <div className="mb-6">
            <h2
              className="font-bold text-xl"
              style={{ color: "#111827", fontFamily: "'Poppins', sans-serif" }}
            >
              Get a Free Quote
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}
            >
              Fill in the details and we'll get back to you
            </p>
            <div
              className="w-12 h-1 rounded mt-2"
              style={{ background: "#E53935" }}
            />
          </div>

          {submitted ? (
            <div
              data-ocid="inquiry.success_state"
              className="flex flex-col items-center justify-center py-10 gap-3"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "oklch(38 0.18 264 / 0.1)" }}
              >
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <p
                className="font-semibold text-center"
                style={{ color: "#111827" }}
              >
                Inquiry Submitted!
              </p>
              <p className="text-sm text-center" style={{ color: "#6B7280" }}>
                Our team will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label
                  htmlFor="inq-name"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  required
                  id="inq-name"
                  data-ocid="inquiry.name_input"
                  value={inquiryForm.name}
                  onChange={(e) =>
                    setInquiryForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="w-full h-10 px-3 rounded-lg border text-sm outline-none transition-all focus:ring-2"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* Company Name */}
              <div>
                <label
                  htmlFor="inq-company"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="inq-company"
                  data-ocid="inquiry.company_input"
                  value={inquiryForm.company}
                  onChange={(e) =>
                    setInquiryForm((p) => ({ ...p, company: e.target.value }))
                  }
                  placeholder="Your agency / company"
                  className="w-full h-10 px-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* Mobile */}
              <div>
                <label
                  htmlFor="inq-mobile"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  id="inq-mobile"
                  data-ocid="inquiry.mobile_input"
                  value={inquiryForm.mobile}
                  onChange={(e) =>
                    setInquiryForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full h-10 px-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="inq-email"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  id="inq-email"
                  data-ocid="inquiry.email_input"
                  value={inquiryForm.email}
                  onChange={(e) =>
                    setInquiryForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="you@company.com"
                  className="w-full h-10 px-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* Location */}
              <div>
                <label
                  htmlFor="inq-location"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Location
                </label>
                <input
                  type="text"
                  id="inq-location"
                  data-ocid="inquiry.location_input"
                  value={inquiryForm.location}
                  onChange={(e) =>
                    setInquiryForm((p) => ({ ...p, location: e.target.value }))
                  }
                  placeholder="Your City / State"
                  className="w-full h-10 px-3 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {/* Travel Requirements */}
              <div>
                <label
                  htmlFor="inq-requirements"
                  className="block text-xs font-semibold mb-1"
                  style={{ color: "#374151" }}
                >
                  Travel Requirements
                </label>
                <textarea
                  rows={3}
                  id="inq-requirements"
                  data-ocid="inquiry.requirements_textarea"
                  value={inquiryForm.requirements}
                  onChange={(e) =>
                    setInquiryForm((p) => ({
                      ...p,
                      requirements: e.target.value,
                    }))
                  }
                  placeholder="Destination, dates, group size..."
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all resize-none"
                  style={{
                    borderColor: "#D1D5DB",
                    fontFamily: "'Inter', sans-serif",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#1E40AF";
                    e.target.style.boxShadow = "0 0 0 2px rgba(30,64,175,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#D1D5DB";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                data-ocid="inquiry.submit_button"
                disabled={submitting}
                className="w-full h-12 rounded-xl text-white font-semibold text-base transition-all hover:brightness-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  background: "#1E40AF",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Inquiry →"
                )}
              </button>
              <p
                className="text-xs text-center mt-1"
                style={{ color: "#6B7280" }}
              >
                Our team will contact you within 24 hours
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

const SHOWCASE_GRADIENTS = [
  "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
  "linear-gradient(135deg, #4338CA 0%, #818CF8 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
  "linear-gradient(135deg, #0369A1 0%, #38BDF8 100%)",
  "linear-gradient(135deg, #065F46 0%, #34D399 100%)",
  "linear-gradient(135deg, #9D174D 0%, #F472B6 100%)",
  "linear-gradient(135deg, #1E3A8A 0%, #60A5FA 100%)",
  "linear-gradient(135deg, #134E4A 0%, #5EEAD4 100%)",
  "linear-gradient(135deg, #78350F 0%, #FCD34D 100%)",
];

function getShowcaseInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getShowcaseGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % SHOWCASE_GRADIENTS.length;
  }
  return SHOWCASE_GRADIENTS[Math.abs(hash) % SHOWCASE_GRADIENTS.length];
}

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
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO — Split Layout: Slider Left + Inquiry Form Right */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* OVERALL RATING BADGE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="bg-white py-4"
        style={{ borderBottom: "1px solid oklch(92 0.01 240)" }}
      >
        <div className="container-custom flex justify-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
              border: "1px solid oklch(92 0.01 240)",
            }}
          >
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]"
                />
              ))}
            </div>
            <span className="font-bold text-lg text-[#1E40AF]">4.8</span>
            <span className="text-[#374151] text-sm font-medium hidden sm:inline">
              Average Rating
            </span>
            <span className="text-[#6B7280] text-sm">
              from <strong className="text-[#111827]">7,000+</strong> Customer
              Reviews
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TRUST STATISTICS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-10 bg-white"
        style={{
          borderTop: "1px solid oklch(92 0.01 240)",
          borderBottom: "1px solid oklch(92 0.01 240)",
          boxShadow: "0 2px 20px oklch(38 0.18 264 / 0.06)",
        }}
      >
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {/* Stat 1 */}
            <div className="flex flex-1 items-center justify-center gap-4 px-6 py-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(38 0.18 264 / 0.1)" }}
              >
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <StatCounter
                target={150}
                suffix="+"
                label="Verified Travel Partners Across India"
                ocid="hero.stats.partners"
              />
            </div>

            {/* Stat 2 */}
            <div className="flex flex-1 items-center justify-center gap-4 px-6 py-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(51 0.22 27 / 0.08)" }}
              >
                <BadgeCheck
                  className="h-6 w-6"
                  style={{ color: "oklch(51 0.22 27)" }}
                />
              </div>
              <StatCounter
                target={10000}
                suffix="+"
                label="Successful Bookings"
                ocid="hero.stats.bookings"
              />
            </div>

            {/* Stat 3 */}
            <div className="flex flex-1 items-center justify-center gap-4 px-6 py-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(76 0.155 74 / 0.12)" }}
              >
                <Globe
                  className="h-6 w-6"
                  style={{ color: "oklch(60 0.14 68)" }}
                />
              </div>
              <StatCounter
                target={50}
                suffix="+"
                label="Popular Destinations"
                ocid="hero.stats.destinations"
              />
            </div>

            {/* Stat 4 */}
            <div className="flex flex-1 items-center justify-center gap-4 px-6 py-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(78 0.16 85 / 0.15)" }}
              >
                <Star className="h-6 w-6 fill-[#F59E0B] text-[#F59E0B]" />
              </div>
              <StatCounter
                target={7000}
                suffix="+"
                label="Happy Customer Reviews"
                ocid="hero.stats.reviews"
              />
            </div>
          </div>
        </div>
      </section>
      <TravelLeadsSections />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SERVICES */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label-red">What We Offer</span>
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
                className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-white rounded-2xl p-7 border border-border shadow-card transition-all duration-300 overflow-hidden`}
                style={{
                  boxShadow: "0 2px 16px oklch(18 0.06 265 / 0.07)",
                }}
              >
                {/* Left blue border that appears on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
                  style={{
                    background: "oklch(38 0.18 264)",
                    transform: "scaleY(0)",
                    transformOrigin: "top",
                  }}
                  aria-hidden="true"
                />
                <style>{`
                  [data-ocid="services.card.${i + 1}"]:hover > div:first-child {
                    transform: scaleY(1);
                  }
                  [data-ocid="services.card.${i + 1}"]:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px oklch(38 0.18 264 / 0.14);
                  }
                `}</style>

                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 blue-gradient rounded-2xl flex items-center justify-center shadow-blue">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(51 0.22 27 / 0.1)",
                      color: "oklch(51 0.22 27)",
                    }}
                  >
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold">
                  <span>Learn more</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* WHY CHOOSE US */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label">Our Advantage</span>
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
                <div className="w-16 h-16 blue-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-blue">
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F5F7FA]">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label">Simple Process</span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#111827] red-line red-line-center">
              How It Works
            </h2>
            <p className="text-[#6B7280] mt-5 max-w-xl mx-auto">
              Get started in 4 simple steps and grow your travel business with
              us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                num: "01",
                title: "Register",
                desc: "Create your free partner account with basic business details",
              },
              {
                num: "02",
                title: "Get Access",
                desc: "Browse exclusive B2B travel deals, rates, and inventory",
              },
              {
                num: "03",
                title: "Book",
                desc: "Place bookings for your clients with instant confirmation",
              },
              {
                num: "04",
                title: "Earn",
                desc: "Get competitive commissions on every successful booking",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className={`reveal reveal-delay-${i + 1} relative`}
              >
                <div className="bg-white rounded-2xl p-7 border border-border shadow-card text-center card-hover">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white font-bold text-xl"
                    style={{ background: "#1E40AF" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg text-[#111827] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4 z-10 items-center justify-center">
                    <span className="text-2xl font-bold text-[#6B7280]">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* DESTINATIONS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label-red">Explore the World</span>
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
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                  }}
                />
                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-white text-xs font-bold rounded-full bg-[#1E40AF]">
                    {dest.tag}
                  </span>
                </div>
                {/* Package count */}
                <div className="absolute top-3 right-3">
                  <span
                    className="px-2.5 py-1 text-white text-xs font-semibold rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {dest.packages} Packages
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-bold text-2xl text-white">
                    {dest.name}
                  </div>
                  <div
                    className="text-sm mt-0.5"
                    style={{ color: "rgba(255,255,255,0.72)" }}
                  >
                    {dest.country}
                  </div>
                  {/* Book Now — slides up on hover */}
                  <div
                    className="overflow-hidden"
                    style={{ maxHeight: 0, transition: "max-height 0.3s ease" }}
                    ref={(el) => {
                      if (!el) return;
                      const parent = el.closest(".dest-card");
                      if (!parent) return;
                      const show = () => {
                        el.style.maxHeight = "48px";
                      };
                      const hide = () => {
                        el.style.maxHeight = "0px";
                      };
                      parent.addEventListener("mouseenter", show);
                      parent.addEventListener("mouseleave", hide);
                    }}
                  >
                    <button
                      type="button"
                      className="mt-3 w-full text-center text-sm font-bold py-2 rounded-xl text-white"
                      style={{ background: "oklch(38 0.18 264 / 0.85)" }}
                    >
                      Book Now →
                    </button>
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
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-2xl px-8 font-semibold transition-all"
            >
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PRICING / PLANS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F5F7FA]">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label-red">Membership Plans</span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#111827] red-line red-line-center">
              Become a Travel Partner
            </h2>
            <p className="text-[#6B7280] mt-5 max-w-xl mx-auto">
              Choose the plan that's right for your business and start growing
              today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="reveal reveal-delay-1 bg-white rounded-2xl shadow-md p-8 border border-border flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-[#111827] mb-1">
                  Starter Plan
                </h3>
                <p className="text-[#6B7280] text-sm">Perfect for new agents</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1E40AF]">
                  ₹3,000
                </span>
                <span className="text-[#6B7280] text-sm ml-2">/ 3 Months</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Verified listing",
                  "Lead inquiries",
                  "Access to travel deals",
                  "Partner support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[#374151]"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#1E40AF] font-bold text-xs">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                data-ocid="pricing.starter.button"
                className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl border-0 h-12"
              >
                <Link to="/partner">Join Now</Link>
              </Button>
            </div>

            {/* Professional */}
            <div className="reveal reveal-delay-2 bg-white rounded-2xl shadow-md p-8 border border-border flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-[#111827] mb-1">
                  Professional Plan
                </h3>
                <p className="text-[#6B7280] text-sm">For growing agencies</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1E40AF]">
                  ₹6,000
                </span>
                <span className="text-[#6B7280] text-sm ml-2">/ 6 Months</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Verified listing",
                  "Priority leads",
                  "Marketing support",
                  "Partner dashboard",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[#374151]"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#1E40AF] font-bold text-xs">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                data-ocid="pricing.professional.button"
                className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl border-0 h-12"
              >
                <Link to="/partner">Join Now</Link>
              </Button>
            </div>

            {/* Premium — Recommended */}
            <div className="reveal reveal-delay-3 bg-white rounded-2xl shadow-xl p-8 border-2 border-[#1E40AF] flex flex-col relative card-hover">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest"
                style={{ background: "#1E40AF" }}
              >
                ⭐ Recommended
              </div>
              <div className="mb-6 mt-2">
                <h3 className="font-bold text-xl text-[#111827] mb-1">
                  Premium Plan
                </h3>
                <p className="text-[#6B7280] text-sm">
                  For established agencies
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1E40AF]">
                  ₹12,000
                </span>
                <span className="text-[#6B7280] text-sm ml-2">/ 1 Year</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Verified listing",
                  "Featured partner badge",
                  "Top search visibility",
                  "Priority leads",
                  "Dedicated support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[#374151]"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-[#1E40AF] font-bold text-xs">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                data-ocid="pricing.premium.button"
                className="w-full bg-[#E53935] hover:bg-[#C62828] text-white font-semibold rounded-xl border-0 h-12"
              >
                <Link to="/partner">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — desktop grid + mobile slider */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding blue-gradient">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                letterSpacing: "0.12em",
              }}
            >
              Partner Stories
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white gold-line gold-line-center">
              What Our Partners Say
            </h2>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`testimonials.grid.card.${i + 1}`}
                className="reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="rounded-3xl p-8 h-full flex flex-col border"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className="h-4 w-4 fill-[#C9A227] text-[#C9A227]"
                      />
                    ))}
                  </div>
                  <blockquote className="text-white text-sm md:text-base leading-relaxed italic flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(55 0.18 264), oklch(38 0.18 264))",
                        border: "2px solid rgba(255,255,255,0.25)",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {t.name}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        {t.role} · {t.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: slider */}
          <div
            data-ocid="testimonials.panel"
            className="lg:hidden max-w-2xl mx-auto reveal"
          >
            <div
              className="relative rounded-3xl p-8 border text-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5]
                  .slice(0, testimonials[currentTestimonial].rating)
                  .map((n) => (
                    <Star
                      key={n}
                      className="h-5 w-5 fill-[#C9A227] text-[#C9A227]"
                    />
                  ))}
              </div>

              <blockquote className="text-white text-lg leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(55 0.18 264), oklch(38 0.18 264))",
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                >
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
                    className={`rounded-full transition-all ${i === currentTestimonial ? "w-8 h-2.5 bg-[#1E40AF]" : "w-2.5 h-2.5 hover:opacity-70"}`}
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CUSTOMER REVIEWS SLIDER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <CustomerReviewsSlider />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PARTNER REGISTRATION CTA BANNER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div
            className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(38 0.18 264) 0%, oklch(28 0.16 268) 100%)",
            }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full"
              style={{ background: "oklch(51 0.22 27 / 0.12)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: "rgba(255,255,255,0.02)" }}
            />

            <div className="relative z-10 text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  letterSpacing: "0.12em",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Partner With Us
              </div>

              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                Join India's Fastest Growing
                <br />
                <span style={{ color: "rgba(255,255,255,0.9)" }}>
                  B2B Travel Network
                </span>
              </h2>

              <p
                className="text-lg max-w-xl mx-auto mb-8"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Get exclusive rates, dedicated support, and real-time booking
                tools. Start growing your travel business today.
              </p>

              {/* Benefit pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {[
                  "✓ No Joining Fee",
                  "⚡ Instant Activation",
                  "🎧 24/7 Support",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                data-ocid="cta_banner.primary_button"
                className="h-14 px-10 rounded-2xl border-0 font-bold text-base transition-all hover:scale-105"
                style={{
                  background: "#E53935",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(229,57,53,0.4)",
                }}
              >
                <a href="#register">Register Now — It's Free →</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PARTNER REGISTRATION FORM */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="register" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="section-label-red">Join Our Network</span>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 gold-line">
                Register as a Partner
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Join 150+ travel agents who are already growing their business
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* VERIFIED PARTNERS TEASER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="section-label-red">Our Network</span>
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
                  <div className="w-12 h-12 blue-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-blue">
                    {agency.name.charAt(0)}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
                    <span className="text-xs font-semibold text-blue-700">
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
                  <Star className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]" />
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* OUR PRESENCE ACROSS INDIA */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#EFF6FF" }}>
        <div className="container-custom">
          <div className="text-center mb-10 reveal">
            <span className="section-label-red">Pan-India Network</span>
            <h2
              className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Presence Across India
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Connecting travel agents and partners across major cities in India
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Delhi", index: 1 },
              { name: "Mumbai", index: 2 },
              { name: "Jaipur", index: 3 },
              { name: "Ahmedabad", index: 4 },
              { name: "Bangalore", index: 5 },
              { name: "Kolkata", index: 6 },
              { name: "Hyderabad", index: 7 },
              { name: "Chennai", index: 8 },
              { name: "Goa", index: 9 },
              { name: "Lucknow", index: 10 },
            ].map((city) => (
              <div
                key={city.name}
                data-ocid={`presence.city.${city.index}`}
                className="reveal flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
              >
                <MapPin className="h-4 w-4 text-primary group-hover:text-red-500 transition-colors" />
                <span className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors">
                  {city.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8 reveal">
            + 40 more cities with growing partner presence
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TRUSTED TRAVEL PARTNERS SHOWCASE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 overflow-hidden"
        style={{ background: "#F8FAFF" }}
      >
        <div className="container-custom">
          <div className="text-center mb-10 reveal">
            <span className="section-label-red">Partner Network</span>
            <h2
              className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Trusted Travel Partners Across India
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Partnered with verified travel agencies from every corner of India
            </p>
          </div>
        </div>

        {/* Scrolling marquee with fade masks */}
        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="flex gap-5 partner-marquee">
            {[
              { name: "Horizon Travels", city: "Mumbai" },
              { name: "SkyWing Tours", city: "Delhi" },
              { name: "Royal Journeys", city: "Bangalore" },
              { name: "Blue Ocean Trips", city: "Chennai" },
              { name: "Golden Gate Travel", city: "Jaipur" },
              { name: "Summit Adventures", city: "Ahmedabad" },
              { name: "Pearl Holidays", city: "Goa" },
              { name: "Sunrise Tours", city: "Kolkata" },
              { name: "Heritage Explorers", city: "Delhi" },
              { name: "Coastal Dreams", city: "Hyderabad" },
              { name: "Alpine Travels", city: "Lucknow" },
              { name: "Metro Voyages", city: "Mumbai" },
              { name: "Desi Wanderers", city: "Jaipur" },
              { name: "India Circuit", city: "Delhi" },
              { name: "Lotus Journeys", city: "Bangalore" },
              { name: "Emerald Tours", city: "Goa" },
              { name: "Spice Route Travel", city: "Chennai" },
              { name: "Himalayan Trails", city: "Lucknow" },
              { name: "Desert Dunes Tours", city: "Jaipur" },
              { name: "Backwater Bliss", city: "Hyderabad" },
              // Duplicate for seamless loop
              { name: "Horizon Travels", city: "Mumbai" },
              { name: "SkyWing Tours", city: "Delhi" },
              { name: "Royal Journeys", city: "Bangalore" },
              { name: "Blue Ocean Trips", city: "Chennai" },
              { name: "Golden Gate Travel", city: "Jaipur" },
              { name: "Summit Adventures", city: "Ahmedabad" },
              { name: "Pearl Holidays", city: "Goa" },
              { name: "Sunrise Tours", city: "Kolkata" },
              { name: "Heritage Explorers", city: "Delhi" },
              { name: "Coastal Dreams", city: "Hyderabad" },
            ].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-2xl shadow-sm border border-blue-50 px-5 py-4 w-28 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white"
                  style={{ background: getShowcaseGradient(partner.name) }}
                >
                  {getShowcaseInitials(partner.name)}
                </div>
                <span className="text-xs font-semibold text-gray-800 text-center leading-tight line-clamp-2">
                  {partner.name}
                </span>
                <span className="text-[10px] text-gray-400">
                  {partner.city}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 reveal">
          <Link to="/partners" data-ocid="showcase.view_all.button">
            <button
              type="button"
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "#1E40AF" }}
            >
              View All Partners →
            </button>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* NEWSLETTER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
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
                className="h-12 px-6 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl border-0 flex-shrink-0"
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
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="blue-gradient rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute -top-10 -right-10 w-60 h-60 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
              style={{ background: "rgba(229, 57, 53, 0.1)" }}
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
                  className="bg-[#E53935] hover:bg-[#C62828] text-white font-semibold h-14 px-10 rounded-2xl border-0 shadow-red"
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
