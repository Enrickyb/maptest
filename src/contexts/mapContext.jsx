import { createContext, useState } from "react";
import subbacias from "../data/subbacias.json";
import subbaciaupg4 from "../data/subbaciaupg4.json";

export const mapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [microBaciaBorder, setMicroBaciaBorder] = useState(true);
  const [inicialColor, setInicialColor] = useState({ r: 255, g: 0, b: 0 });
  const [finalColor, setFinalColor] = useState({ r: 0, g: 0, b: 255 });

  const subbaciasFeatures = subbacias.features;
  const subbaciasFeatures2 = subbaciaupg4.features;

  function handleSelectOption(value) {
    setSelectedOption(value);
  }

  function handleSetMicroBaciaBorder() {
    setMicroBaciaBorder(!microBaciaBorder);
  }

  function handleSetInicialColor(color) {
    setInicialColor(color.rgb);
  }

  function handleSetFinalColor(color) {
    setFinalColor(color.rgb);
  }

  return (
    <mapContext.Provider
      value={{
        handleSelectOption,
        selectedOption,
        microBaciaBorder,
        handleSetMicroBaciaBorder,
        subbaciasFeatures,
        subbaciasFeatures2,
        handleSetInicialColor,
        handleSetFinalColor,
        inicialColor,
        finalColor,
      }}
    >
      {children}
    </mapContext.Provider>
  );
};
