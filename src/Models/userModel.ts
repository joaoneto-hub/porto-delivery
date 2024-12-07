// src/models/userModel.ts
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { User } from './User';

const usersRef = collection(db, 'users');

class UserModel {
  // Busca todos os usuários no Firestore
  static async getAll(): Promise<User[]> {
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User);
  }

  // Busca um usuário por ID
  static async getById(userId: string): Promise<User | null> {
    const userDocRef = doc(db, 'users', userId);
    const docSnapshot = await getDoc(userDocRef);
    if (!docSnapshot.exists()) {
      return null;
    }
    return { id: docSnapshot.id, ...docSnapshot.data() } as User;
  }

  // Cria um novo usuário
  static async create(userData: Omit<User, 'id'>): Promise<User> {
    const docRef = await addDoc(usersRef, userData);
    return { id: docRef.id, ...userData };
  }
}

export default UserModel;
