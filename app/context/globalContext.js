"use client";
import { createContext, useContext, useEffect, useState } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const defaultCityCoords = [51.752021, -1.257726];
  const [activeCityCoords, setActiveCityCoords] = useState(defaultCityCoords);
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const resp = await fetch(`api/weather?lat=${lat}&lon=${lon}`);
      const data = await resp.json();
      setForecast(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAirPollution = async (lat, lon) => {
    try {
      const resp = await fetch(`api/pollution?lat=${lat}&lon=${lon}`);
      const data = await resp.json();
      setAirQuality(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const resp = await fetch(`api/fivedays?lat=${lat}&lon=${lon}`);
      const data = await resp.json();
      setFiveDayForecast(data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const resp = await fetch(`/api/uv?lat=${lat}&lon=${lon}`);
      const data = await resp.json();

      seUvIndex(data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };

  const handleInput = (e) => {
    const inputV = e.target.value;
    setInputValue(inputV);
    if (inputV === "") {
      setGeoCodedList(defaultStates);
    }
  };

  const fetchGeoCodedCity = async (search) => {
    try {
      const resp = await fetch(`api/geocoded?search=${search}`);
      const data = await resp.json();
      setGeoCodedList(data);
    } catch (err) {
      console.log(err);
    }
  };

  // loadish for debounce
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedCity(search);
    }, 500);
    if (inputValue) {
      debouncedFetch(inputValue);
    }
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirPollution(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};
