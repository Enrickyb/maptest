import { createContext, useState } from "react";

export const mapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Precipitac");

  function handleSelectOption(value) {
    setSelectedOption(value);
  }

  return (
    <mapContext.Provider value={{ handleSelectOption, selectedOption }}>
      {children}
    </mapContext.Provider>
  );
};
