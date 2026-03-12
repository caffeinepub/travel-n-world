import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}
