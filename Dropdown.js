import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";

const Dropdown = ({ options, selectedValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOptionsHeight, setDropdownOptionsHeight] = useState(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    if (isOpen) {
      const optionsContainerHeight = options.length * 60; // Assuming each option has a height of 60
      setDropdownOptionsHeight(optionsContainerHeight);
    }
  }, [isOpen, options]);

  const handleOptionPress = (value) => {
    setIsOpen(false);
    onValueChange(value);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const containerStyle = isDarkMode
    ? styles.containerDark
    : styles.containerLight;
  const textStyle = isDarkMode ? styles.textDark : styles.textLight;
  const dropdownStyle = isDarkMode ? styles.dropdownDark : styles.dropdownLight;
  const inputStyle = isDarkMode ? styles.inputDark : styles.inputLight;

  const renderItem = ({ item }) => {
    const { style, rules } = item;
    return (
      <TouchableOpacity
        style={styles.dropdownOption}
        onPress={() => handleOptionPress(style)}
      >
        <Text style={styles.dropdownOptionText}>{style}</Text>
        <Text style={styles.dropdownOptionRules}>{rules}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.dropdown,isDarkMode?styles.dropdownDark:styles.dropdownLight]}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.dropdownHeaderText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal visible={isOpen} transparent>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.dropdownOptionsContainer,
                { height: dropdownOptionsHeight },
                dropdownOptionsHeight ? styles.centered : null,
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.style}
                renderItem={renderItem}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    position: "relative",
    borderWidth: 1,
    borderRadius: 8
  },
  dropdownHeader: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownHeaderText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownOptionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
  },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  dropdownOptionRules: {
    fontSize: 12,
    marginTop: 4,
    color: "gray",
  },
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
  dropdownDark: {
    borderColor: "white",
    color:"white",
  },
  dropdownLight: {
    borderColor: "black",
    color:"black",
  }
});

export default Dropdown;
