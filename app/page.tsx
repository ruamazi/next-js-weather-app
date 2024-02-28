import AirPollution from "./components/AirPollution";
import DailyForecast from "./components/DailyForecast";
import FeelsLike from "./components/FeelsLike";
import Humidity from "./components/Humidity";
import Navbar from "./components/Navbar";
import Population from "./components/Population";
import Pressure from "./components/Pressure";
import Sunset from "./components/Sunset";
import Temperature from "./components/Temperature";
import UvIndex from "./components/UvIndex";
import Visibility from "./components/Visibility";
import Wind from "./components/Wind";
import FiveDayForecast from "./components/FiveDayForecast";
import Mapbox from "./components/Mapbox";
import FavCities from "./components/FavCities";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <FavCities />
          </div>
        </div>
      </div>

      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by -
          <a
            href="https://github.com/ruamazi"
            target="_blank"
            className=" text-green-300 font-bold"
          >
            M.A
          </a>
        </p>
      </footer>
    </main>
  );
}
