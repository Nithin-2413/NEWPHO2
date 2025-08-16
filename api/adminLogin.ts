import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const adminLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { username, password, location } = adminLoginSchema.parse(req.body);
    
    // Simple hardcoded admin credentials
    if (username === 'SonuHoney' && password === 'Chipmunk@15#') {
      // Log the admin login with location data
      if (location) {
        try {
          const locationString = `${location.city || 'Unknown City'}, ${location.country || 'Unknown Country'} (${location.latitude}, ${location.longitude})`;
          await supabaseAdmin
            .from('admin_logins')
            .insert([{
              location: locationString,
              ip_address: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown',
              user_agent: req.headers['user-agent'] || 'unknown'
            }]);
        } catch (logError) {
          console.error('Failed to log admin login:', logError);
          // Don't fail the login if logging fails
        }
      }
      
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(400).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Login failed' 
    });
  }
}