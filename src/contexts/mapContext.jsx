import { createContext, useEffect, useState } from "react";
import subbacias from "../data/subbacias.json";
import subbaciaupg4 from "../data/subbaciaupg4.json";
import { dataProvider } from "../provider/dataProvider";

export const mapContext = createContext();

export const MapProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Q95");
  const [microBaciaBorder, setMicroBaciaBorder] = useState(false);
  const [inicialColor, setInicialColor] = useState({ r: 255, g: 0, b: 0 });
  const [finalColor, setFinalColor] = useState({ r: 0, g: 0, b: 255 });
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState(2019);
  const [cenario, setCenario] = useState("base");
  const [subbaciasFeatures2, setSubbaciasFeatures2] = useState(
    dataProvider[2028].acelerado().features
  );

  const subbaciasFeatures = subbacias.features;

  /* useEffect(() => {
    (async () => {
      const data = await dataProvider[2019].base();
      console.log("context", data);
      setSubBaciaFeature(data.features);
      setLoading(false);
    })();
  }, []);
  */

  function handleChangeInformations() {
    setLoading(true);
    console.log("ano e cenario ", ano, cenario);
    const numano = Number(ano);

    const dataFunction = dataProvider[numano][cenario];
    if (typeof dataFunction === "function") {
      const data = dataFunction();

      setSubbaciasFeatures2(data.features);
    }
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
    setInicialColor({ r: 255, g: 0, b: 0 });
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
      }}
    >
      {children}
    </mapContext.Provider>
  );
};
