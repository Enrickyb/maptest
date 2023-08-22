import "./App.css";
import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import mtMunicipios from "./data/mtMunicipios.json";

function App() {
  const polygons = mtMunicipios.features.map((feature) => {
    return feature.geometry.coordinates[0].map((coord) => {
      return { city: feature.properties.name, cords: [coord[1], coord[0]] };
    });
  });

  return (
    <MapContainer
      center={[-15.025255971058684, -56.19486484951768]}
      zoom={7}
      scrollWheelZoom={true}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {polygons.map((polygon) => {
        return (
          <Polygon
            pathOptions={{ color: "purple" }}
            positions={polygon.map((coord) => coord.cords)}
          >
            <Tooltip sticky>{polygon[0].city}</Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}

export default App;
