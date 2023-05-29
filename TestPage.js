import { storeValue, getValue } from "./Storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import Dropdown from "./Dropdown";
import PageMenu from "./PageMenu";
import ModalInput from "./ModalInput";
import { useFonts, Inconsolata_400Regular } from '@expo-google-fonts/inconsolata';
import {
  Roboto_400Regular, Roboto_300Light
} from "@expo-google-fonts/roboto";
import { Lora_400Regular } from "@expo-google-fonts/lora";

export default function TestPage({ route, navigation }) {
  const { poem_date, writable } = route.params;
  const [selectedType, setSelectedType] = useState("");
  const [poem, setPoem] = useState("");
  const [modalActive, setModal] = useState("");

  useEffect(() => {
    setSelectedType("Sonnet");
    const getPoem = async () => {
      const poem = await getValue(poem_date);
      return poem === 0 ? "" : poem;
    };

    const fetchPoem = async () => {
      const poem = await getPoem();
      setPoem(poem);
    };

    fetchPoem();
  }, []);

  useEffect(() => {
    console.log(poem);
  }, [poem]);

  let [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    Roboto_300Light,
    Roboto_400Regular,
    Lora_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handlePoemChange = (value) => {
    setPoem(value);
  };

  const options = [
    {
      style: "Haiku",
      rules: "Three lines: 5 syllables, 7 syllables, 5 syllables",
    },
    {
      style: "Sonnet",
      rules:
        "14 lines: 3 quatrains and a couplet, with a specific rhyme scheme",
    },
    // Add more options with their corresponding style and rules
  ];
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 20,
        alignItems: "center",
        gap:20,
        backgroundColor:"#1e1e2e"
      }}
    >
      <View style={{alignSelf:"flex-start"}}><PageMenu navigation={navigation}/></View>
      <Text style={{fontSize:30,fontFamily:"Lora_400Regular",color:"#cdd6f4"}}>What are we writing today?</Text>
      <Dropdown
        options={options}
        selectedValue={selectedType}
        onValueChange={setSelectedType}
      />
      <ModalInput
        isOpen={modalActive}
        poem={poem}
        updatePoem={setPoem}
        onClose={() => setModal(false)}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          if (writable == true) {
            setModal(true);
          }
        }}
      >
        <Text style={{fontSize:19,borderColor:"#cdd6f4",borderWidth:1,padding:10,width:"80%",height:"60%",borderRadius:10,fontFamily:"Roboto_300Light",color:"#cdd6f4"}}>{poem == "" ? "Start writing" : poem}</Text>
      </TouchableWithoutFeedback>
      <Button
        title="Save Poem"
        onPress={() => {
          storeValue(
            `${new Date().getFullYear()}-${
              new Date().getMonth() < 10
                ? "0" + (new Date().getMonth() + 1)
                : new Date().getMonth() + 1
            }-${
              new Date().getDate() < 10
                ? "0" + new Date().getDate()
                : new Date().getDate()
            }`,
            poem
          );
          console.log(poem);
        }}
       color={"#fab387"}
      />
    </View>
  );
}
