import React, { useContext } from "react";
import Map from "./MapContainer/MapContainer";
import Select from "react-select";
import { mapContext } from "../contexts/mapContext";

import "./main.css";
import ColorPicker from "./ColorPicker/ColorPicker";

export default function Main() {
  const options = [
    { value: "Precipitac", label: "Precipitação" },
    { value: "Q95", label: "Q95" },
    { value: "QM", label: "QM" },
    { value: "TeRetoM3s", label: "TeRetoM3s" },
    { value: "TeConsM3s", label: "TeConsM3s" },
    { value: "EvCons_m3s", label: "EvCons_m3s" },
    { value: "PiReti_m3s", label: "PiReti_m3s" },
    { value: "PiReto_m3s", label: "PiReto_m3s" },
    { value: "PiCons_m3s", label: "PiCons_m3s" },
    { value: "Pi_N_kgd", label: "Pi_N_kgd" },
    { value: "Pi_P_kgd", label: "Pi_P_kgd" },
    { value: "Pi_DBO_kgd", label: "Pi_DBO_kgd" },
    { value: "ArReti_m3s", label: "ArReti_m3s" },
    { value: "ArReto_m3s", label: "ArReto_m3s" },
    { value: "ArCons_m3s", label: "ArCons_m3s" },
    { value: "AuReti_m3s", label: "AuReti_m3s" },
    { value: "AgRetiM3s", label: "AgRetiM3s" },
    { value: "AgRetoM3s", label: "AgRetoM3s" },
    { value: "AgConsM3s", label: "AgConsM3s" },
    { value: "AgFosKgd", label: "AgFosKgd" },
    { value: "AgFosrKgd", label: "AgFosrKgd" },
    { value: "DeRetiM3s", label: "DeRetiM3s" },
    { value: "DeRetoM3s", label: "DeRetoM3s" },
    { value: "DeConsM3s", label: "DeConsM3s" },
    { value: "DeDBO5Kgd", label: "DeDBO5Kgd" },
    { value: "DeDBOr5Kgd", label: "DeDBOr5Kgd" },
    { value: "DeFosKgd", label: "DeFosKgd" },
    { value: "DeFosrKgd", label: "DeFosrKgd" },
    { value: "EuReto_Ls", label: "EuReto_Ls" },
    { value: "EuDBOrKGD", label: "EuDBOrKGD" },
    { value: "InReti_m3s", label: "InReti_m3s" },
    { value: "InDBO_gl", label: "InDBO_gl" },
    { value: "InReto_LD", label: "InReto_LD" },
    { value: "InDBOr_kgd", label: "InDBOr_kgd" },
    { value: "InDBO_kgd", label: "InDBO_kgd" },
    { value: "InReto_m3s", label: "InReto_m3s" },
    { value: "MiReti_m3s", label: "MiReti_m3s" },
    { value: "MiReto_m3s", label: "MiReto_m3s" },
    { value: "MiCons_m3s", label: "MiCons_m3s" },
    { value: "IrReti_m3s", label: "IrReti_m3s" },
    { value: "IrCons_m3s", label: "IrCons_m3s" },
    { value: "IrReto_m3s", label: "IrReto_m3s" },
    { value: "EuReto_m3s", label: "EuReto_m3s" },
    { value: "F_Reti_m3s", label: "F_Reti_m3s" },
    { value: "F_Reto_m3s", label: "F_Reto_m3s" },
    { value: "F_Cons_m3s", label: "F_Cons_m3s" },
    { value: "AbasTotal", label: "AbasTotal" },
  ];
  const {
    handleSetInicialColor,
    handleSetFinalColor,
    inicialColor,
    finalColor,
  } = useContext(mapContext);

  const { handleSelectOption, handleSetMicroBaciaBorder } =
    useContext(mapContext);

  return (
    <div className="main">
      <Map />

      <div className="inputs-container">
        <Select
          options={options}
          onChange={(e) => {
            handleSelectOption(e.value);
          }}
        />
        <label>
          Borda
          <input
            type="checkbox"
            defaultChecked
            onChange={handleSetMicroBaciaBorder}
          />
        </label>

        <div className="color-picker-container">
          <label>
            Cor inicial
            <ColorPicker
              color={inicialColor}
              onChange={handleSetInicialColor}
            />
          </label>

          <label>
            Cor final
            <ColorPicker color={finalColor} onChange={handleSetFinalColor} />
          </label>
        </div>
      </div>
    </div>
  );
}
