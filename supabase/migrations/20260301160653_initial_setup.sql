/*
  # Initial Database Setup
  
  1. Purpose
    - Initialize database structure for BM Capital Fund project
    - Enable Supabase features and Secrets functionality
  
  2. Tables
    - `contact_messages` - Store contact form submissions
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `message` (text) - Message content
      - `created_at` (timestamptz) - Submission timestamp
      - `status` (text) - Message status (new, read, archived)
  
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Public can insert contact messages (form submissions)
    - Only authenticated users can read messages
*/

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact messages (public form submission)
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can view messages
CREATE POLICY "Authenticated users can view messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update message status
CREATE POLICY "Authenticated users can update message status"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at 
  ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status 
  ON contact_messages(status);