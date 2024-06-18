import React from "react";

export function Legend({ legendItems }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column",
        zIndex: 9998,
        position: "absolute",
        height: "auto",
        padding: "15px",
        top: "10px",
        left: "10px",
        lineHeight: "18px",
        backgroundColor: "#807165ab",
        borderRadius: "16px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <i
          style={{
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "8px",
            opacity: "0.7",
            backgroundColor: "#E6E6FA",
          }}
        ></i>
        <p>Alto Cuiabá</p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <i
          style={{
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "8px",
            opacity: "0.7",
            backgroundColor: "#0cf776",
          }}
        ></i>
        <p>Médio Cuiabá</p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <i
          style={{
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "8px",
            opacity: "0.7",
            backgroundColor: "#FFFACD",
          }}
        ></i>
        <p>Baixo Cuiabá</p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <i
          style={{
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "8px",
            opacity: "0.7",
            backgroundColor: "#F0FFF0",
          }}
        ></i>
        <p>Manso</p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <i
          style={{
            width: "18px",
            height: "18px",
            float: "left",
            marginRight: "8px",
            opacity: "0.7",
            backgroundColor: "cyan",
          }}
        ></i>
        <p>Coxipó</p>
      </div>
    </div>
  );
}
