import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import WeKitLogo from "@/components/WeKitLogo";
import SEO from "@/components/SEO";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          navigate("/assessment");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO
        title="Payment Successful | WeKIT™ Career Clarity 360"
        description="Your payment is confirmed. Get ready to begin your WeKIT Career Discovery Assessment."
        path="/payment-success"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 bg-card/80 backdrop-blur text-center">
          <CardContent className="pt-10 pb-8 px-6 space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </motion.div>

            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Payment Successful
              </h1>
              <p className="text-lg text-primary font-semibold">
                Welcome to WeKIT
              </p>
            </div>

            <p className="text-muted-foreground text-sm">
              You now have access to the full AI Career Discovery Assessment.
              <br />
              You will be redirected to begin your assessment.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/assessment")}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Sparkles className="h-5 w-5" />
                Start Assessment
                <ArrowRight className="h-5 w-5" />
              </Button>

              <p className="text-xs text-muted-foreground">
                Auto-redirecting in {countdown}s...
              </p>
            </div>

            <div className="pt-4 border-t border-border/50">
              <WeKitLogo size="sm" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
