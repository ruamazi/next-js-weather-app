"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useGlobalContext } from "../context/globalContext";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

interface activeCityCordsType {
  lon: number;
  lat: number;
}

function FlyToActiveCity({
  activeCityCords,
}: {
  activeCityCords: activeCityCordsType;
}) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCords, map]);

  return null;
}

const Mapbox = () => {
  const { forecast } = useGlobalContext();

  const activeCityCords: activeCityCordsType = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCords?.lat, activeCityCords?.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
};
export default Mapbox;
