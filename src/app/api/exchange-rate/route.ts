import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/AED');
    const data = await response.json();
    
    // Extract TRY (Turkish Lira) rate
    const rate = data.rates.TRY;
    
    return NextResponse.json({ rate });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch exchange rate' }, { status: 500 });
  }
}