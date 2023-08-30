import { LayerGroup, LayersControl, GeoJSON, Popup } from "react-leaflet";

import subbacias from "../../data/subbacias.json";
import subbaciaupg4 from "../../data/subbaciaupg4.json";
import getColor from "../../provider/colorProvider";
import { mapContext } from "../../contexts/mapContext";
import { useContext } from "react";

export default function BaciasLayer() {
  const { selectedOption } = useContext(mapContext);

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

  const corInicial = { r: 255, g: 0, b: 0 }; // Cor inicial (vermelho)
  const corFinal = { r: 0, g: 0, b: 255 }; // Cor final (azul)

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
              style={{
                fillColor: getColor(
                  feature.properties[selectedOption],
                  1000,
                  2000,
                  corInicial,
                  corFinal
                ),
                color: "#292929",
                weight: 2,
                opacity: 0.5,
                fillOpacity: 1,
              }}
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
