import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types/types";
import {
  readAuthFromStorage,
  removeAuthFromStorage,
  saveAuthToStorage,
} from "../services/storage.service";

type RenderAuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

// Indicamos a React que info expone el Context
type RenderAuthContextType = {
  auth: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

// Creamos el contexto
const AuthContext = createContext<RenderAuthContextType | null>(null);

// Componente proveedor del estado
const AuthProvider = ({ children }: RenderAuthProviderProps) => {
  const [auth, setAuth] = useState<User | null>(null);

  const loginUser = (user: User): void => {
    setAuth(user);
    saveAuthToStorage(user);
  };

  const logoutUser = (): void => {
    setAuth(null);
    removeAuthFromStorage();
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      const authStore = await readAuthFromStorage();
      if (authStore) {
        setAuth(authStore);
      }
    };

    getAuthFromStorage();
  }, []);

  // Valores que se van a exponer por medio del Provider
  const data: RenderAuthContextType = {
    auth,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext) as RenderAuthContextType;
};

export { AuthProvider };
export default AuthContext;
