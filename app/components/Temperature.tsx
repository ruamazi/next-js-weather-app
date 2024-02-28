"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import {
  clearSkyIcon,
  cloudyIcon,
  drizzleIcon,
  navigationIcon,
  rainIcon,
  snowIcon,
  thunderIcon,
} from "../utils/Icons";
import { kelvinToCelsius } from "../utils/misc";
import moment from "moment";

const Temperature = () => {
  const { forecast } = useGlobalContext();
  const [localTime, setLocalTime] = useState<string>("");
  // const [currentDay, setCurrentDay] = useState<string>("");

  const { main, timezone, name: cityName, weather } = forecast;
  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }
  const { main: weatherMain, description } = weather[0];

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rainIcon;
      case "Snow":
        return snowIcon;
      case "Clear":
        return clearSkyIcon;
      case "Clouds":
        return cloudyIcon;
      case "Thunderstorm":
        return thunderIcon;
      default:
        return clearSkyIcon;
    }
  };
  const localMoment = moment().utcOffset(timezone / 60);
  const formattedTime = localMoment.format("HH:mm");
  const day = localMoment.format("dddd");

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const localMoment = moment().utcOffset(timezone / 60);
  //       const formattedTime = localMoment.format("HH:mm:ss");
  //       const day = localMoment.format("dddd");
  //       setLocalTime(formattedTime);
  //       setCurrentDay(day);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [timezone]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
      justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{day}</span>
        <span className="font-medium"> Local time: {formattedTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{cityName}</span>
        <span>{navigationIcon}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;
