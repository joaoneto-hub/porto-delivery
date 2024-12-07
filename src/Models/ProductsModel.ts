import { collection, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';

interface Product {
  name: string;
  price: number;
  description?: string;
  userId: string;
}
interface ProductUpdate {
  name?: string;
  price?: number;
  description?: string;
}

class ProductsModel {

  static async getProductsByUserId(userId: string): Promise<any[]> {
    try {
    
      const productsRef = collection(db, 'products');

      const ByQuery = query(productsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(ByQuery);

      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return products;
    } catch (error) {
   
      throw error;
    }
  }
  static async createProduct(product: Product): Promise<string> {
    try {
    
      const productsRef = collection(db, 'products');

  
      const docRef = await addDoc(productsRef, product);

      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar produto no Firestore:', error);
      throw error;
    }
  }
  static async deleteProduct(productId: string): Promise<void> {
    try {
  
      const productRef = doc(db, 'products', productId);

      await deleteDoc(productRef);
    } catch (error) {
      console.error('Erro ao deletar produto no Firestore:', error);
      throw error;
    }
  }


  static async updateProduct(productId: string, updateData: ProductUpdate): Promise<void> {
    try {
 
      const productRef = doc(db, 'products', productId);

      await updateDoc(productRef, { ...updateData });
    } catch (error) {

      throw error;
    }
  }
}

export default ProductsModel;
