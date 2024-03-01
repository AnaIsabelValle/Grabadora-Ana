import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecordFile } from "../types/types";

const STORAGE_KEY = "userRecordings";

export const saveRecordings = async (value: RecordFile[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Error al guardar las grabaciones:", error);
  }
};

export const readRecordings = async (): Promise<RecordFile[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error al obtener las grabaciones:", error);
  }
  return null;
};

export const removeRecordings = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
