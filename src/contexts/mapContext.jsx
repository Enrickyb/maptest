import { createContext, useState } from "react";
import subbacias from "../data/subbacias.json";
import subbaciaupg4 from "../data/subbaciaupg4.json";

export const mapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState();
  const [microBaciaBorder, setMicroBaciaBorder] = useState(true);

  const subbaciasFeatures = subbacias.features;
  const subbaciasFeatures2 = subbaciaupg4.features;

  function handleSelectOption(value) {
    setSelectedOption(value);
  }

  function handleSetMicroBaciaBorder() {
    setMicroBaciaBorder(!microBaciaBorder);
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
      }}
    >
      {children}
    </mapContext.Provider>
  );
};
