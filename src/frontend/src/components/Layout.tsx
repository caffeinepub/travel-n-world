import { Toaster } from "@/components/ui/sonner";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top on every route change
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
  }, [location.pathname]);

  if (isAdminRoute) {
    return (
      <>
        <Outlet />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}
