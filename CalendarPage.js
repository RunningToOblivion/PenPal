import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { getValue } from "./Storage";
import {
  useFonts,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { Lora_400Regular } from "@expo-google-fonts/lora";
import PageMenu from "./PageMenu";

export default function CalendarPage({ navigation }) {
  const [selected, setSelected] = useState("");
  const [marked_dates, setMarkedDates] = useState({});

  useEffect(() => {
    const getKeysAndMarkDates = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const marked_d = {};

        for (let i of keys) {
          if (new Date(i) instanceof Date && !isNaN(new Date(i))) {
            marked_d[i] = { marked: true };
          }
        }

        setMarkedDates({ ...marked_d, "2023-05-06": { marked: true } });
      } catch (e) {
        // handle error
      }
    };

    getKeysAndMarkDates();
  }, []);

  useEffect(() => {
    console.log(marked_dates); //Helps to load marked_dates somehow ? I don't know what I'm f***ing doing
  }, [marked_dates]);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Lora_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{height:"100%"}}>
      <View style={{alignItems:"flex-start",justifyContent:"flex-start",backgroundColor: "#1e1e2e",padding:40,position:"absolute",zIndex:99}}>
        <PageMenu navigation={navigation}/>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#1e1e2e",
        }}
      >
        <Calendar
          onDayPress={async (day) => {
            let date_2 = new Date();
            let day_2 =
              date_2.getDate() < 10
                ? "0" + date_2.getDate().toString()
                : date_2.getDate().toString();
            let month_2 =
              date_2.getMonth() < 10
                ? "0" + (date_2.getMonth() + 1).toString()
                : (date_2.getMonth() + 1).toString();
            let year_2 = date_2.getFullYear().toString();
            let formatted_date_2 = year_2 + "-" + month_2 + "-" + day_2;
            setSelected(day.dateString);
            console.log(day.dateString);
            console.log(await getValue(day.dateString));
            if ((await getValue(day.dateString)) != 0) {
              navigation.navigate("Test", {
                poem_date: day.dateString,
                writable: formatted_date_2 == day.dateString ? true : false,
              });
            }
          }}
          markedDates={{
            ...marked_dates,
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "black",
            },
          }}
          style={{ width: 300, backgroundColor: "#1e1e2e" }}
          theme={{
            backgroundColor: "#0b1230",
            calendarBackground: "#1e1e2e",
            textSectionTitleColor: "#fab387",
            textSectionTitleDisabledColor: "#fab387",
            selectedDayBackgroundColor: "#181825",
            selectedDayTextColor: "#fab387",
            todayTextColor: "#b4befe",
            dayTextColor: "#fab387",
            textDisabledColor: "#f9e2af",
            dotColor: "#89b4fa",
            selectedDotColor: "#ffffff",
            arrowColor: "#89b4fa",
            disabledArrowColor: "#d9e1e8",
            monthTextColor: "#cdd6f4",
            indicatorColor: "blue",
            textDayFontFamily: "Roboto_400Regular",
            textMonthFontFamily: "Roboto_400Regular",
            textDayHeaderFontFamily: "Roboto_400Regular",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </View>
  );
}
