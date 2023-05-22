import { storeValue, getValue } from "./Storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button
} from "react-native";
import Dropdown from "./Dropdown";
import PageMenu from "./PageMenu";
import Calendar from "./Calendar";

export default function TestPage() {
  const [selectedType, setSelectedType] = useState("");
  const [poem, setPoem] = useState("");

  useEffect(() => {
    // Fetch initial settings or use a default type and poem
    // Here, you can load the default type and poem from storage or an API if needed
    setSelectedType("Sonnet");
    setPoem("");
  }, []);

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
    <View>
      <PageMenu />
      <Text>What are we writing today?</Text>
      <Button title="Save Poem" onPress={()=>{storeValue(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`, poem)}} />
      <Button title="Read Poem" onPress={()=>{getValue(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`)}} />
      <Calendar/>
      <Dropdown
        options={options}
        selectedValue={selectedType}
        onValueChange={setSelectedType}
      />
      <TextInput
        multiline
        value={poem}
        onChangeText={setPoem}
        placeholder="Write your poem here..."
      />
    </View>
  );
}
