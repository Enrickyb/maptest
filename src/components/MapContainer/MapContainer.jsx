import React from "react";
import { LayersControl, TileLayer, MapContainer } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import BaciasLayer from "../BaciasLayer/BaciasLayer";
import mtMunicipios from "../../data/mtMunicipios.json";

import "./MapContainer.css";
import ColorLegend from "../Legends/ColorLegend/ColorLegend";

export default function Map() {
  const polygons = mtMunicipios.features.map((feature) => {
    return feature.geometry.coordinates[0].map((coord) => {
      return { city: feature.properties.name, cords: [coord[1], coord[0]] };
    });
  });

  function calculatePolygonBounds(polygons) {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    polygons.forEach((polygon) => {
      polygon.forEach((coord) => {
        const [lat, lng] = coord.cords;
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      });
    });

    return [
      [minLat, minLng],
      [maxLat, maxLng],
    ];
  }

  const polygonBounds = calculatePolygonBounds(polygons);

  return (
    <MapContainer
      center={[-15.025255971058684, -56.19486484951768]}
      zoom={6}
      scrollWheelZoom={true}
      className="leaflet-container"
      maxBounds={polygonBounds}
      minZoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position="topright">
        <BaciasLayer />
      </LayersControl>

      <FullscreenControl position="bottomleft" content={"[  ]"} />
      <ColorLegend />
    </MapContainer>
  );
}
