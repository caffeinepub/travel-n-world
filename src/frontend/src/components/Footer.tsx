import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Plane } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";

const SOCIAL = [
  {
    icon: SiLinkedin,
    href: "https://linkedin.com/company/travelnworld",
    label: "LinkedIn",
    color: "hover:bg-[#0077B5]",
  },
  {
    icon: SiInstagram,
    href: "https://instagram.com/travelnworld_official",
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
  },
  {
    icon: SiFacebook,
    href: "https://facebook.com/profile.php?id=10009174104398",
    label: "Facebook",
    color: "hover:bg-[#1877F2]",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ background: "#0F172A" }} className="text-white">
      {/* Main Footer */}
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="p-2 rounded-xl flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <Plane className="h-5 w-5 text-[#93C5FD]" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">
                  Travel N World
                </div>
                <div className="text-xs text-[#93C5FD]">
                  B2B Travel Platform
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              India's most trusted B2B travel platform empowering travel agents
              with premium booking solutions and unbeatable rates.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-ocid={`footer.social.${label.toLowerCase()}.link`}
                  className={`p-2.5 rounded-lg transition-all duration-200 hover:text-white hover:scale-110 ${color}`}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Destinations", to: "/destinations" },
                { label: "Partner Registration", to: "/partner" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors flex items-center gap-2 hover:text-white break-words"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#93C5FD] opacity-60 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Flight Booking", to: "/flight-booking" },
                { label: "Hotel Booking", to: "/hotel-booking" },
                { label: "Domestic Packages", to: "/domestic-packages" },
                {
                  label: "International Packages",
                  to: "/international-packages",
                },
                { label: "Visa Assistance", to: "/visa-assistance" },
                { label: "Transport Services", to: "/transport-services" },
              ].map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-sm transition-colors flex items-center gap-2 hover:text-white break-words"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#93C5FD] opacity-60 flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#93C5FD] mt-0.5 flex-shrink-0" />
                <span
                  className="text-sm break-words"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Dwarka Mor, Vipin Garden, Nawada, Delhi – 110059
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#93C5FD] flex-shrink-0" />
                <a
                  href="tel:+917290087054"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  +91 7290087054
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#93C5FD] flex-shrink-0" />
                <a
                  href="mailto:info@travelnworld.in"
                  className="text-sm transition-colors hover:text-white break-all"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  info@travelnworld.in
                </a>
              </li>
            </ul>
            <div
              className="mt-6 p-4 rounded-xl border"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-[#93C5FD] text-xs font-semibold">
                24/7 Partner Support
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Always here to assist you
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            © {year} Travel N World. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
