import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, getDaysInMonth } from 'date-fns';
import { useTheme } from 'styled-components/native';
import { useAuth } from '../hook/useAuth';

const CustomCalendar = ({ highlightedDates = {} }) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.calendar_background,
    elevation: 10,
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
    color: colors.text,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  weekDay: {
    width: 32,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.text,
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
    color: colors.text,
  },
  outMonthDay: {
    opacity: 0,
  },
  today: {
    borderWidth: 3,
    borderColor: '#0F1A30FF',
    borderRadius: 8
  },
   workDay: {
        backgroundColor: '#4CAF50',
        borderRadius: 8
    },
    workDayText: {
        color: '#FFFFFF',
    },
    restDay: {
        backgroundColor: '#F44336',
        borderRadius: 8
    },
    restDayText: {
        color: '#FFFFFF',
    },
});

    const {user} = useAuth();
    const escala = user?.escala;
    const [currentDate, setCurrentDate] = useState(new Date());

    // 🔥 Lógica de 'getWorkDaysMap' adaptada do CalendarProfile.jsx
    // useMemo é usado para otimização, recalculando o mapa apenas quando a data ou a escala mudam.
    const workDaysMap = useMemo(() => {
        if (!escala || !escala.data_inicio) return {};

        const workMap = {};
        // Garante que a data de início seja um objeto Date do JS, sem fuso horário.
        const startDate = new Date(escala.data_inicio + 'T00:00:00');
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(currentDate);

        // Caso 1: Escala em dias (ex: 6x1, 5x2)
        if (escala.dias_trabalhados && escala.dias_n_trabalhados) {
            const cycleLength = escala.dias_trabalhados + escala.dias_n_trabalhados;
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                // Diferença em dias
                const diff = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));

                if (diff >= 0) {
                    const cycleDay = diff % cycleLength;
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    if (cycleDay < escala.dias_trabalhados) {
                        workMap[formattedDate] = 'work';
                    } else {
                        workMap[formattedDate] = 'rest';
                    }
                }
            }
        }
        // Caso 2: Escala em horas (ex: 12x36, 24x48)
        else if (escala.tipo_escala === "24x48" || escala.tipo_escala === "12x36") {
            const cycleLength = escala.tipo_escala === "24x48" ? 72 : 48; // Duração do ciclo em horas
            const workHours = escala.tipo_escala === "24x48" ? 24 : 12;

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                 // Diferença em horas
                const diffHours = Math.floor((date - startDate) / (1000 * 60 * 60));

                if (diffHours >= 0) {
                    const cycleHour = diffHours % cycleLength;
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    if (cycleHour < workHours) {
                        workMap[formattedDate] = 'work';
                    } else {
                        workMap[formattedDate] = 'rest';
                    }
                }
            }
        }
        return workMap;
    }, [currentDate, escala]);


    const handlePrev = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNext = () => setCurrentDate(addMonths(currentDate, 1));

    const renderDay = (day) => {
        const formatted = format(day, 'yyyy-MM-dd');
        // Verifica se o dia é de trabalho ou folga a partir do mapa gerado
        const dayType = workDaysMap[formatted];

        const dayStyles = [styles.day];
        const dayTextStyles = [styles.dayText];

        if (!isSameMonth(day, currentDate)) {
            dayStyles.push(styles.outMonthDay);
        }
        if (isSameDay(day, new Date())) {
            dayStyles.push(styles.today);
        }
        // Aplica o estilo de trabalho ou folga
        if (dayType === 'work') {
            dayStyles.push(styles.workDay);
            dayTextStyles.push(styles.workDayText);
        } else if (dayType === 'rest') {
            dayStyles.push(styles.restDay);
            dayTextStyles.push(styles.restDayText);
        }

        return (
            <View key={formatted} style={styles.dayContainer}>
                <TouchableOpacity style={dayStyles}>
                    <Text style={dayTextStyles}>{format(day, 'd')}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderCalendarDays = () => {
        const startMonth = startOfMonth(currentDate);
        const endMonth = endOfMonth(currentDate);
        const startDate = startOfWeek(startMonth);
        const endDate = endOfWeek(endMonth);

        const tempDays = [];
        let current = startDate;

        while (current <= endDate) {
            tempDays.push(current);
            current = addDays(current, 1);
        }
        return tempDays.map(renderDay);
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
                {renderCalendarDays()}
            </View>
        </View>
    );
};




export default CustomCalendar;
