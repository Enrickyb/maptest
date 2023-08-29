import { LayerGroup, LayersControl, GeoJSON, Popup } from "react-leaflet";

import subbacias from "../../data/subbacias.json";
import subbaciaupg4 from "../../data/subbaciaupg4.json";

export default function BaciasLayer() {
  const subbaciasFeatures = subbacias.features;
  const subbaciasFeatures2 = subbaciaupg4.features;

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

  return (
    <LayersControl.Overlay name="subbacias" checked>
      <LayerGroup>
        {subbaciasFeatures &&
          subbaciasFeatures.map((feature, index) => (
            <GeoJSON
              key={index}
              data={feature}
              style={stylePolygon(feature.properties.layer)}
            >
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
              <Popup>
                Nome da micro SubBacia: {feature.properties.SubBacia} <br />
                Precipitação: {feature.properties.Precipitac}mm
              </Popup>
            </GeoJSON>
          ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
