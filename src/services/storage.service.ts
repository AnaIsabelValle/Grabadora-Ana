import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types/types";

const STORAGE_KEY = "auth";

export async function saveAuthToStorage(auth: User): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error("No se ha podido almacenar las credenciales del usuario");
  }
}

export async function readAuthFromStorage(): Promise<User | null> {
  try {
    const storedAuth = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedAuth != null) {
      const user: User = JSON.parse(storedAuth);
      return user;
    }
  } catch (error) {
    console.error("No se ha podido leer las credenciales del usuario");
  }

  return null;
}

export const removeAuthFromStorage = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
