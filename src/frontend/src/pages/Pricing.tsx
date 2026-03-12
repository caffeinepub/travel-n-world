import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Check, HelpCircle, Shield, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter Plan",
    price: "₹3,000",
    duration: "3 Months",
    icon: Zap,
    description: "Perfect for new travel agents starting their journey.",
    features: [
      "Verified listing in partner directory",
      "Lead inquiries from customers",
      "Access to exclusive travel deals",
      "Dedicated partner support",
      "Basic partner profile page",
    ],
    recommended: false,
    cta: "Get Started",
  },
  {
    name: "Professional Plan",
    price: "₹6,000",
    duration: "6 Months",
    icon: Star,
    description: "Ideal for growing agencies looking to scale faster.",
    features: [
      "Verified listing in partner directory",
      "Priority leads — first access",
      "Marketing support & promotions",
      "Partner dashboard & analytics",
      "Enhanced profile visibility",
      "Featured in search results",
    ],
    recommended: false,
    cta: "Choose Professional",
  },
  {
    name: "Premium Plan",
    price: "₹12,000",
    duration: "1 Year",
    icon: Shield,
    description: "For established agencies seeking maximum growth & exposure.",
    features: [
      "Verified listing in partner directory",
      "Featured partner badge",
      "Top search visibility",
      "Priority leads — exclusive access",
      "Dedicated account manager",
      "Social media promotion",
      "Annual performance review",
    ],
    recommended: true,
    cta: "Go Premium",
  },
];

const faqs = [
  {
    q: "How do I receive travel leads?",
    a: "Once you join, customers searching for travel packages in your city or specialization will be connected directly to you via phone and email.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can upgrade from Starter to Professional or Premium at any time. The remaining value of your current plan will be adjusted.",
  },
  {
    q: "Is my listing verified immediately?",
    a: "Yes! After registration and payment, your verified badge and listing go live within 24 hours.",
  },
  {
    q: "What types of leads will I receive?",
    a: "Leads include flight bookings, hotel reservations, domestic and international holiday packages, visa assistance, and group tours.",
  },
];

export default function Pricing() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #FEF2F2 100%)",
        }}
      >
        <div className="container-custom text-center max-w-3xl mx-auto">
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: "#E53935", background: "#FEE2E2" }}
          >
            Partner Membership
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#111827" }}
          >
            Choose Your <span style={{ color: "#1E40AF" }}>Partner Plan</span>
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: "#374151" }}
          >
            Join Travel N World and start receiving daily travel inquiries,
            leads, and booking opportunities from customers across India.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16 md:py-24" style={{ background: "#F5F7FA" }}>
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  data-ocid={`pricing.card.${i + 1}`}
                  className="relative"
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                      <Badge
                        className="text-white font-bold px-5 py-1.5 text-sm rounded-full shadow-lg border-0"
                        style={{ background: "#E53935" }}
                      >
                        ⭐ Recommended
                      </Badge>
                    </div>
                  )}
                  <Card
                    className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      boxShadow: plan.recommended
                        ? "0 8px 40px rgba(30,64,175,0.18)"
                        : "0 4px 24px rgba(30,64,175,0.08)",
                      border: plan.recommended
                        ? "2px solid #1E40AF"
                        : "1px solid #E5E7EB",
                      paddingTop: plan.recommended ? "16px" : "0",
                    }}
                  >
                    <CardHeader className="pb-4 pt-6 px-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{
                          background: plan.recommended ? "#1E40AF" : "#EFF6FF",
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{
                            color: plan.recommended ? "#FFFFFF" : "#1E40AF",
                          }}
                        />
                      </div>
                      <h2
                        className="text-xl font-bold mb-1"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          color: "#111827",
                        }}
                      >
                        {plan.name}
                      </h2>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#6B7280",
                        }}
                      >
                        {plan.description}
                      </p>
                      <div className="mt-4 flex items-end gap-2">
                        <span
                          className="text-4xl font-black"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            color: plan.recommended ? "#1E40AF" : "#111827",
                          }}
                        >
                          {plan.price}
                        </span>
                        <span
                          className="text-sm pb-1"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#6B7280",
                          }}
                        >
                          / {plan.duration}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 px-6 pb-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: plan.recommended
                                  ? "#DBEAFE"
                                  : "#F0FDF4",
                              }}
                            >
                              <Check
                                className="w-3 h-3"
                                style={{
                                  color: plan.recommended
                                    ? "#1E40AF"
                                    : "#16A34A",
                                }}
                              />
                            </div>
                            <span
                              className="text-sm"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                color: "#374151",
                              }}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="px-6 pb-8">
                      <Button
                        asChild
                        data-ocid={`pricing.join_button.${i + 1}`}
                        className="w-full h-12 font-semibold rounded-xl text-base transition-all hover:opacity-90 hover:shadow-lg border-0"
                        style={{
                          background: plan.recommended ? "#1E40AF" : "#E53935",
                          color: "#FFFFFF",
                        }}
                      >
                        <Link to="/partner">{plan.cta}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Money-back note */}
          <p
            className="text-center mt-10 text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#6B7280",
            }}
          >
            ✅ All plans include a verified badge • No hidden fees • Cancel-free
            listing
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12" style={{ background: "#1E40AF" }}>
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            {[
              { num: "150+", label: "Verified Partners" },
              { num: "10,000+", label: "Successful Bookings" },
              { num: "50+", label: "Global Destinations" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl md:text-4xl font-black"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#FFFFFF",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#BFDBFE",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" style={{ background: "#FFFFFF" }}>
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#111827" }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280" }}>
              Everything you need to know about our partner program.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                data-ocid={`pricing.faq.item.${i + 1}`}
                className="rounded-2xl p-6"
                style={{
                  background: "#F5F7FA",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#1E40AF" }}
                  />
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: "#111827",
                      }}
                    >
                      {faq.q}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#374151",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #1E40AF 0%, #1D4ED8 100%)",
        }}
      >
        <div className="container-custom text-center max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Ready to Grow Your Travel Business?
          </h2>
          <p
            className="text-blue-200 mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join 150+ verified travel partners across India and start receiving
            leads today.
          </p>
          <Button
            asChild
            data-ocid="pricing.cta_button"
            className="h-14 px-10 text-base font-bold rounded-2xl border-0 shadow-xl transition-all hover:opacity-90"
            style={{ background: "#E53935", color: "#FFFFFF" }}
          >
            <Link to="/partner">Become a Travel Partner Today</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
