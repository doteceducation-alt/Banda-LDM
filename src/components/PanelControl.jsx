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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '30px' }}>
  <button 
    onClick={() => cambiar(idx + 1)} 
    style={{ height: '200px', fontSize: '4rem', backgroundColor: '#28a745', color: 'white', borderRadius: '30px', border: 'none' }}
    disabled={idx === cancion.contenido.length - 1}
  >
    SIGUIENTE
  </button>

  <button 
    onClick={() => cambiar(idx - 1)} 
    style={{ height: '120px', fontSize: '2rem', backgroundColor: '#444', color: 'white', borderRadius: '30px', border: 'none' }}
    disabled={idx === 0}
  >
    ANTERIOR
  </button>
</div>
  );
}

