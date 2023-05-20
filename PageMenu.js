import React, { useState } from 'react';
import { Button, Modal, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MenuItem = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openModal}>
        <FontAwesome name="bars" size={30} color="#000" />
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
