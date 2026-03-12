import { useMutation } from "@tanstack/react-query";

// Forms work locally since email integration is disabled.
// Mutations simulate a short async delay and resolve successfully.

async function simulateSubmit(delayMs = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export function useSubmitPartnerRegistration() {
  return useMutation({
    mutationFn: async (_data: {
      name: string;
      companyName: string;
      phone: string;
      email: string;
      city: string;
      businessType: string;
    }) => {
      await simulateSubmit();
    },
  });
}

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: async (_data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      await simulateSubmit();
    },
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (_email: string) => {
      await simulateSubmit(600);
    },
  });
}
