import "./App.css";
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import mtMunicipios from "./data/mtMunicipios.json";
import { Icon } from "leaflet";
import subbacias from "./data/subbacias.json";
import subbaciaupg4 from "./data/subbaciaupg4.json";

function App() {
  //Tratamento do arquivo JSON
  const polygons = mtMunicipios.features.map((feature) => {
    return feature.geometry.coordinates[0].map((coord) => {
      return { city: feature.properties.name, cords: [coord[1], coord[0]] };
    });
  });

  // Extraia as features do seu GeoJSON
  const subbaciasFeatures = subbacias.features;
  const subbaciasFeatures2 = subbaciaupg4.features;

  // Função para estilizar as camadas GeoJSON
  const style = {
    fillColor: "blue",
    color: "white",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  };

  function stylePolygon(text) {
    if (text === "Médio Cuiabá") {
      return {
        fillColor: "red",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Alto Cuiabá") {
      return {
        fillColor: "blue",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Manso") {
      return {
        fillColor: "green",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Baixo Cuiabá") {
      return {
        fillColor: "yellow",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Coxipó") {
      return {
        fillColor: "orange",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    }
  }

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
        <LayersControl.Overlay name="subbacias">
          <LayerGroup>
            {subbaciasFeatures &&
              subbaciasFeatures.map((feature, index) => (
                <GeoJSON key={index} data={feature} style={style}>
                  <Popup>
                    Nome da SubBacia: {feature.properties.layer} <br />
                    Área (km²): {feature.properties["Área km²"]}
                  </Popup>
                </GeoJSON>
              ))}
          </LayerGroup>
          <LayerGroup>
            {subbaciasFeatures2 &&
              subbaciasFeatures2.map((feature, index) => (
                <GeoJSON
                  key={index}
                  data={feature}
                  style={stylePolygon(feature.properties.SubBacia)}
                >
                  {/* Você pode adicionar popups ou informações adicionais aqui */}
                  <Popup>
                    Nome da micro SubBacia: {feature.properties.SubBacia} <br />
                    Área (km²): {feature.properties["Área km²"]}
                  </Popup>
                </GeoJSON>
              ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Municipios Mato-Grosso">
          <FeatureGroup>
            {polygons.map((polygon) => {
              return (
                <Polygon
                  pathOptions={{ color: "blue" }}
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
