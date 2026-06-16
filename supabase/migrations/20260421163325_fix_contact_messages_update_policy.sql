/*
  # Fix contact_messages UPDATE policy security issue

  ## Summary
  Remove the overly permissive UPDATE policy on contact_messages that has
  USING (true), which allows any authenticated user to update any row.

  ## Changes
  1. Drop policy "Authenticated users can update status only" (USING clause is always true)
  2. No replacement policy needed -- table management is done server-side via service role

  ## Security Impact
  - Authenticated users can NO LONGER update contact messages
  - Only service role (Edge Functions) can modify messages
  - INSERT policy for form submissions remains unchanged
*/

DROP POLICY IF EXISTS "Authenticated users can update status only" ON contact_messages;
