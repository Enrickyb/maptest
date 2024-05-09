import React, { useContext } from "react";
import Map from "./MapContainer/MapContainer";
import Select from "react-select";
import { mapContext } from "../contexts/mapContext";

import "./main.css";
import ColorPicker from "./ColorPicker/ColorPicker";
import TabNavigation from "./TabNavigation/TabNavigation";
import SelectInput from "./SelectInput/SelectInput";

export default function Main() {
  const options = [
    { value: "f_retirada", label: "f_retirada" },
    { value: "f_retorno", label: "f_retorno" },
    { value: "f_consumo", label: "f_consumo" },
    { value: "f_fos_t", label: "f_fos_t" },
    { value: "f_fos_r", label: "f_fos_r" },
    { value: "f_dbo_t", label: "f_dbo_t" },
    { value: "f_dbo_r", label: "f_dbo_r" },
    { value: "f_ni_r", label: "f_ni_r" },
    { value: "Q95", label: "Q95" },
    { value: "comp", label: "comp" },
    { value: "Q95_r", label: "Q95_r" },
    { value: "Q95_r_perc", label: "Q95_r_perc" },
    { value: "Q95_c", label: "Q95_c" },
    { value: "Q95_c_perc", label: "Q95_c_perc" },
    { value: "arsub_ri", label: "arsub_ri" },
    { value: "arsub_ro", label: "arsub_ro" },
    { value: "arsub_co", label: "arsub_co" },
    { value: "arsup_ri", label: "arsup_ri" },
    { value: "arsup_ro", label: "arsup_ro" },
    { value: "arsup_co", label: "arsup_co" },
    { value: "ausub_ri", label: "ausub_ri" },
    { value: "ausub_ro", label: "ausub_ro" },
    { value: "ausub_co", label: "ausub_co" },
    { value: "ausup_ri", label: "ausup_ri" },
    { value: "ausup_ro", label: "ausup_ro" },
    { value: "ausup_co", label: "ausup_co" },
    { value: "ag_ri", label: "ag_ri" },
    { value: "ag_ro", label: "ag_ro" },
    { value: "ag_co", label: "ag_co" },
    { value: "ag_fos_t", label: "ag_fos_t" },
    { value: "ag_fos_r", label: "ag_fos_r" },
    { value: "de_ri", label: "de_ri" },
    { value: "de_ro", label: "de_ro" },
    { value: "de_co", label: "de_co" },
    { value: "de_dbo_r", label: "de_dbo_r" },
    { value: "de_fos_r", label: "de_fos_r" },
    { value: "es_ro", label: "es_ro" },
    { value: "es_fos_r", label: "es_fos_r" },
    { value: "es_dbo_r", label: "es_dbo_r" },
    { value: "in_ri", label: "in_ri" },
    { value: "in_ro", label: "in_ro" },
    { value: "in_co", label: "in_co" },
    { value: "in_dbo_r", label: "in_dbo_r" },
    { value: "in_dbo_t", label: "in_dbo_t" },
    { value: "mi_ri", label: "mi_ri" },
    { value: "mi_ro", label: "mi_ro" },
    { value: "mi_co", label: "mi_co" },
    { value: "pic_ni_r", label: "pic_ni_r" },
    { value: "pic_fos_r", label: "pic_fos_r" },
    { value: "pic_dbo_r", label: "pic_dbo_r" },
    { value: "pi1_ri", label: "pi1_ri" },
    { value: "pi1_ro", label: "pi1_ro" },
    { value: "pi1_co", label: "pi1_co" },
    { value: "pi2_ri", label: "pi2_ri" },
    { value: "pi2_ro", label: "pi2_ro" },
    { value: "pi2_co", label: "pi2_co" },
    { value: "re_ri", label: "re_ri" },
    { value: "re_ro", label: "re_ro" },
    { value: "re_co", label: "re_co" },
    { value: "te_ri", label: "te_ri" },
    { value: "te_ro", label: "te_ro" },
    { value: "te_co", label: "te_co" },
  ];

  const {
    handleSetInicialColor,
    handleSetFinalColor,
    inicialColor,
    finalColor,
    handleResetColors,
    handleSelectAno,
    handleChangeInformations,
    handleSelectCenario,
    ano,
  } = useContext(mapContext);
  const { handleSelectOption, handleSetMicroBaciaBorder } =
    useContext(mapContext);

  const tabs = [
    {
      label: "Mapa",
      content: (
        <div className="map-container">
          <Map />
        </div>
      ),
    },
    {
      label: "Gráficos",
      content: <div>Graficos</div>,
    },
  ];

  const informations = {
    2019: ["base"],
    2028: ["moderado", "acelerado", "tendencial"],
    2033: ["moderado", "acelerado", "tendencial"],
    2043: ["moderado", "acelerado", "tendencial"],
  };
  return (
    <div className="main">
      <header className="header">
        <h1>NIESA</h1>
      </header>
      <div className="container">
        <div className="sub-container colorr">
          <div>
            <label>
              <p>Tipo de análise</p>
            </label>
            <SelectInput options={options} onChange={handleSelectOption} />
          </div>
          <div>
            <label>
              <p>Tipo de busca</p>
            </label>
            <SelectInput
              onChange={() => {
                console.log("");
              }}
              options={[
                { value: "subbacia", label: "Subbacia" },
                { value: "regioes", label: "Regiões " },
              ]}
            />
          </div>
        </div>

        <div className="">
          <TabNavigation tabs={tabs} />
        </div>

        <div className="sub-container colorr">
          <div className="input-container">
            <label>Cenário</label>
            <SelectInput
              onChange={handleSelectCenario}
              defaultv={"Selecione"}
              options={informations[ano].map((cenario) => ({
                value: cenario,
                label: cenario,
              }))}
            />
          </div>
          <div className="input-container">
            <label>Ano</label>
            <SelectInput
              defaultv={"Selecione"}
              onChange={handleSelectAno}
              options={Object.keys(informations).map((year) => ({
                value: year,
                label: year,
              }))}
            />
          </div>
          <div>
            <button
              className="change-btn"
              onClick={() => {
                handleChangeInformations();
              }}
            >
              change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
