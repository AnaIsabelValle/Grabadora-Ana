import { Sound } from "expo-av/build/Audio";

export type RootDrawerParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Tape: undefined;
};

// Info que retorna API
export interface User {
  id: number;
  name: string;
  email: string;
}

export type RecordFile = {
  title: string;
  duration: string;
  date: number;
  sound: Sound;
  file: string | null | undefined;
};
