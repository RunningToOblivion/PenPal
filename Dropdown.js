import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

const Dropdown = ({ options, selectedValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOptionsHeight, setDropdownOptionsHeight] = useState(null);

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
    <View style={styles.dropdown}>
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
});

export default Dropdown;
