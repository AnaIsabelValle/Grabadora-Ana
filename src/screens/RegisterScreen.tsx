import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { RootDrawerParamList, User } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import appColors from "../../assets/styles/appColors";

import authService from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

type RegisterScreenProps = NativeStackScreenProps<
  RootDrawerParamList,
  "Register"
>;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loginUser } = useAuth();

  const onLoginLinkPressed = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = async () => {
    if (passwordUsuario !== confirmPassword) {
      Alert.alert("Aviso", "¡ Las contraseñas no coinciden !");
      return;
    }

    try {
      // Llamar al service
      const response = await authService.register(
        nombreUsuario,
        emailUsuario,
        passwordUsuario
      );

      if (response.ok) {
        setNombreUsuario("");
        setEmailUsuario("");
        setPasswordUsuario("");
        setConfirmPassword("");

        loginUser(response.data as User);
        navigation.navigate("Home");
      } else {
        Alert.alert("Inicio de sesión fallido:", response.message);
      }
    } catch (error: any) {
      console.error("Error en el inicio de sesión : " + error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Barranquera.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          enabled={true} // Valor por default
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            style={styles.logo}
            source={require("../../assets/sunset.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            onChangeText={(text) => setNombreUsuario(text)}
            value={nombreUsuario}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="emailUsuario"
            placeholderTextColor="#aaa"
            onChangeText={(text) => setEmailUsuario(text)}
            value={emailUsuario}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            secureTextEntry
            placeholder="Contraseña"
            onChangeText={(text) => setPasswordUsuario(text)}
            value={passwordUsuario}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            secureTextEntry
            placeholder="Confirmar Contraseña"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPressed()}
          >
            <Text style={styles.buttonTitle}>Crear cuenta</Text>
          </TouchableOpacity>

          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              ¿Tienes ya una cuenta?{" "}
              <Text style={styles.loginLink} onPress={onLoginLinkPressed}>
                Acceder
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  logo: {
    flex: 1,
    width: 150,
    alignSelf: "center",
    margin: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: appColors.golden,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
    color: appColors.golden,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterScreen;
