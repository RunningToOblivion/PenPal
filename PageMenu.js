import React, { useState } from 'react';
import { Button, Modal, View, Text, TouchableOpacity,StyleSheet,useColorScheme} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    position: "relative",
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
});

const MenuItem = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const containerStyle = isDarkMode
  ? styles.containerDark
  : styles.containerLight;
  const textStyle = isDarkMode ? styles.textDark : styles.textLight;
  const dropdownStyle = isDarkMode ? styles.dropdownDark : styles.dropdownLight;
  const inputStyle = isDarkMode ? styles.inputDark : styles.inputLight;

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <FontAwesome name="bars" size={30} color={isDarkMode?"#fff":"#000"} />
      </TouchableOpacity>

      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <View>
          <Text>Menu</Text>
          {/* Add buttons for different pages */}
          {/* Each button onPress should navigate to a specific page */}
          {/* You can use navigation libraries like react-navigation or react-native-navigation */}
        </View>
      </Modal>
    </View>
  );
};

export default MenuItem;
