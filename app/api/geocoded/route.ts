import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.WEATHER_API;
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const resp = await fetch(url);
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
