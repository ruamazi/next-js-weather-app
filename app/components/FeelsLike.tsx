"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../context/globalContext";
import { thermometerIcon } from "../utils/Icons";
import { kelvinToCelsius } from "../utils/misc";

const FeelsLike = () => {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  interface forecastMainType {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  }

  const {
    feels_like: feelsLike,
    temp_min: minTemp,
    temp_max: maxTemp,
  }: forecastMainType = forecast?.main;

  interface feelsLikeType {
    feelsLike: number;
    minTemp: number;
    maxTemp: number;
  }

  const feelsLikeText = ({
    feelsLike,
    minTemp,
    maxTemp,
  }: feelsLikeType): string => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText({ feelsLike, minTemp, maxTemp });

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometerIcon} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feelsLike)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
};

export default FeelsLike;
