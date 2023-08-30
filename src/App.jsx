import "./App.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import Map from "./components/MapContainer/MapContainer";
import Select from "react-select";
import { useContext } from "react";
import { MapProvider, mapContext } from "./contexts/mapContext";

function App() {
  const options = [
    { value: "precipitac", label: "Precipitação" },
    { value: "Q95", label: "Q95" },
    { value: "AbasTotal", label: "AbasTotal" },
  ];

  return (
    <div className="App">
      <MapProvider>
        <Map />
        <div>
          <Select options={options} onChange={(e) => {}} />
        </div>
      </MapProvider>
    </div>
  );
}

export default App;
