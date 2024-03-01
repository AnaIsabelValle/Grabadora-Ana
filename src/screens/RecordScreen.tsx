import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const RecordScreen = () => {
  const onStartRecording = () => false;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.recordButton} onPress={onStartRecording}>
        <Ionicons
          name="mic-outline"
          size={50}
          color={"#fff"}
          style={{ justifyContent: "center" }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "rgba(190, 0, 4, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25%",
  },
});

export default RecordScreen;
