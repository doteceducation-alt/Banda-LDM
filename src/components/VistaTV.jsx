import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

export default function VistaTV() {
  const [cancion, setCancion] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "control", "pantalla_1"), async (snap) => {
      if (snap.exists()) {
        setIdx(snap.data().seccion_index);
        const cancionSnap = await getDoc(
          doc(db, "canciones", snap.data().cancion_actual)
        );
        if (cancionSnap.exists()) setCancion(cancionSnap.data());
      }
    });
    return () => unsub();
  }, []);

  if (!cancion)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Cargando Alabanza...
      </div>
    );

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: "bold" }}>
          {cancion.contenido && cancion.contenido[idx]
            ? cancion.contenido[idx].letra
            : "Cargando estrofa..."}
        </h1>
      </h1>
    </div>
  );
}
