import { User } from "../types/types";

// URL del servidor que contiene la API REST
const API_URL = "http://172.16.102.3:8888";

// Datos que mapearemos con las respuestas de la API REST
interface ApiResponse {
  ok: boolean;
  message?: string;
  data?: User;
}

const register = async (
  name: string,
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    // Llamamos a la API
    const response = await fetch(API_URL + "/users/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Recoger los datos devueltos por la API
      const data = await response.json();
      return { ok: true, data };
    } else {
      const errorData = await response.json();
      return {
        ok: false,
        message: errorData.message || "Error en la solictud",
      };
    }
  } catch (error) {
    console.error("Error al realizar la solicitud : ", error);
    return { ok: false, message: "Error al procesar la solicitud" };
  }
};

const login = async (name: string, password: string): Promise<ApiResponse> => {
  try {
    // Llamamos a la API
    const response = await fetch(API_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify({
        name,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Recoger los datos devueltos por la API
      const data = await response.json();
      return { ok: true, data };
    } else {
      const errorData = await response.json();
      return {
        ok: false,
        message: errorData.message || "Error en la solictud",
      };
    }
  } catch (error) {
    console.error("Error al realizar la solicitud : ", error);
    return { ok: false, message: "Error al procesar la solicitud" };
  }
};

const logout = async (): Promise<void> => {
  try {
    // Llamamos a la API
    const response = await fetch(API_URL + "/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error al cerrar la sesión");
    }
  } catch (error) {
    console.error("Error al realizar la solicitud : ", error);
  }
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
