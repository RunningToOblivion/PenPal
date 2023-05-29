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
import PageMenu from "./PageMenu";
import PoemPage from "./PoemPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import TestPage from "./TestPage";
import CalendarPage from "./CalendarPage";

const Stack = createNativeStackNavigator();

export default function App() {
  let date = new Date();
  let day =
    date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString();
  let month =
    date.getMonth() < 10
      ? "0" + (date.getMonth()+1).toString()
      : (date.getMonth()+1).toString();
  let year = date.getFullYear().toString();
  let formatted_date = year + "-" + month + "-" + day;
  console.log(formatted_date)
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={PoemPage}
          initialParams={{ poem_date: formatted_date, writable: true }}
        />
        <Stack.Screen
          name="Test"
          component={TestPage}
          initialParams={{ poem_date: formatted_date, writable: true }}
        />
        <Stack.Screen name="Calendar" component={CalendarPage} />
      </Stack.Navigator>
    </NavigationContainer>
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
