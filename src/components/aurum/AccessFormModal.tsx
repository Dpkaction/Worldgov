import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import GoldButton from "./GoldButton";

// 🔗 Google Apps Script Web App URL from environment variables
const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 
  "https://script.google.com/macros/s/AKfycbz3yvN7WfSq4FUD6zUA9ss9TzwUhBHF4iGEeuiuR1kh39GaZ5Tf9twWps45D38qUUyX1Q/exec";

type FormState = {
  name: string;
  email: string;
  country: string;
  city: string;
  number: string;
  social: string;
  intent: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  country: "",
  city: "",
  number: "",
  social: "",
  intent: "",
};

interface AccessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "access" | "founding";
}

export const AccessFormModal = ({ isOpen, onClose, formType }: AccessFormModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  // Auto-fill founding member intent when form type is founding
  const volunteerMemberIntent = "I am applying for a volunteer member seat to help establish world peace government and build a legacy for social cause through royal connections, real asset gold, and independent power.";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    country: "",
    city: "",
    number: "",
    social: "",
    intent: formType === "founding" ? volunteerMemberIntent : "",
  });

  const steps = [
    { title: "Identity", fields: ["name", "email"] as (keyof FormState)[] },
    { title: "Location", fields: ["country", "city"] as (keyof FormState)[] },
    { title: "Channels", fields: ["number", "social"] as (keyof FormState)[] },
    { title: "Intent", fields: ["intent"] as (keyof FormState)[] },
  ];

  const totalSteps = steps.length;
  const progress = ((step + 1) / totalSteps) * 100;

  // Auto-fill founding member intent when modal opens
  useEffect(() => {
    if (isOpen && formType === "founding") {
      setForm(prev => ({
        ...prev,
        intent: volunteerMemberIntent
      }));
    } else if (isOpen && formType === "access") {
      setForm(prev => ({
        ...prev,
        intent: ""
      }));
    }
  }, [isOpen, formType]);

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep = () => {
    const required = steps[step].fields;
    for (const f of required) {
      if (f === "social") continue; // optional
      if (!form[f].trim()) return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) {
      setError("Please complete all required fields.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // JSON payload — keys match Apps Script sheet headers exactly
      const payload = {
        Name: form.name,
        Email: form.email,
        Country: form.country,
        City: form.city,
        Phone: form.number,
        Social: form.social,
        Intent: form.intent,
        Type: formType, // Add form type to distinguish between access and founding member applications
      };

      // text/plain avoids the CORS preflight; Apps Script reads e.postData.contents
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setStep(0);
    setSubmitted(false);
    setError(null);
    setSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-gold/30 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gold/60 hover:text-gold transition-colors"
        >
          <X size={20} />
        </button>

        {/* Gold shimmer line at top */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-gold/80">
              — {formType === "founding" ? "Volunteer Member" : "Private Access"} —
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl gradient-gold-text">
              {formType === "founding" ? "Become a Volunteer Member" : "Request Private membership access"}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {formType === "founding" 
                ? "Join the dedicated circle of volunteer members who help build the future of gold-backed finance."
                : "Apply for private membership access to the royal gold banking ecosystem."
              }
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl gradient-gold-text mb-4">
                Application Received
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Your request has been forwarded to the membership office. 
                A member of our team will respond in confidence within seven business days.
              </p>
              <GoldButton variant="outline" onClick={handleClose}>
                Close
              </GoldButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>
                    Step {String(step + 1).padStart(2, "0")} ·{" "}
                    <span className="text-gold">{steps[step].title}</span>
                  </span>
                  <span>
                    {String(step + 1).padStart(2, "0")} /{" "}
                    {String(totalSteps).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-gold/20">
                  <div
                    className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div key={step} className="space-y-6 animate-fade-in">
                {step === 0 && (
                  <>
                    <FormField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={(v) => update("name", v)}
                      placeholder="Your full legal name"
                      required
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(v) => update("email", v)}
                      placeholder="private@yourdomain.com"
                      required
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <FormField
                      label="Country"
                      name="country"
                      value={form.country}
                      onChange={(v) => update("country", v)}
                      placeholder="Country of residence"
                      required
                    />
                    <FormField
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={(v) => update("city", v)}
                      placeholder="City / region"
                      required
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormField
                      label="Phone Number"
                      name="number"
                      type="tel"
                      value={form.number}
                      onChange={(v) => update("number", v)}
                      placeholder="+00 000 000 0000"
                      required
                    />
                    <FormField
                      label="Social Media ID"
                      name="social"
                      value={form.social}
                      onChange={(v) => update("social", v)}
                      placeholder="@handle · LinkedIn · Telegram (optional)"
                    />
                  </>
                )}

                {step === 3 && (
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-gold/80">
                      Statement of Intent
                    </label>
                    
                    {/* Auto-filled indicator for founding members */}
                    {formType === "founding" && (
                      <div className="mb-4 p-3 border border-gold/20 bg-gold/5 rounded">
                        <p className="text-sm text-gold/80">
                          <span className="text-[10px] uppercase tracking-[0.2em]">👑 Founding Member:</span> 
                          <span className="ml-2">Intent auto-filled for founding member application</span>
                        </p>
                      </div>
                    )}
                    
                    <textarea
                      name="intent"
                      rows={5}
                      required
                      value={form.intent}
                      onChange={(e) => update("intent", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                      placeholder={
                        formType === "founding"
                          ? "We are on a journey to make world peace government, and establish foundation like never exist. If you want to build a legacy for social cause then become a founding member. We silently focus on royal connection, real asset gold, and independent power."
                          : "We are on a journey to make world peace government, and establish foundation like never exist. If you want to build a legacy for social cause then join our mission. We silently focus on royal connection, real asset gold, and independent power."
                      }
                      className="w-full border border-gold/20 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-gold focus:outline-none focus:shadow-[0_0_0_1px_hsl(43_70%_55%/0.4)]"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-center text-xs uppercase tracking-[0.25em] text-red-400 animate-fade-in">
                  {error}
                </p>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="flex-1 border border-gold/30 px-6 py-4 text-xs font-medium uppercase tracking-[0.3em] text-gold/60 transition-colors hover:border-gold hover:text-gold"
                  >
                    Back
                  </button>
                )}

                {step < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="flex-1 border border-gold px-6 py-4 text-xs font-medium uppercase tracking-[0.3em] text-gold transition-all duration-500 hover:bg-gold hover:text-background"
                  >
                    Continue <ArrowRight size={14} className="inline ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-gold to-gold/80 px-8 py-4 text-xs font-medium uppercase tracking-[0.3em] text-background shadow-lg transition-all duration-500 hover:shadow-gold disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Submit Application"}
                  </button>
                )}
              </div>

              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gold/60">
                Invite-only · Limited access · Long-term vision required
              </p>
            </form>
          )}
        </div>

        {/* Gold shimmer line at bottom */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
};

// Form Field Component
function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-[10px] uppercase tracking-[0.3em] text-gold/80 transition-colors"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className="w-full border border-gold/20 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-gold focus:outline-none focus:shadow-[0_0_0_1px_hsl(43_70%_55%/0.4)]"
      />
    </div>
  );
}

export default AccessFormModal;
