import PageHero from "@/components/PageHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, BookOpen, Eye, Heart, Target, Users } from "lucide-react";
import { useEffect } from "react";

const stats = [
  { num: "500+", label: "Active Partners" },
  { num: "50+", label: "Destinations" },
  { num: "10,000+", label: "Bookings Completed" },
  { num: "5 Years", label: "Industry Experience" },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    desc: "Every decision we make puts our travel agent partners at the center. Your growth is our growth.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We maintain the highest standards in service delivery, technology, and partner support across all interactions.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Building a thriving community of travel professionals who support, learn from, and inspire each other.",
  },
  {
    icon: BookOpen,
    title: "Innovation",
    desc: "Continuously evolving our platform with cutting-edge technology to stay ahead of industry changes.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us — Travel N World";
  }, []);
  useScrollReveal();

  return (
    <div>
      <PageHero
        title="About Travel N World"
        subtitle="Building India's premier B2B travel ecosystem, one partnership at a time"
        breadcrumb="About Us"
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="reveal p-8 rounded-3xl bg-royal-50 border border-royal-200">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to premium travel products for independent
                travel agents across India by providing a powerful B2B platform
                with unbeatable rates, real-time inventory, and world-class
                support — enabling every agent to compete at the highest level.
              </p>
            </div>
            <div className="reveal reveal-delay-2 p-8 rounded-3xl blue-gradient">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-2xl text-white mb-4">Our Vision</h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                To become the most trusted and comprehensive B2B travel platform
                in South Asia, empowering 10,000+ travel agents to build
                thriving businesses while delivering exceptional travel
                experiences to millions of travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="inline-block px-4 py-1.5 bg-royal-200 text-primary rounded-full text-sm font-semibold mb-5">
                Our Story
              </span>
              <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-6 gold-line">
                How It All Started
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Travel N World was founded in 2019 by a team of travel
                  industry veterans who understood the challenges faced by
                  independent travel agents — fragmented inventory, unfair
                  pricing, and lack of support.
                </p>
                <p>
                  We set out to build a platform that would level the playing
                  field. By aggregating the best suppliers, negotiating
                  wholesale rates, and building intuitive booking tools, we
                  created something the Indian travel industry had never seen
                  before.
                </p>
                <p>
                  Today, we serve 500+ travel agents across 50+ cities in India,
                  processing over 10,000 bookings annually. But we're just
                  getting started — our mission to empower every travel agent in
                  India continues with greater momentum than ever.
                </p>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`stat-card p-6 rounded-2xl text-center reveal reveal-delay-${i + 1}`}
                  >
                    <div className="font-bold text-3xl text-primary mb-2">
                      {s.num}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14 reveal">
            <span className="inline-block px-4 py-1.5 bg-royal-100 text-primary rounded-full text-sm font-semibold mb-4">
              What Drives Us
            </span>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground gold-line gold-line-center">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal reveal-delay-${i + 1} p-7 bg-white rounded-2xl border border-border shadow-card card-hover group`}
              >
                <div className="w-14 h-14 bg-royal-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <v.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 blue-gradient">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${i + 1}`}>
                <div className="font-bold text-4xl md:text-5xl text-gold mb-2">
                  {s.num}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
