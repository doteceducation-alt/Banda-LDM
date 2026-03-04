import React, { useState } from "react";
import VistaTV from "./components/VistaTV";
import PanelControl from "./components/PanelControl";

export default function App() {
  const [modo, setModo] = useState("tv");

  return (
    <div
      style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}
    >
      <nav style={{ padding: "10px", background: "#222", textAlign: "center" }}>
        <button onClick={() => setModo("tv")}>Modo TV</button>
        <button
          onClick={() => setModo("control")}
          style={{ marginLeft: "10px" }}
        >
          Modo Control
        </button>
      </nav>
      {modo === "tv" ? <VistaTV /> : <PanelControl />}
    </div>
  );
}
