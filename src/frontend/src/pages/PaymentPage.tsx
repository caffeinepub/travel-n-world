import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearch } from "@tanstack/react-router";
import {
  Check,
  CheckCircle,
  Copy,
  Home,
  Loader2,
  Shield,
  Smartphone,
  Star,
  Upload,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

const PLAN_DETAILS = {
  starter: {
    name: "Starter Plan",
    price: "\u20b93,000",
    amount: 3000,
    duration: "3 Months",
    icon: Zap,
    features: [
      "Verified listing in partner directory",
      "Lead inquiries from customers",
      "Access to exclusive travel deals",
      "Dedicated partner support",
      "Basic partner profile page",
    ],
  },
  professional: {
    name: "Professional Plan",
    price: "\u20b96,000",
    amount: 6000,
    duration: "6 Months",
    icon: Star,
    features: [
      "Verified listing in partner directory",
      "Priority leads \u2014 first access",
      "Marketing support & promotions",
      "Partner dashboard & analytics",
      "Enhanced profile visibility",
      "Featured in search results",
    ],
  },
  premium: {
    name: "Premium Plan",
    price: "\u20b912,000",
    amount: 12000,
    duration: "1 Year",
    icon: Shield,
    features: [
      "Verified listing in partner directory",
      "Featured partner badge",
      "Top search visibility",
      "Priority leads \u2014 exclusive access",
      "Dedicated account manager",
      "Social media promotion",
      "Annual performance review",
    ],
  },
};

const UPI_ID = "travelnworld@upi";

export default function PaymentPage() {
  const search = useSearch({ strict: false }) as { plan?: string };
  const planKey = (search?.plan || "starter") as keyof typeof PLAN_DETAILS;
  const plan = PLAN_DETAILS[planKey] || PLAN_DETAILS.starter;
  const PlanIcon = plan.icon;

  const [copied, setCopied] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotName, setScreenshotName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setScreenshot(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!transactionId.trim())
      errs.transactionId = "Transaction ID is required";
    if (!screenshot) errs.screenshot = "Payment screenshot is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const record = {
        id: `PR-${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        plan: planKey,
        planLabel: plan.name,
        amount: plan.price,
        transactionId: transactionId.trim(),
        screenshot: screenshot || "",
        submittedAt: new Date().toISOString(),
        status: "pending" as const,
      };
      const existing = JSON.parse(
        localStorage.getItem("tnw_payment_requests") || "[]",
      );
      existing.unshift(record);
      localStorage.setItem("tnw_payment_requests", JSON.stringify(existing));
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div
          className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center"
          data-ocid="payment.success_state"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Payment Request Submitted!
          </h2>
          <p className="text-gray-600 mb-2">
            Our team will verify your payment and activate your{" "}
            <strong>{plan.name}</strong> within 24 hours.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            You will be notified once your B2B membership is activated.
          </p>
          <Link to="/">
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold"
              data-ocid="payment.home.button"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="text-gray-500 mt-2">
            Secure UPI payment for your B2B membership plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left \u2013 Plan Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <PlanIcon className="w-6 h-6" style={{ color: "#1E40AF" }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Selected Plan
                  </p>
                  <h2 className="text-lg font-bold text-gray-900">
                    {plan.name}
                  </h2>
                </div>
              </div>

              <div
                className="rounded-xl p-4 mb-5 text-white"
                style={{
                  background: "linear-gradient(135deg, #1E40AF, #1d4ed8)",
                }}
              >
                <p className="text-sm opacity-80">Total Amount</p>
                <p className="text-3xl font-bold">{plan.price}</p>
                <p className="text-sm opacity-80 mt-1">
                  {plan.duration} Access
                </p>
              </div>

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right \u2013 Payment Steps */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Send UPI Payment
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-2">
                    UPI Payment ID
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-blue-800 flex-1 break-all">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0"
                      data-ocid="payment.copy.button"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <Smartphone className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">
                        Payment Instructions
                      </p>
                      <p className="text-sm text-amber-700">
                        Open any UPI app (GPay, PhonePe, Paytm, BHIM), search
                        for the UPI ID above, and send exactly{" "}
                        <strong>{plan.price}</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Upload Payment Screenshot
                  </h3>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  data-ocid="payment.upload_button"
                />

                {screenshot ? (
                  <div className="relative">
                    <img
                      src={screenshot}
                      alt="Payment screenshot"
                      className="w-full max-h-64 object-contain rounded-xl border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setScreenshot(null);
                        setScreenshotName("");
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      \u00d7
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      {screenshotName}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-8 text-center transition-colors"
                    data-ocid="payment.dropzone"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700">
                      Click to upload screenshot
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, or WebP up to 5MB
                    </p>
                  </button>
                )}
                {errors.screenshot && (
                  <p
                    className="text-red-500 text-sm mt-2"
                    data-ocid="payment.screenshot.error_state"
                  >
                    {errors.screenshot}
                  </p>
                )}
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Your Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="pay-name"
                      className="text-gray-700 font-medium"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="pay-name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                      data-ocid="payment.name.input"
                    />
                    {errors.name && (
                      <p
                        className="text-red-500 text-sm mt-1"
                        data-ocid="payment.name.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="pay-phone"
                      className="text-gray-700 font-medium"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="pay-phone"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                      data-ocid="payment.phone.input"
                    />
                    {errors.phone && (
                      <p
                        className="text-red-500 text-sm mt-1"
                        data-ocid="payment.phone.error_state"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="pay-txn"
                      className="text-gray-700 font-medium"
                    >
                      UPI Transaction ID / Reference Number *
                    </Label>
                    <Input
                      id="pay-txn"
                      placeholder="e.g. 423987654321"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="mt-1"
                      data-ocid="payment.transaction.input"
                    />
                    {errors.transactionId && (
                      <p
                        className="text-red-500 text-sm mt-1"
                        data-ocid="payment.transaction.error_state"
                      >
                        {errors.transactionId}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4 \u2013 Submit */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Submit Payment Confirmation
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-5">
                  After submitting, our team will verify your payment within 24
                  hours and activate your <strong>{plan.name}</strong>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-3"
                  data-ocid="payment.submit_button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Payment Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
