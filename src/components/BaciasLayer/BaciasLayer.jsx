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
    loading,
    mapType,
  } = useContext(mapContext);
  const [option, setOption] = useState("Q95");
  const [border, setBorder] = useState(true);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [corInicial, setCorInicial] = useState(inicialColor);
  const [corFinal, setCorFinal] = useState(finalColor);

  useEffect(() => {
    const calculateMinMax = () => {
      let max = -Infinity;
      let min = Infinity;

      if (subbaciasFeatures2) {
        subbaciasFeatures2.forEach((feature) => {
          const value = feature.properties[selectedOption];

          if (value > max) {
            max = value;
          }
          if (value < min) {
            min = value;
          }
        });
        console.log("max", max);
        console.log("min", min);
        setMaxValue(max);
        setMinValue(min);
      }
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
    if (text === "MedioCuiaba") {
      return {
        fillColor: "#0cf776",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "AltoCuiaba") {
      return {
        fillColor: "#E6E6FA",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Manso") {
      return {
        fillColor: "#F0FFF0",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "BaixoCuiaba") {
      return {
        fillColor: "#FFFACD",
        color: "black",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0.5,
      };
    } else if (text === "Coxipo") {
      return {
        fillColor: "cyan",
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
        {loading ? (
          subbaciasFeatures2 &&
          subbaciasFeatures2.map((feature, index) => (
            <GeoJSON
              key={index}
              data={feature}
              style={{
                fillColor:
                  mapType === "heatmap"
                    ? getColor(
                        feature.properties[option],
                        minValue,
                        maxValue,
                        corInicial,
                        corFinal
                      )
                    : stylePolygon(feature.properties.SubBacia).fillColor,
                color:
                  mapType === "heatmap"
                    ? getColor(
                        feature.properties[option],
                        minValue,
                        maxValue,
                        corInicial,
                        corFinal
                      )
                    : stylePolygon(feature.properties.SubBacia).fillColor,
                weight: 2,
                opacity: 1,
                fillOpacity: 1,
              }}
            >
              <Popup>
                Cenario: {feature.properties.cenario} <br />
                Ano: {feature.properties.ano} <br />
                Nome da micro SubBacia: {feature.properties.SubBacia} <br />
                {option}: {feature.properties[option]}
              </Popup>
            </GeoJSON>
          ))
        ) : (
          <div>Carregando...</div>
        )}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
