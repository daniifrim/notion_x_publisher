import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(
  req: NextRequest
) {
  return NextResponse.json({
    name: 'Notion X Publisher API',
    version: '1.0.0',
    endpoints: {
      '/api/webhook': 'POST - Handle Notion webhook events',
      '/api/publish': 'GET - Handle scheduled tasks (tweet publishing, draft processing, content scraping)'
    }
  });
} 