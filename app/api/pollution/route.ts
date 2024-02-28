import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    // const lat = 35.14315;
    // const lon = -3.84803;
    const apiKey = process.env.WEATHER_API;
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const resp = await fetch(url);
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error in getting data ", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
