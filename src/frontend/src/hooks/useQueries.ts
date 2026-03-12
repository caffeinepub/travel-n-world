import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitPartnerRegistration() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      companyName: string;
      phone: string;
      email: string;
      city: string;
      businessType: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitPartnerRegistration(
        data.name,
        data.companyName,
        data.phone,
        data.email,
        data.city,
        data.businessType,
      );
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.message,
      );
    },
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.subscribeNewsletter(email);
    },
  });
}
