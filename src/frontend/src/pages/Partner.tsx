import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitPartnerRegistration } from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  CheckCircle2,
  Globe,
  Headphones,
  Loader2,
  Star,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const benefits = [
  {
    icon: Tag,
    title: "Exclusive B2B Rates",
    desc: "Access wholesale pricing not available anywhere else",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Confirm flights, hotels, and packages in real-time",
  },
  {
    icon: Globe,
    title: "50+ Destinations",
    desc: "Complete inventory for domestic and international travel",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated partner manager always available",
  },
  {
    icon: Users,
    title: "Agent Network",
    desc: "Join a thriving community of 500+ travel professionals",
  },
  {
    icon: Star,
    title: "Top Commissions",
    desc: "Earn the highest commissions in the industry",
  },
];

export default function Partner() {
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    city: "",
    businessType: "",
  });
  const mutation = useSubmitPartnerRegistration();

  useEffect(() => {
    document.title = "Partner Registration \u2014 Travel N World";
  }, []);
  useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessType) {
      toast.error("Please select your business type");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      toast.success("Application received! We'll contact you within 24 hours.");
      setForm({
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

  return (
    <div>
      <PageHero
        title="Become a Partner"
        subtitle="Join India's fastest-growing B2B travel network \u2014 free to join, instant activation"
        breadcrumb="Partner Registration"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Benefits Sidebar */}
            <div className="lg:col-span-2 reveal">
              <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-3 gold-line">
                Why Join Us?
              </h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Thousands of travel agents across India trust Travel N World to
                power their business. Here's what you get:
              </p>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className={`reveal reveal-delay-${i + 1} flex items-start gap-4 p-4 bg-royal-50 rounded-2xl border border-royal-100`}
                  >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <b.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {b.title}
                      </div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        {b.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 blue-gradient rounded-2xl">
                <div className="font-bold text-white mb-2">
                  Already a member?
                </div>
                <p
                  className="text-sm mb-4"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Log in to access your partner dashboard and manage your
                  bookings.
                </p>
                <button
                  type="button"
                  className="text-white font-semibold text-sm hover:text-[#93C5FD] transition-colors"
                  onClick={() => toast.info("Partner portal coming soon!")}
                >
                  Login to Partner Portal \u2192
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-3 reveal reveal-delay-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-border shadow-blue-lg p-8 md:p-10"
              >
                <h3 className="font-bold text-2xl text-foreground mb-2">
                  Create Your Partner Account
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Fill in the details below and our team will set up your
                  account within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="p-name"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="p-name"
                      required
                      data-ocid="partner.name.input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-company"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Company / Agency Name *
                    </label>
                    <Input
                      id="p-company"
                      required
                      data-ocid="partner.company.input"
                      placeholder="Your company name"
                      value={form.companyName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, companyName: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-phone"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Phone Number *
                    </label>
                    <Input
                      id="p-phone"
                      required
                      type="tel"
                      data-ocid="partner.phone.input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-email"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="p-email"
                      required
                      type="email"
                      data-ocid="partner.email.input"
                      placeholder="your@company.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-city"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      City *
                    </label>
                    <Input
                      id="p-city"
                      required
                      data-ocid="partner.city.input"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, city: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="p-btype"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Business Type *
                    </label>
                    <Select
                      value={form.businessType}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, businessType: v }))
                      }
                    >
                      <SelectTrigger
                        id="p-btype"
                        data-ocid="partner.businesstype.select"
                        className="rounded-xl h-11"
                      >
                        <SelectValue placeholder="Select business type" />
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

                <div className="mt-6 p-4 bg-royal-50 rounded-xl border border-royal-100">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    By registering, you agree to our Terms of Service and
                    Privacy Policy.
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  data-ocid="partner.submit_button"
                  disabled={mutation.isPending}
                  className="w-full mt-6 bg-primary hover:bg-primary-light text-white font-semibold h-12 rounded-xl border-0 text-base"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />{" "}
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Partner Application"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
