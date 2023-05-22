import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateSelection = (day, isCurrentMonth, isPrevMonth) => {
    let month = isCurrentMonth
      ? selectedMonth
      : selectedMonth + (isCurrentMonth ? 0 : (isPrevMonth ? -1 : 1)); //Made change here, it broke something
    let year = selectedYear;
    console.log(month,year)
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }
    console.log(month,year)
    const selectedDate = new Date(year, month, day);
    console.log(selectedDate)
    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const handleMonthSelection = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
  };
  /*
  const renderCalendar = () => {
    const calendar = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInPreviousMonth = new Date(
      selectedYear,
      selectedMonth,
      0
    ).getDate();

    // Render last days of previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i;
      const formattedDate = `${selectedYear}-${selectedMonth}-${day < 10 ? '0' + day : day}`;

      calendar.push(
        <TouchableOpacity
          key={`prev_${i}`}
          style={styles.day}
          onPress={() => handleDateSelection(day, false)}
        >
          <Text style={[styles.dayText, styles.grayText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Render days of current month
    for (let i = 0; i < numberOfDays; i++) {
      const day = i + 1;
      const formattedDate = `${selectedYear}-${selectedMonth + 1}-${
        day < 10 ? "0" + day : day
      }`;

      calendar.push(
        <TouchableOpacity
          key={i}
          style={
            selectedDate === formattedDate ? styles.selectedDay : styles.day
          }
          onPress={() => handleDateSelection(day, true)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Render first days of next month
    const totalCells = firstDayOfMonth + numberOfDays;
    const remainingCells = 42 - totalCells;
    for (let i = 0; i < remainingCells; i++) {
      const day = i + 1;
      const formattedDate = `${selectedYear}-${selectedMonth + 2}-${day < 10 ? '0' + day : day}`;

      calendar.push(
        <TouchableOpacity
          key={`next_${i}`}
          style={styles.day}
          onPress={() => handleDateSelection(day, false)}
        >
          <Text style={[styles.dayText, styles.grayText]}>{day}</Text>
        </TouchableOpacity>
      );
    }


    return calendar;
  };*/

  const renderCalendar = () => {
    const calendar = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInPreviousMonth = new Date(
      selectedYear,
      selectedMonth,
      0
    ).getDate();

    // Render last days of previous month
    const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const formattedDate = `${prevYear}-${(prevMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      calendar.push(
        <TouchableOpacity
          key={`prev_${i}`}
          style={styles.day}
          onPress={() => handleDateSelection(day, false, true)}
        >
          <Text style={[styles.dayText, styles.grayText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Render days of current month
    for (let i = 0; i < numberOfDays; i++) {
      const day = i + 1;
      const formattedDate = `${selectedYear}-${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      calendar.push(
        <TouchableOpacity
          key={i}
          style={
            selectedDate === formattedDate ? styles.selectedDay : styles.day
          }
          onPress={() => handleDateSelection(day, true, false)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    // Render first days of next month
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const totalCells = firstDayOfMonth + numberOfDays;
    const remainingCells = 42 - totalCells;

    for (let i = 0; i < remainingCells; i++) {
      const day = i + 1;
      const formattedDate = `${nextYear}-${(nextMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      calendar.push(
        <TouchableOpacity
          key={`next_${i}`}
          style={styles.day}
          onPress={() => handleDateSelection(day, false, false)}
        >
          <Text style={[styles.dayText, styles.grayText]}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return calendar;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleMonthSelection(selectedMonth - 1)}
        >
          <Text style={styles.headerText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {new Date(selectedYear, selectedMonth).toLocaleString("default", {
            month: "long",
          })}
        </Text>
        <TouchableOpacity
          onPress={() => handleMonthSelection(selectedMonth + 1)}
        >
          <Text style={styles.headerText}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleYearSelection(selectedYear - 1)}>
          <Text style={styles.headerText}>{"<<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{selectedYear}</Text>
        <TouchableOpacity onPress={() => handleYearSelection(selectedYear + 1)}>
          <Text style={styles.headerText}>{">>"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>{renderCalendar()}</View>
      <Text style={styles.selectedDate}>{selectedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  day: {
    width: "14%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  selectedDay: {
    width: "14%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  grayText: {
    color: "gray",
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Calendar;
