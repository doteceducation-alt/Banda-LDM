import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";

export default function PanelControl() {
  const [cancion, setCancion] = useState(null);
  const [idx, setIdx] = useState(0);
  const docRef = doc(db, "control", "pantalla_1");

  useEffect(() => {
    const unsub = onSnapshot(docRef, async (snap) => {
      if (snap.exists()) {
        setIdx(snap.data().seccion_index);
        const cSnap = await getDoc(
          doc(db, "canciones", snap.data().cancion_actual)
        );
        if (cSnap.exists()) setCancion(cSnap.data());
      }
    });
    return () => unsub();
  }, []);

  const cambiar = (n) => updateDoc(docRef, { seccion_index: n });

  if (!cancion) return <div style={{ padding: "20px" }}>Conectando...</div>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{cancion.titulo}</h2>
      <button onClick={() => cambiar(idx - 1)} disabled={idx === 0}>
        Anterior
      </button>
      <button
        onClick={() => cambiar(idx + 1)}
        disabled={idx === cancion.contenido.length - 1}
      >
        Siguiente
      </button>
    </div>
  );
}
