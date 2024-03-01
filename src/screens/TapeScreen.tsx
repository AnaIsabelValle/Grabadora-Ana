import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from "expo-av";

import Ionicons from "@expo/vector-icons/Ionicons";

import { RecordFile, RootDrawerParamList } from "../types/types";
import RecordCard from "../components/RecordCard";
import appColors from "../../assets/styles/appColors";
import {
  readRecordings,
  removeRecordings,
  saveRecordings,
} from "../services/audio.service";

type TapeScreenProps = NativeStackScreenProps<RootDrawerParamList, "Tape">;

type Props = {
  data: RecordFile[];
};

const ListRecords = (props: Props) => {
  const renderEmpty = () => (
    <View style={{ alignItems: "center" }}>
      <Text style={{ padding: 20, marginTop: 5, fontSize: 15 }}>
        No hay grabaciones
      </Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{
        marginBottom: 10,
      }}
      data={props.data}
      renderItem={({ item }) => (
        <RecordCard
          record={item as RecordFile}
          onPlay={async () => {
            if (item.file) {
              const { sound } = await Audio.Sound.createAsync({
                uri: item.file,
              });
              await sound.replayAsync();
            }
          }}
        />
      )}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.2}
      style={{
        marginBottom: 0,
      }}
    />
  );
};

const TapeScreen = ({ navigation }: TapeScreenProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordList, setRecordList] = useState<RecordFile[]>([]);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const getAllAudios = async () => {
      let audioList = await readRecordings();
      if (audioList !== null) {
        setRecordList(audioList);
      }
    };
    getAllAudios();
  }, []);

  const deleteRecords = async () => {
    Alert.alert("Todos los audios han sido eliminados");
    setRecordList([]);
    await removeRecordings();
  };

  const startRecording = async () => {
    try {
      if (permissionResponse != null) {
        if (permissionResponse.status != "granted") {
          console.log("Requesting permission..");
          await requestPermission();
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log("Starting recording..");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setIsRecording(true);
        setRecording(recording);
        console.log("Recording started");
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    console.log("Stopping recording..");

    setIsRecording(false);
    setRecording(undefined);

    await recording.stopAndUnloadAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();

    const { sound, status } = await recording.createNewLoadedSoundAsync();

    console.log("SOUND -----> ", sound);

    if (status.isLoaded) {
      const newAudio: RecordFile = {
        title: `Audio ${(recordList.length + 1).toString().padStart(2, "0")}`,
        duration: getDurationFormatted(status.durationMillis),
        date: Date.now(),
        sound: sound,
        file: uri,
      };
      setRecordList((prevState) => [...prevState, newAudio]);

      await saveRecordings([...recordList, newAudio]);
    }
    console.log("Recording stopped and stored at", uri);
  };

  const getDurationFormatted = (milliseconds: number | undefined) => {
    if (milliseconds !== undefined) {
      const minutes = milliseconds;
      const minutesDisplay = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesDisplay) * 60);
      const secondsDisplay = seconds < 60 ? `0${seconds}` : seconds;
      return `${minutesDisplay}:${secondsDisplay}`;
    }
    return "0:00";
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ListRecords data={recordList} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 15,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (recording) {
              stopRecording();
            } else {
              startRecording();
            }
          }}
        >
          {/** Si queremos el icono al lado del texto */}
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}
          <Ionicons name="mic-outline" color="white" size={32} />
          <Text style={styles.buttonTitle}>
            {recording ? "Grabando..." : "Grabar"}
          </Text>
          {/* </View> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: appColors.redNeon,
              opacity: recording ? 0.5 : 1,
            },
          ]}
          disabled={isRecording}
          onPress={deleteRecords}
        >
          <Ionicons name="trash-outline" color="white" size={32} />
          <Text style={styles.buttonTitle}>Borrar audios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  footerText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 200,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TapeScreen;
