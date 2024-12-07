// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARVYtn3qmswLgPUvY2sv8B_yWYY_Ozjio",
  authDomain: "cardapio-virtual-2a826.firebaseapp.com",
  projectId: "cardapio-virtual-2a826",
  storageBucket: "cardapio-virtual-2a826.firebasestorage.app",
  messagingSenderId: "69321414272",
  appId: "1:69321414272:web:0fc635c8ac29ae79c77865",
  measurementId: "G-W8BVR8JBL2"
};
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação e o Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };