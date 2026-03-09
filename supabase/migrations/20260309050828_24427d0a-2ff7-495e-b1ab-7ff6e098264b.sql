CREATE POLICY "Allow updating payment status"
ON public.payments
FOR UPDATE
USING (true)
WITH CHECK (payment_status IN ('success', 'failed'));