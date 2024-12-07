import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Establishment } from "./Establishment";

class EstablishmentModel {
  // Busca todos os estabelecimentos no Firestore
  static async getAll(): Promise<any[]> {
    const snapshot = await getDocs(collection(db, "establishments"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // Busca um estabelecimento por ID
  static async getByUserId(userId: string): Promise<any[]> {
    if (!userId) {
      throw new Error("O parâmetro 'userId' não pode ser indefinido ou vazio.");
    }

    const establishmentsRef = collection(db, "establishments");

    const ByQuery = query(establishmentsRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(ByQuery);

    const establishments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return establishments;
  }

  // Cria um novo estabelecimento
  static async create(establishmentData: any): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    const userId = user.uid;
    const dataWithUserId = {
      ...establishmentData,
      userId,
    };

    const establishmentRef = await addDoc(
      collection(db, "establishments"),
      dataWithUserId
    );

    return { id: establishmentRef.id, ...dataWithUserId };
  }
}

export default EstablishmentModel;
