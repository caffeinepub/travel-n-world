import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Destinations", to: "/destinations" },
  { label: "Partners", to: "/partners" },
  { label: "Partner Registration", to: "/partner" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPath is a router-derived value
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-royal-100"
          : "shadow-sm border-b border-royal-50"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.link.1"
          >
            <div className="flex-shrink-0">
              <img
                src="/assets/generated/tnw-logo-transparent.dim_120x120.png"
                alt="Travel N World Logo"
                height={36}
                style={{ height: 36, width: "auto" }}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight font-display text-primary">
                Travel N World
              </span>
              <span className="text-xs leading-tight font-semibold text-gold">
                B2B Travel Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.link.${i + 1}`}
                className={`nav-link px-3.5 py-2 text-sm font-medium rounded-lg transition-colors font-display ${
                  currentPath === link.to
                    ? "text-primary font-semibold active"
                    : "text-gray-700 hover:text-primary hover:bg-royal-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              data-ocid="nav.primary_button"
              className="red-gradient hover:opacity-90 text-white font-semibold shadow-red border-0 rounded-xl px-6 transition-opacity"
            >
              <Link to="/partner">
                Join Now <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl transition-colors text-primary hover:bg-royal-50"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-royal-100 shadow-blue-lg">
          <div className="container-custom py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.link.${i + 1}`}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "bg-royal-100 text-primary font-semibold"
                    : "text-gray-700 hover:bg-royal-50 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-royal-100 mt-2">
              <Button
                asChild
                data-ocid="nav.primary_button"
                className="w-full red-gradient hover:opacity-90 text-white font-semibold border-0 rounded-xl transition-opacity"
              >
                <Link to="/partner">Join Now — It's Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
