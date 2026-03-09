-- Fix overly permissive RLS policies
-- DROP the permissive INSERT and UPDATE policies
DROP POLICY "Anyone can create a payment record" ON public.payments;
DROP POLICY "Service role can update payments" ON public.payments;

-- INSERT: still allow anonymous but restrict to pending status only
CREATE POLICY "Anyone can create a pending payment"
  ON public.payments FOR INSERT
  WITH CHECK (payment_status = 'pending');

-- UPDATE: no client-side updates allowed (webhook uses service_role which bypasses RLS)
-- This means only the service_role key (used by edge functions) can update payments