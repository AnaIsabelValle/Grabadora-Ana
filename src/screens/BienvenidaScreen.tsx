import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../context/AuthContext";

import { RootDrawerParamList } from "../types/types";
type HomeScreenProps = NativeStackScreenProps<RootDrawerParamList, "Home">;

const BienvenidaScreen = ({ navigation }: HomeScreenProps) => {
  const { auth, logoutUser } = useAuth();

  const irAlLogin = () => {
    navigation.navigate("Login");
  };

  const irARegister = () => {
    navigation.navigate("Register");
  };

  const cerrarSesion = () => {
    logoutUser();
    irAlLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Bienvenid@ {"\n"}
        {auth ? auth.name : ""}
      </Text>

      <View style={styles.colocarImagen}>
        <Image source={require("../../assets/snack-icon.png")} />
      </View>

      {!auth ? (
        <View>
          <TouchableOpacity style={styles.boton} onPress={() => irAlLogin()}>
            <Text style={styles.login}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boton} onPress={() => irARegister()}>
            <Text style={styles.login}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.boton} onPress={() => cerrarSesion()}>
            <Text style={styles.login}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#a3c2c2",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    padding: 50,
    textAlign: "center",
  },
  colocarImagen: {
    marginBottom: 60,
  },
  login: {
    fontSize: 30,
    fontWeight: "300",
    color: "white",
  },
  boton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#ff9900",
    borderRadius: 50,
    marginBottom: 40,
  },
});

export default BienvenidaScreen;
