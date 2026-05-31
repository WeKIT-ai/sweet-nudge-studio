import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Sparkles,
  FileText,
  Target,
  Brain,
  Compass,
  BarChart3,
  Loader2,
} from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const FEATURES = [
  { icon: Brain, text: "Full psychometric assessment" },
  { icon: Compass, text: "Ikigai purpose profile" },
  { icon: Target, text: "Strengths radar" },
  { icon: BarChart3, text: "Career match insights" },
  { icon: FileText, text: "Downloadable PDF report" },
  { icon: Sparkles, text: "AI-generated career insights" },
];

const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    phone: "",
    age: "",
    school: "",
    city: "",
    scholarship_code: "",
  });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!form.user_name || !form.email || !form.phone) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(form.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: form,
        }
      );

      if (error || !data?.order_id) {
        toast.error("Failed to create payment order. Please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "WeKIT Mentoring",
        description: "AI Career Discovery Assessment",
        order_id: data.order_id,
        prefill: {
          name: form.user_name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          product: "WeKIT AI Career Discovery Assessment",
        },
        theme: {
          color: "#00665B",
        },
        handler: async (response: any) => {
          // Payment successful — update local record
          const { error: updateError } = await supabase
            .from("payments")
            .update({
              razorpay_payment_id: response.razorpay_payment_id,
              payment_status: "success",
            })
            .eq("razorpay_order_id", response.razorpay_order_id);

          if (updateError) {
            console.error("Error updating payment:", updateError);
          }

          // Store payment info for gating
          localStorage.setItem("wekit_payment_email", form.email);
          localStorage.setItem("wekit_payment_order", response.razorpay_order_id);

          navigate("/payment-success");
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled. You can try again when ready.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setLoading(false);
        toast.error(
          `Payment failed: ${response.error.description}. Please try again.`
        );
      });
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Unlock Your Career Report — ₹1,500 | WeKIT™"
        description="Complete the WeKIT AI Career Discovery Assessment and unlock your personalized career DNA report in 12 minutes."
        path="/payment"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
          <WeKitLogo size="sm" />
          <Badge variant="secondary" className="gap-1 text-xs">
            <Shield className="h-3 w-3" /> Secure Payment
          </Badge>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" /> Limited Time Offer
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Discover Your Purpose with WeKIT
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            AI Career Discovery Assessment — unlock your career DNA in 12 minutes
          </p>
        </motion.div>

        <h2 className="sr-only">Plan and checkout</h2>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* What you get */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  What you'll get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{f.text}</span>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      ₹1,500
                    </span>
                    <span className="text-muted-foreground text-sm">
                      one-time
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Includes full assessment + downloadable report + dashboard access
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-card/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={form.user_name}
                    onChange={(e) => updateField("user_name", e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    maxLength={255}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    maxLength={15}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-foreground">Age</Label>
                    <Input
                      id="age"
                      placeholder="e.g. 17"
                      value={form.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      maxLength={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground">City</Label>
                    <Input
                      id="city"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      maxLength={100}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school" className="text-foreground">School / College</Label>
                  <Input
                    id="school"
                    placeholder="Your school or college"
                    value={form.school}
                    onChange={(e) => updateField("school", e.target.value)}
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scholarship" className="text-foreground">Scholarship Code (optional)</Label>
                  <Input
                    id="scholarship"
                    placeholder="Enter code if you have one"
                    value={form.scholarship_code}
                    onChange={(e) => updateField("scholarship_code", e.target.value)}
                    maxLength={50}
                  />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full h-14 text-base font-semibold mt-4"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Unlock My Full Career Report — ₹1,500
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                  <Shield className="h-3 w-3" />
                  <span>Secured by Razorpay · 256-bit encryption</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
