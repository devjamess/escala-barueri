import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { useTheme } from 'styled-components/native';

const CustomCalendar = ({ highlightedDates = {} }) => {
    
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const startMonth = startOfMonth(date);
    const endMonth = endOfMonth(date);
    const startDate = startOfWeek(startMonth);
    const endDate = endOfWeek(endMonth);

    const tempDays = [];
    let current = startDate;

    while (current <= endDate) {
      tempDays.push(current);
      current = addDays(current, 1);
    }

    setDays(tempDays);
  };

  const handlePrev = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNext = () => setCurrentDate(addMonths(currentDate, 1));

  const renderDay = (day) => {
    const formatted = format(day, 'yyyy-MM-dd');
    const highlight = highlightedDates[formatted];

    return (
      <View key={formatted} style={styles.dayContainer}>
        <TouchableOpacity
          style={[
            styles.day,
            !isSameMonth(day, currentDate) && styles.outMonthDay,
            highlight?.container,
            isSameDay(day, new Date()) && styles.today
          ]}
        >
          <Text style={[styles.dayText, highlight?.text]}>{format(day, 'd')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrev}><Text style={styles.navText}>{'<'}</Text></TouchableOpacity>
        <Text style={styles.monthText}>{format(currentDate, 'MMMM yyyy')}</Text>
        <TouchableOpacity onPress={handleNext}><Text style={styles.navText}>{'>'}</Text></TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <Text key={i} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      <View style={styles.daysContainer}>
        {days.map(renderDay)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  weekDay: {
    width: 32,
    textAlign: 'center',
    fontWeight: '00'
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayContainer: {
    width: '14.2%',
    paddingVertical: 6,
    alignItems: 'center',
  },
  day: {
    width: 45,
    height: 30,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  outMonthDay: {
    opacity: 0,
  },
  today: {
    borderWidth: 3,
    borderColor: '#0F1A30FF',
    
 
  }
});

export default CustomCalendar;
