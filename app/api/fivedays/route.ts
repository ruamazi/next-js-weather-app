import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.WEATHER_API;
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    // const lat = 35.14315;
    // const lon = -3.84803;

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });
    const dailyData = await dailyRes.json();

    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data ");
    return new Response("Error in getting daily data ", { status: 500 });
  }
}
