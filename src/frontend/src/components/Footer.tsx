import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Plane } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ background: "oklch(22 0.08 265)" }} className="text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="p-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <Plane className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">
                  Travel N World
                </div>
                <div className="text-xs text-gold">B2B Travel Platform</div>
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
            <div className="flex items-center gap-3">
              {[
                { icon: SiFacebook, href: "#", label: "Facebook" },
                { icon: SiInstagram, href: "#", label: "Instagram" },
                { icon: SiX, href: "#", label: "X" },
                { icon: SiLinkedin, href: "#", label: "LinkedIn" },
                { icon: SiYoutube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 rounded-lg transition-colors hover:text-gold"
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
                    className="text-sm transition-colors flex items-center gap-2 hover:text-gold"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50" />
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
                "Flight Booking",
                "Hotel Booking",
                "Domestic Packages",
                "International Packages",
                "Visa Assistance",
                "Transport Services",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-sm transition-colors flex items-center gap-2 hover:text-gold"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-50" />
                    {s}
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
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  123 Travel House, Connaught Place, New Delhi – 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <a
                  href="tel:+919999999999"
                  className="text-sm transition-colors hover:text-gold"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@travelnworld.in"
                  className="text-sm transition-colors hover:text-gold"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  info@travelnworld.in
                </a>
              </li>
            </ul>
            <div
              className="mt-6 p-4 rounded-xl border"
              style={{
                background: "rgba(var(--accent), 0.1)",
                borderColor: "rgba(var(--accent), 0.2)",
              }}
            >
              <p className="text-gold text-xs font-semibold">
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
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            © {year} Travel N World. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
              style={{ color: "rgba(var(--accent), 0.7)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
