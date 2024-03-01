import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import { RootDrawerParamList, User } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import authService from "../services/auth.service";

type LoginScreenProps = NativeStackScreenProps<RootDrawerParamList, "Login">;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const imagenBarranquera = require("../../assets/images/Barranquera.jpg");

  const { loginUser } = useAuth();

  const manejoIniciarSesion = async () => {
    try {
      if (nombreUsuario && passwordUsuario) {
        // Llamar al service
        const response = await authService.login(
          nombreUsuario,
          passwordUsuario
        );

        if (response.ok) {
          // Limpiar los inputs
          setNombreUsuario("");
          setPasswordUsuario("");

          loginUser(response.data as User);

          navigation.navigate("Home");
        } else {
          Alert.alert("Inicio de sesión fallido:", response.message);
        }
      } else {
        Alert.alert("Todas las credenciales son necesarias");
      }
    } catch (error: any) {
      console.error("Error en el inicio de sesión : " + error.message);
    }
  };

  const onRegisterLinkPressed = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={imagenBarranquera}
      resizeMode="cover"
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          enabled={true} // Valor por default
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            automaticallyAdjustKeyboardInsets={true}
          >
            <View style={styles.body}>
              <View>
                <Text style={styles.credenciales}>
                  Bienvenid@ {"\n"}
                  {"\n"} INTRODUZCA CREDENCIALES
                </Text>
              </View>
              <View>
                <Text style={styles.labelText}>Usuario</Text>
                <TextInput
                  style={styles.formFieldText}
                  autoCapitalize="none"
                  placeholder="Introduzca el usuario"
                  value={nombreUsuario}
                  onChangeText={(newText) => setNombreUsuario(newText)}
                />
              </View>
              <View>
                <Text style={styles.labelText}>Contraseña</Text>
                <TextInput
                  style={styles.formFieldText}
                  autoCapitalize="none"
                  placeholder="Introduzca la contraseña"
                  secureTextEntry={true}
                  value={passwordUsuario}
                  onChangeText={(newText) => setPasswordUsuario(newText)}
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.botonIniciarSesion,
                  { backgroundColor: pressed ? "#2979FF" : "#efb810" },
                ]}
                onPress={manejoIniciarSesion}
              >
                <Text style={styles.textoIniciarSesion}>Iniciar Sesión</Text>
              </Pressable>
            </View>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                ¿No Tienes una cuenta?{" "}
                <Text style={styles.loginLink} onPress={onRegisterLinkPressed}>
                  Crear cuenta
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  credenciales: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  },
  labelText: {
    color: "white",
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 5,
    paddingTop: 10,
  },
  formFieldText: {
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#efb810",
  },
  botonIniciarSesion: {
    borderRadius: 100,
    padding: 15,
    marginTop: 80,
  },
  textoIniciarSesion: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "white",
  },
  loginLink: {
    color: "#efb810",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
