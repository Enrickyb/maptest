import { createContext, useState } from "react";

import { dataProvider } from "../provider/dataProvider";

export const mapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Q95");
  const [microBaciaBorder, setMicroBaciaBorder] = useState(false);
  const [inicialColor, setInicialColor] = useState({ r: 127, g: 255, b: 212 });
  const [finalColor, setFinalColor] = useState({ r: 0, g: 0, b: 255 });
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState(2019);
  const [cenario, setCenario] = useState("base");
  const [subbaciasFeatures2, setSubbaciasFeatures2] = useState(
    dataProvider[2019].base().features
  );
  const [mapType, setMapType] = useState("heatmap");

  const [selectedSubbacia, setSelectedSubbacia] = useState("Todos");
  const subbacias = [
    { value: "Todos", label: "Todos" },
    { value: "Manso", label: "Manso" },
    { value: "AltoCuiaba", label: "Alto Cuiabá" },
    { value: "MedioCuiaba", label: "Médio Cuiabá" },
    { value: "BaixoCuiaba", label: "Baixo Cuiabá" },
  ];

  const subbaciasFeatures = subbacias.features;

  function handleChangeInformations(subbacia) {
    setLoading(false);
    const numano = Number(ano);
    const dataFunction = dataProvider[numano][cenario];
    if (typeof dataFunction === "function") {
      const data = dataFunction();
      if (subbacia === "Todos") {
        setSubbaciasFeatures2(data.features);

        setInterval(() => {
          setLoading(true);
        }, 1000);
      } else {
        const subbaciaData = data.features.filter(
          (feature) => feature.properties.SubBacia === subbacia
        );

        setSubbaciasFeatures2(subbaciaData);
        setInterval(() => {
          setLoading(true);
        }, 1000);
      }
    }
  }

  function handleSetMapType(type) {
    setLoading(false);
    console.log(type);
    setMapType(type);

    setLoading(true);
  }

  function handleSelectSubbacia(subbacia) {
    setSelectedSubbacia(subbacia);
    handleChangeInformations(subbacia);
  }

  function handleSelectCenario(cenario) {
    setCenario(cenario);
    handleSelectAno(ano);
  }
  function handleSelectAno(ano) {
    setAno(ano);
  }

  function handleSelectOption(value) {
    console.log(value);
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

  function handleResetColors() {
    setInicialColor({ r: 127, g: 255, b: 212 });
    setFinalColor({ r: 0, g: 0, b: 255 });
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
        handleResetColors,
        loading,
        handleSelectCenario,
        handleSelectAno,
        handleChangeInformations,
        ano,
        handleSelectSubbacia,
        selectedSubbacia,
        mapType,
        handleSetMapType,
      }}
    >
      {children}
    </mapContext.Provider>
  );
};
