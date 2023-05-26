import React, { useState, useRef } from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import {
  useFonts,
  Inconsolata_400Regular,
} from "@expo-google-fonts/inconsolata";
import {
  Roboto_400Regular, Roboto_300Light
} from "@expo-google-fonts/roboto";
import { Lora_400Regular } from "@expo-google-fonts/lora";

const ModalInput = ({ isOpen, onClose, poem, updatePoem }) => {
  const [inputValue, setInputValue] = useState(poem);
  const inputRef = useRef(null)

  const handleClose = () => {
    updatePoem(inputValue);
    onClose();
  };
  let [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    Roboto_400Regular,
    Lora_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <KeyboardAvoidingView style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TextInput
          ref={inputRef}
            style={styles.input}
            multiline
            value={inputValue}
            onChangeText={setInputValue}
            scrollEnabled={true}
            onFocus={function () {
              this.style.maxHeight = "60%";
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontFamily: "Roboto_300Light",
  },
  modalContent: {
    width: "90%",
    height: "90%",
    backgroundColor: "#1e1e2e",
    padding: 16,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fab387",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#9399b2",
    borderRadius: 4,
    padding: 8,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    maxHeight: "100%",
    color:"#cdd6f4"
  },
});

export default ModalInput;
