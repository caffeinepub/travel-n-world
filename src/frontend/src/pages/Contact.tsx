import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactForm } from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["123 Travel House, Connaught Place", "New Delhi – 110001, India"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 99999 99999", "+91 88888 88888"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@travelnworld.in", "support@travelnworld.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 7:00 PM", "Sun: 10:00 AM – 4:00 PM"],
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const mutation = useSubmitContactForm();

  useEffect(() => {
    document.title = "Contact Us — Travel N World";
  }, []);
  useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out and our team will respond within 24 hours"
        breadcrumb="Contact"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactInfo.map((info, i) => (
              <div
                key={info.title}
                className={`reveal reveal-delay-${i + 1} p-6 bg-royal-50 rounded-2xl border border-royal-100 text-center card-hover`}
              >
                <div className="w-12 h-12 blue-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">
                  {info.title}
                </h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-muted-foreground text-sm">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 reveal">
              <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-2 gold-line">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Have a question or need more information? We'd love to hear from
                you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Your Name *
                    </label>
                    <Input
                      required
                      id="c-name"
                      data-ocid="contact.name.input"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-email"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      id="c-email"
                      data-ocid="contact.email.input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-phone"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="c-phone"
                      data-ocid="contact.phone.input"
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
                      htmlFor="c-subject"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Subject *
                    </label>
                    <Input
                      required
                      id="c-subject"
                      data-ocid="contact.subject.input"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, subject: e.target.value }))
                      }
                      className="rounded-xl h-11"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="c-message"
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Message *
                  </label>
                  <Textarea
                    required
                    id="c-message"
                    data-ocid="contact.message.textarea"
                    placeholder="Tell us more about your requirement..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="rounded-xl min-h-36 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full bg-primary hover:bg-primary-light text-white font-semibold h-12 rounded-xl border-0"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending
                      Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-2 reveal reveal-delay-2">
              <h2 className="font-bold text-2xl text-foreground mb-2 gold-line">
                Find Us Here
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                We're located in the heart of New Delhi, easily accessible by
                metro and road.
              </p>
              <div
                className="blue-gradient rounded-3xl overflow-hidden flex flex-col items-center justify-center relative"
                style={{ aspectRatio: "1/1" }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, transparent 1px, transparent 40px)",
                  }}
                />
                <div className="relative z-10 text-center p-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="font-bold text-white text-xl mb-2">
                    Travel N World HQ
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    123 Travel House
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Connaught Place, New Delhi
                  </div>
                  <div className="mt-6 px-5 py-2.5 bg-[#1E40AF] rounded-xl text-white text-sm font-semibold inline-block cursor-pointer hover:bg-[#1E3A8A] transition-colors">
                    Get Directions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
