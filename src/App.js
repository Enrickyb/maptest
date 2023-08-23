import "./App.css";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import mtMunicipios from "./data/mtMunicipios.json";
import { Icon } from "leaflet";

const icon = new Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

function App() {
  //Tratamento do arquivo JSON
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

      <LayersControl position="topright">
        <LayersControl.Overlay name="Marker">
          <Marker
            position={[-15.025255971058684, -56.19486484951768]}
            icon={icon}
          >
            <Popup>Demonstração de um marcador</Popup>
          </Marker>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Circulos">
          <LayerGroup>
            <Circle
              center={[-15.025255971058684, -56.19486484951768]}
              pathOptions={{ fillColor: "blue" }}
              radius={200}
            />
            <Circle
              center={[-15.035255971058684, -56.19486484951768]}
              pathOptions={{ fillColor: "red" }}
              radius={500}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: "green", fillColor: "green" }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Municipios Mato-Grosso (S)">
          <FeatureGroup>
            {polygons.map((polygon) => {
              return (
                <Polygon
                  pathOptions={
                    polygon[0].city.startsWith("S")
                      ? { color: "blue" }
                      : { color: "red" }
                  }
                  positions={polygon.map((coord) => coord.cords)}
                >
                  <Tooltip sticky>{polygon[0].city}</Tooltip>
                </Polygon>
              );
            })}
          </FeatureGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Municipios Mato-Grosso (B)">
          <FeatureGroup>
            {polygons.map((polygon) => {
              return (
                <Polygon
                  pathOptions={
                    polygon[0].city.startsWith("B")
                      ? { color: "blue" }
                      : { color: "red" }
                  }
                  positions={polygon.map((coord) => coord.cords)}
                >
                  <Tooltip sticky>{polygon[0].city}</Tooltip>
                </Polygon>
              );
            })}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default App;
