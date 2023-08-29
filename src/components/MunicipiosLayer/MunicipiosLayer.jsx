import { FeatureGroup, LayersControl, GeoJSON, Popup } from "react-leaflet";
import mtMunicipios from "../../data/mtMunicipios.json";

export default function MunicipiosLayer() {
  const municipiosFeature = mtMunicipios.features;
  return (
    <LayersControl.Overlay name="Municipios Mato-Grosso">
      <FeatureGroup>
        {municipiosFeature &&
          municipiosFeature.map((feature, index) => (
            <GeoJSON key={index} data={feature} style={{ color: "blue" }}>
              <Popup>
                Nome da SubBacia: {feature.properties.layer} <br />
                Área (km²): {feature.properties["Área km²"]}
              </Popup>
            </GeoJSON>
          ))}
      </FeatureGroup>
    </LayersControl.Overlay>
  );
}
