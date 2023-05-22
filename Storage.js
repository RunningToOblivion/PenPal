import AsyncStorage from "@react-native-async-storage/async-storage";

// Storing the value
export const storeValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value:", error);
  }
};

// Retrieving the value
export const getValue = async (key,value) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Value exists, do something with it
      console.log("Stored value:", value);
    } else {
      // Value doesn't exist
      console.log("No stored value found");
    }
  } catch (error) {
    console.log("Error retrieving value:", error);
  }
};
