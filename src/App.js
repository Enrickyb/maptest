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
  const style2 = {
    fillColor: "transparent",
    color: "white",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5,
  };

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
            {/* Renderize as camadas GeoJSON */}
            {subbaciasFeatures &&
              subbaciasFeatures.map((feature, index) => (
                <GeoJSON
                  key={index}
                  data={feature}
                  style={style} // Aplica o estilo definido acima
                >
                  {/* Você pode adicionar popups ou informações adicionais aqui */}
                  <Popup>
                    Nome da SubBacia: {feature.properties.layer} <br />
                    Área (km²): {feature.properties["Área km²"]}
                  </Popup>
                </GeoJSON>
              ))}
          </LayerGroup>
          <LayerGroup>
            {/* Renderize as camadas GeoJSON */}
            {subbaciasFeatures2 &&
              subbaciasFeatures2.map((feature, index) => (
                <GeoJSON
                  key={index}
                  data={feature}
                  style={style2} // Aplica o estilo definido acima
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
