import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

import { MapProvider } from "./contexts/mapContext";
import Main from "./components/Main";

function App() {
  return (
    <div>
      <MapProvider>
        <Main />
      </MapProvider>
    </div>
  );
}

export default App;
