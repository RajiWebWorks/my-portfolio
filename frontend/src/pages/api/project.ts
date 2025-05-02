// src/pages/api/projects.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const backendResponse = await fetch('https://my-portfolio-vqy5.onrender.com/api/projects');
    const data = await backendResponse.json();
    
    // Forward the response with CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}