import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleDateSelection = (day) => {
    const selectedDate = new Date(selectedYear, selectedMonth, day + 1);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    setSelectedDate(formattedDate);
  };

  const handleMonthSelection = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
  };

  const renderCalendar = () => {
    const calendar = [];
    const numberOfDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    for (let i = 0; i < numberOfDays; i++) {
      const day = i + 1;
      const formattedDate = `${selectedYear}-${selectedMonth + 1}-${day < 10 ? '0' + day : day}`;

      calendar.push(
        <TouchableOpacity
          key={i}
          style={selectedDate === formattedDate ? styles.selectedDay : styles.day}
          onPress={() => handleDateSelection(day)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    return calendar;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleMonthSelection(selectedMonth - 1)}>
          <Text style={styles.headerText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })}
        </Text>
        <TouchableOpacity onPress={() => handleMonthSelection(selectedMonth + 1)}>
          <Text style={styles.headerText}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleYearSelection(selectedYear - 1)}>
          <Text style={styles.headerText}>{'<<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{selectedYear}</Text>
        <TouchableOpacity onPress={() => handleYearSelection(selectedYear + 1)}>
          <Text style={styles.headerText}>{'>>'}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  day: {
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  selectedDay: {
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Calendar;
