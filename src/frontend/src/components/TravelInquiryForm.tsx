import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";

type InquiryStatus = "idle" | "loading" | "success";

export function TravelInquiryForm() {
  const [status, setStatus] = useState<InquiryStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    message: "",
  });

  const set =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      const lead = {
        id: Date.now(),
        customer: form.name,
        phone: form.phone,
        email: form.email,
        destination: form.destination,
        budget: form.budget,
        travelDate: form.travelDate,
        travelers: Number(form.travelers),
        message: form.message,
        leadSource: "Website Form",
        status: "Active",
        isNew: true,
        date: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("travel_leads") || "[]");
      localStorage.setItem("travel_leads", JSON.stringify([lead, ...existing]));
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({
          name: "",
          phone: "",
          email: "",
          destination: "",
          travelDate: "",
          travelers: "",
          budget: "",
          message: "",
        });
      }, 3000);
    }, 500);
  };

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 bg-white";
  const inputStyle = { borderColor: "#e5e7eb", color: "#111827" };
  const labelStyle = {
    color: "#374151",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "6px",
    display: "block",
  };

  if (status === "success") {
    return (
      <div
        data-ocid="inquiry.success_state"
        className="flex flex-col items-center gap-5 py-10 px-6 text-center"
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(22,163,74,0.1)" }}
        >
          <CheckCircle2 className="w-8 h-8" style={{ color: "#16a34a" }} />
        </div>
        <div>
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "#111827", fontFamily: "Poppins, sans-serif" }}
          >
            Inquiry Submitted!
          </h3>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Your travel inquiry has been submitted! Our team will contact you
            shortly.
          </p>
        </div>
        <a
          data-ocid="inquiry.whatsapp.button"
          href={`https://wa.me/917290087054?text=${encodeURIComponent(`Hi, I submitted a travel inquiry for ${form.destination || "your destination"}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
          style={{ background: "#16a34a" }}
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      data-ocid="inquiry.form"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8"
      style={{
        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="inquiry-name" style={labelStyle}>
            Full Name *
          </label>
          <input
            id="inquiry-name"
            data-ocid="inquiry.name.input"
            type="text"
            className={inputCls}
            style={inputStyle}
            placeholder="Your full name"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="inquiry-phone" style={labelStyle}>
            Phone Number *
          </label>
          <input
            id="inquiry-phone"
            data-ocid="inquiry.phone.input"
            type="tel"
            className={inputCls}
            style={inputStyle}
            placeholder="+91 98XXXXXX"
            value={form.phone}
            onChange={set("phone")}
            required
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="inquiry-email" style={labelStyle}>
            Email Address *
          </label>
          <input
            id="inquiry-email"
            data-ocid="inquiry.email.input"
            type="email"
            className={inputCls}
            style={inputStyle}
            placeholder="you@email.com"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
        {/* Destination */}
        <div>
          <label htmlFor="inquiry-destination" style={labelStyle}>
            Destination *
          </label>
          <input
            id="inquiry-destination"
            data-ocid="inquiry.destination.input"
            type="text"
            className={inputCls}
            style={inputStyle}
            placeholder="e.g. Dubai, Goa, Manali"
            value={form.destination}
            onChange={set("destination")}
            required
          />
        </div>
        {/* Travel Date */}
        <div>
          <label htmlFor="inquiry-date" style={labelStyle}>
            Travel Date *
          </label>
          <input
            id="inquiry-date"
            data-ocid="inquiry.date.input"
            type="date"
            className={inputCls}
            style={inputStyle}
            value={form.travelDate}
            onChange={set("travelDate")}
            required
          />
        </div>
        {/* Number of Travelers */}
        <div>
          <label htmlFor="inquiry-travelers" style={labelStyle}>
            Number of Travelers *
          </label>
          <input
            id="inquiry-travelers"
            data-ocid="inquiry.travelers.input"
            type="number"
            min={1}
            className={inputCls}
            style={inputStyle}
            placeholder="e.g. 2"
            value={form.travelers}
            onChange={set("travelers")}
            required
          />
        </div>
        {/* Budget */}
        <div className="md:col-span-2">
          <label htmlFor="inquiry-budget" style={labelStyle}>
            Budget *
          </label>
          <select
            id="inquiry-budget"
            data-ocid="inquiry.budget.select"
            className={inputCls}
            style={inputStyle}
            value={form.budget}
            onChange={set("budget")}
            required
          >
            <option value="">Select your budget</option>
            <option value="Under ₹30,000">Under ₹30,000</option>
            <option value="₹30,000–₹60,000">₹30,000–₹60,000</option>
            <option value="₹60,000–₹1,00,000">₹60,000–₹1,00,000</option>
            <option value="₹1,00,000–₹2,00,000">₹1,00,000–₹2,00,000</option>
            <option value="Above ₹2,00,000">Above ₹2,00,000</option>
          </select>
        </div>
        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="inquiry-message" style={labelStyle}>
            Message / Special Request
          </label>
          <textarea
            id="inquiry-message"
            data-ocid="inquiry.message.textarea"
            className={`${inputCls} resize-none`}
            style={{ ...inputStyle, minHeight: "90px" }}
            placeholder="Any special requests or requirements..."
            value={form.message}
            onChange={set("message")}
          />
        </div>
      </div>

      <Button
        type="submit"
        data-ocid="inquiry.submit_button"
        disabled={status === "loading"}
        className="w-full h-12 mt-2 font-bold rounded-xl text-base text-white border-0 transition-all hover:opacity-90"
        style={{ background: "#1E40AF" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Inquiry →"
        )}
      </Button>
    </form>
  );
}
