import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, MessageCircle, X } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  destinationName?: string;
}

export default function BookingModal({
  open,
  onClose,
  destinationName = "",
}: BookingModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    destination: destinationName,
    travelDate: "",
    travelers: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync destination when modal opens with new destination
  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setForm((prev) => ({ ...prev, destination: destinationName }));
      setSubmitted(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lead = {
      id: Date.now(),
      customer: form.fullName,
      destination: form.destination,
      travelDate: form.travelDate,
      travelers: Number.parseInt(form.travelers) || 1,
      budget: form.budget || "Not specified",
      phone: form.phone,
      email: form.email,
      message: form.message,
      assignedTo: "",
      submittedAt: new Date().toISOString(),
      isNew: true,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("travel_leads") || "[]");
      localStorage.setItem("travel_leads", JSON.stringify([lead, ...existing]));
    } catch {
      // ignore storage errors
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      fullName: "",
      phone: "",
      email: "",
      destination: destinationName,
      travelDate: "",
      travelers: "",
      budget: "",
      message: "",
    });
    onClose();
  };

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in booking ${form.destination || destinationName}`,
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        handleOpen(o);
        if (!o) handleClose();
      }}
    >
      <DialogContent
        data-ocid="booking.modal"
        className="max-w-[500px] w-full p-0 overflow-hidden rounded-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Book Your Trip
              </DialogTitle>
              {(form.destination || destinationName) && (
                <p className="text-sm text-blue-600 font-medium mt-0.5">
                  📍 {form.destination || destinationName}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          {submitted ? (
            /* Success State */
            <div
              data-ocid="booking.success_state"
              className="flex flex-col items-center text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-9 w-9 text-green-500" />
              </div>
              <h3
                className="text-xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Inquiry Submitted Successfully!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[340px]">
                Your travel inquiry has been submitted successfully. Our travel
                expert will contact you shortly.
              </p>
              <a
                href={`https://wa.me/917290087054?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  data-ocid="booking.whatsapp_button"
                  className="w-full h-11 rounded-xl font-semibold text-white gap-2"
                  style={{ background: "#25D366" }}
                  type="button"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Button
                data-ocid="booking.close_button"
                variant="outline"
                className="w-full mt-3 h-11 rounded-xl font-medium"
                onClick={handleClose}
                type="button"
              >
                Close
              </Button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="bm-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bm-name"
                    data-ocid="booking.name_input"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    required
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="h-10 rounded-xl border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="bm-phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bm-phone"
                    data-ocid="booking.phone_input"
                    type="tel"
                    placeholder="+91 98XXXXXXXX"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="h-10 rounded-xl border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="bm-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bm-email"
                  data-ocid="booking.email_input"
                  type="email"
                  placeholder="yourname@email.com"
                  required
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-10 rounded-xl border-gray-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="bm-dest"
                  className="text-sm font-medium text-gray-700"
                >
                  Destination Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bm-dest"
                  data-ocid="booking.destination_input"
                  type="text"
                  placeholder="e.g. Dubai"
                  required
                  value={form.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  className="h-10 rounded-xl border-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="bm-date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Travel Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bm-date"
                    data-ocid="booking.date_input"
                    type="date"
                    required
                    value={form.travelDate}
                    onChange={(e) => handleChange("travelDate", e.target.value)}
                    className="h-10 rounded-xl border-gray-200"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="bm-travelers"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number of Travelers <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bm-travelers"
                    data-ocid="booking.travelers_input"
                    type="number"
                    placeholder="e.g. 2"
                    required
                    min={1}
                    value={form.travelers}
                    onChange={(e) => handleChange("travelers", e.target.value)}
                    className="h-10 rounded-xl border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="bm-budget"
                  className="text-sm font-medium text-gray-700"
                >
                  Budget{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="bm-budget"
                  data-ocid="booking.budget_input"
                  type="text"
                  placeholder="e.g. ₹50,000"
                  value={form.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="h-10 rounded-xl border-gray-200"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="bm-message"
                  className="text-sm font-medium text-gray-700"
                >
                  Message / Special Request{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="bm-message"
                  data-ocid="booking.message_textarea"
                  placeholder="Any special requirements, preferences, or questions..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="rounded-xl border-gray-200 resize-none"
                  rows={3}
                />
              </div>

              <div className="pt-1 pb-2">
                <Button
                  data-ocid="booking.submit_button"
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl font-bold text-white text-base gap-2"
                  style={{ background: "#1E40AF" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
