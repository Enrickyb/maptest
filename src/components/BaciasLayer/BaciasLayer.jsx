import { LayerGroup, LayersControl, GeoJSON, Popup } from "react-leaflet";
import getColor from "../../provider/colorProvider";
import { mapContext } from "../../contexts/mapContext";
import { useContext, useEffect, useState } from "react";

export default function BaciasLayer() {
  const {
    selectedOption,
    microBaciaBorder,
    subbaciasFeatures,
    subbaciasFeatures2,
    inicialColor,
    finalColor,
  } = useContext(mapContext);
  const [option, setOption] = useState(selectedOption);
  const [border, setBorder] = useState(true);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [corInicial, setCorInicial] = useState(inicialColor);
  const [corFinal, setCorFinal] = useState(finalColor);

  useEffect(() => {
    const calculateMinMax = () => {
      let max = -Infinity;
      let min = Infinity;

      subbaciasFeatures2.forEach((feature) => {
        const value = feature.properties[selectedOption];
        if (value > max) {
          max = value;
        }
        if (value < min) {
          min = value;
        }
      });
      setMaxValue(max);
      setMinValue(min);
    };
    calculateMinMax();
  }, [selectedOption, subbaciasFeatures2]);

  useEffect(() => {
    setBorder(microBaciaBorder);
    setOption(selectedOption);
  }, [microBaciaBorder, selectedOption]);

  useEffect(() => {
    setCorInicial(inicialColor);
    setCorFinal(finalColor);
  }, [inicialColor, finalColor]);

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
              style={{
                fillColor: option
                  ? getColor(
                      feature.properties[option],
                      minValue,
                      maxValue,
                      corInicial,
                      corFinal
                    )
                  : stylePolygon(feature.properties.SubBacia).fillColor,
                color: border
                  ? "black"
                  : getColor(
                      feature.properties[option],
                      minValue,
                      maxValue,
                      corInicial,
                      corFinal
                    ),
                weight: 2,
                opacity: 0.5,
                fillOpacity: 1,
              }}
            >
              <Popup>
                Nome da micro SubBacia: {feature.properties.SubBacia} <br />
                {option}: {feature.properties[option]}
              </Popup>
            </GeoJSON>
          ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
