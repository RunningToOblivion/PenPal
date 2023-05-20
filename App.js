import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import Dropdown from "./Dropdown";
import PageMenu from './PageMenu';

export default function App() {
  const [selectedType, setSelectedType] = useState("");
  const [poem, setPoem] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textInputRef = useRef(null);

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

  const handleOutsidePress = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  const containerStyle = isDarkMode
    ? styles.containerDark
    : styles.containerLight;
  const textStyle = isDarkMode ? styles.textDark : styles.textLight;
  const dropdownStyle = isDarkMode ? styles.dropdownDark : styles.dropdownLight;
  const inputStyle = isDarkMode ? styles.inputDark : styles.inputLight;
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
    <View style={[styles.container, containerStyle]}>
      <PageMenu/>
      <Text style={[styles.text, textStyle]}>What are we writing today?</Text>
      <Dropdown
        options={options}
        selectedValue={selectedType}
        onValueChange={handleTypeChange}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        multiline
        ref={textInputRef}
        value={poem}
        onChangeText={handlePoemChange}
        placeholder="Write your poem here..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLight: {
    backgroundColor: "#FFFFFF", // Light mode background color
  },
  containerDark: {
    backgroundColor: "#000000", // Dark mode background color
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
  textLight: {
    color: "#000000", // Light mode text color
  },
  textDark: {
    color: "#FFFFFF", // Dark mode text color
  },
  input: {
    width: "80%",
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 16, // Adjust the margin to create space between the dropdown and the text input
  },
  inputLight: {
    borderColor: "#000000", // Light mode input border color
    color: "#000000", // Light mode input text color
  },
  inputDark: {
    borderColor: "#FFFFFF", // Dark mode input border color
    color: "#FFFFFF", // Dark mode input text color
  },
});
