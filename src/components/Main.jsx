import React, { useContext } from "react";
import Map from "./MapContainer/MapContainer";
import { Select } from "react-select";
import { mapContext } from "../contexts/mapContext";

import "./Main.css";

export default function Main() {
  const options = [
    { value: "Precipitac", label: "Precipitação" },
    { value: "Q95", label: "Q95" },
    { value: "AbasTotal", label: "AbasTotal" },
  ];

  const { handleSelectOption } = useContext(mapContext);
  return (
    <div className="main">
      <Map />

      <div>
        <Select
          options={options}
          onChange={(e) => {
            handleSelectOption(e.value);
          }}
        />
      </div>
    </div>
  );
}
