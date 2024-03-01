import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RecordFile } from "../types/types";

type Props = {
  record: RecordFile;
  onPlay: Function;
};

const RecordCard = (props: Props) => {
  const record = props.record;
  const onPlay = props.onPlay;

  const _onPlay = () => {
    onPlay();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_onPlay}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 2,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {record.title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.duration}>{record.duration}</Text>
          <TouchableOpacity onPress={_onPlay}>
            <Ionicons name="play" size={28} color={"#00a086"} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#efb810",
    marginLeft: 25,
  },
  duration: {
    fontSize: 14,
    fontWeight: "700",
    paddingRight: 8,
    textAlign: "right",
    color: "#b2b5b4",
  },
  dateText: {
    fontSize: 14,
    paddingBottom: 2,
    fontWeight: "600",
    color: "#b2b5b4",
  },
});

export default RecordCard;
