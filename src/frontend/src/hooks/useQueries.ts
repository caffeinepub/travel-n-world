import { savePartnerRegistration } from "@/lib/partnerStore";
import { useMutation } from "@tanstack/react-query";

export function useSubmitPartnerRegistration() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      companyName: string;
      phone: string;
      email: string;
      city: string;
      experience: string;
    }) => {
      // Small delay for UX feedback
      await new Promise((r) => setTimeout(r, 600));
      savePartnerRegistration({
        name: data.name,
        company: data.companyName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        experience: data.experience,
      });
    },
  });
}

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      await new Promise((r) => setTimeout(r, 800));
      try {
        const existing = JSON.parse(
          localStorage.getItem("tnw_booking_inquiries") || "[]",
        );
        const inquiry = {
          id: Date.now(),
          customerName: data.name,
          phone: data.phone,
          email: data.email,
          destination: data.subject || "General Inquiry",
          travelDate: "",
          travelers: "",
          budget: "",
          message: data.message,
          date: new Date().toLocaleDateString("en-IN"),
          status: "new",
          source: "Contact Form",
          isNew: true,
        };
        localStorage.setItem(
          "tnw_booking_inquiries",
          JSON.stringify([inquiry, ...existing]),
        );
      } catch {
        // silently ignore storage errors
      }
    },
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (_email: string) => {
      await new Promise((r) => setTimeout(r, 600));
    },
  });
}
