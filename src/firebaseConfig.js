import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importante para la base de datos

const firebaseConfig = {
  apiKey: "AIzaSyAaO4lCjFrHG9Uhq1T90Sg2uOlNYLu5p_k",
  authDomain: "cancioneroldm.firebaseapp.com",
  projectId: "cancioneroldm",
  storageBucket: "cancioneroldm.firebasestorage.app",
  messagingSenderId: "717723039370",
  appId: "1:717723039370:web:f013f95b89cc5203fbdf73",
};

// Inicializamos la App
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para que VistaTV y PanelControl la usen
export const db = getFirestore(app);
