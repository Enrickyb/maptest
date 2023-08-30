import React from "react";
import "./colorLegend.css"; // Importe o arquivo CSS para estilizar a legenda

function ColorLegend() {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-color red"></div>
        <div className="legend-text">Médio Cuiabá</div>
      </div>
      <div className="legend-item">
        <div className="legend-color blue"></div>
        <div className="legend-text">Alto Cuiabá</div>
      </div>
      <div className="legend-item">
        <div className="legend-color green"></div>
        <div className="legend-text">Manso</div>
      </div>
      <div className="legend-item">
        <div className="legend-color yellow"></div>
        <div className="legend-text">Baixo Cuiabá</div>
      </div>
      <div className="legend-item">
        <div className="legend-color orange"></div>
        <div className="legend-text">Coxipó</div>
      </div>
    </div>
  );
}

export default ColorLegend;
