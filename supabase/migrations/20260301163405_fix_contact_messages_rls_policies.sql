/*
  # Fix RLS Policies for contact_messages Table

  ## Summary
  Secure the contact_messages table by removing overly permissive policies.
  The contact form is handled server-side via Edge Function and only sends to Telegram,
  so public INSERT access is not needed.

  ## Changes Made

  1. **Removed Policies**
     - "Anyone can submit contact messages" - Public INSERT policy (not needed, form uses Edge Function)
     - "Authenticated users can view messages" - Too permissive SELECT policy
     - "Authenticated users can update message status" - Too permissive UPDATE policy

  2. **New Restrictive Policies**
     - No public access for INSERT, SELECT, UPDATE, or DELETE
     - Only service role can perform operations (for future admin dashboard)
     - This means the table is fully locked down by RLS

  ## Security Impact
  - ✅ Anonymous users CANNOT insert messages directly (already handled by Edge Function)
  - ✅ Regular authenticated users CANNOT read contact messages
  - ✅ Regular authenticated users CANNOT modify or delete messages
  - ✅ Only server-side code with service role can manage messages
  - ✅ Contact form continues to work (uses Edge Function → Telegram)

  ## Important Notes
  - The contact form submission flow is NOT affected (it uses Edge Function only)
  - If you need an admin dashboard later, create specific policies with role checks
  - Service role access remains available for server-side operations
*/

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update message status" ON contact_messages;

-- No new policies needed - table is now fully locked down by RLS
-- Only service role (server-side) can access the table
-- This is secure by default and can be opened up later with specific admin policies if needed