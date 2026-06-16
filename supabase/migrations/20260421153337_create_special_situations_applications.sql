/*
  # Create special situations applications table

  1. New Tables
    - `special_situations_applications`
      - `id` (uuid, primary key)
      - `company_name` (text) - company name from slide 1
      - `country` (text) - country from slide 1
      - `jurisdiction` (text) - jurisdiction from slide 1
      - `industry` (text) - selected industry from slide 1
      - `role` (text) - applicant's role from slide 2
      - `situation_group` (text) - special situation category from slide 2
      - `situation_description` (text) - description from slide 3
      - `deal_size` (text) - deal size range from slide 3
      - `urgency` (text) - urgency level from slide 3
      - `data_confirmed` (boolean) - consent: data is correct
      - `has_authority` (boolean) - consent: has authority to share
      - `consent_personal_data` (boolean) - consent: personal data processing
      - `created_at` (timestamptz) - submission timestamp

  2. Security
    - Enable RLS on `special_situations_applications` table
    - Add policy for anonymous inserts (public form)
    - No select/update/delete for public users
*/

CREATE TABLE IF NOT EXISTS special_situations_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  jurisdiction text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  situation_group text NOT NULL DEFAULT '',
  situation_description text NOT NULL DEFAULT '',
  deal_size text NOT NULL DEFAULT '',
  urgency text NOT NULL DEFAULT '',
  data_confirmed boolean NOT NULL DEFAULT false,
  has_authority boolean NOT NULL DEFAULT false,
  consent_personal_data boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE special_situations_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous form submissions"
  ON special_situations_applications
  FOR INSERT
  TO anon
  WITH CHECK (
    data_confirmed = true
    AND has_authority = true
    AND consent_personal_data = true
  );
