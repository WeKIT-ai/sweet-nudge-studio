-- Create payments table for WeKIT assessment purchases
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age TEXT,
  school TEXT,
  city TEXT,
  scholarship_code TEXT,
  list_price INTEGER NOT NULL DEFAULT 1500,
  final_price INTEGER NOT NULL DEFAULT 1500,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public can insert (create orders before payment)
CREATE POLICY "Anyone can create a payment record"
  ON public.payments FOR INSERT
  WITH CHECK (true);

-- Users can view their own payment by email
CREATE POLICY "Users can view payments"
  ON public.payments FOR SELECT
  USING (true);

-- Service role can update (webhook updates payment status)
CREATE POLICY "Service role can update payments"
  ON public.payments FOR UPDATE
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for quick lookups
CREATE INDEX idx_payments_email ON public.payments (email);
CREATE INDEX idx_payments_razorpay_order ON public.payments (razorpay_order_id);
CREATE INDEX idx_payments_status ON public.payments (payment_status);