import React, { useState, useMemo, useCallback } from "react";
import styles from "./calendar.module.scss";
import { ModalWrapper } from "../shared";
import type {
  CalendarEvent,
  CalendarProps,
  TimeSlotInfo,
  WeekDate,
} from "./types";
import c from "./calendar.config";
import { initialUsers } from "@/pages/Admin/AdminPage";

const Calendar: React.FC<CalendarProps> = ({
  events,
  startHour = 0,
  endHour = 24,
  initialDate,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const showEventPopup = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const closeEventPopup = () => {
    setSelectedEvent(null);
  };

  const validEvents = useMemo(() => {
    return events.filter((event) => {
      const [startHour, startMinute] = event.startTime.split(":").map(Number);
      const [endHour, endMinute] = event.endTime.split(":").map(Number);

      // Проверяем, что событие не переходит на следующий день
      if (
        endHour < startHour ||
        (endHour === startHour && endMinute < startMinute)
      ) {
        console.warn(
          `Событие "${event.title}" пересекает дни и будет проигнорировано: ${event.date} ${event.startTime}-${event.endTime}`
        );
        return false;
      }

      return true;
    });
  }, [events]);

  // Получаем даты текущей недели
  const weekDates = useMemo((): WeekDate[] => {
    const dates: WeekDate[] = [];
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      dates.push({
        date,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dateString: date.toISOString().split("T")[0],
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }
    return dates;
  }, [currentDate]);

  const timeSlots = useMemo((): TimeSlotInfo[] => {
    const slots: TimeSlotInfo[] = [];
    let currentPosition = c.INITIAL_OFFSET;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        slots.push({
          time,
          hour,
          minute,
          pixelPosition: currentPosition,
        });

        currentPosition += c.SLOT_HEIGHT;
      }
    }

    return slots;
  }, [startHour, endHour]);

  const timeToMinutes = useCallback((time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }, []);

  const calculateEventPosition = useCallback(
    (startTime: string, endTime: string): { top: number; height: number } => {
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);

      const startSlot = timeSlots.find((slot) => {
        const slotMinutes = slot.hour * 60 + slot.minute;
        return slotMinutes === startMinutes;
      });

      const endSlot = timeSlots.find((slot) => {
        const slotMinutes = slot.hour * 60 + slot.minute;
        return slotMinutes === endMinutes;
      });

      if (!startSlot) {
        console.warn(`Не найден стартовый слот для времени: ${startTime}`);
        return { top: 0, height: 60 };
      }

      if (!endSlot) {
        console.warn(`Не найден конечный слот для времени: ${endTime}`);
        return { top: startSlot.pixelPosition, height: 60 };
      }

      const top = startSlot.pixelPosition;
      const height = endSlot.pixelPosition - startSlot.pixelPosition;

      // Минимальная высота для видимости
      const minHeight = 20;

      return {
        top,
        height: Math.max(height, minHeight),
      };
    },
    [timeSlots, timeToMinutes]
  );

  // Функция для расчета колонок пересекающихся событий в одном дне
  const calculateEventLayout = useCallback(
    (dayEvents: CalendarEvent[]): CalendarEvent[] => {
      if (dayEvents.length === 0) return [];

      // Сортируем события по времени начала
      const sortedEvents = [...dayEvents].sort((a, b) => {
        return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
      });

      // Группируем пересекающиеся события
      const groups: CalendarEvent[][] = [];
      let currentGroup: CalendarEvent[] = [];
      let currentEndTime = "00:00";

      sortedEvents.forEach((event) => {
        if (timeToMinutes(event.startTime) >= timeToMinutes(currentEndTime)) {
          // Начинаем новую группу
          if (currentGroup.length > 0) {
            groups.push([...currentGroup]);
          }
          currentGroup = [event];
          currentEndTime = event.endTime;
        } else {
          // Добавляем в текущую группу
          currentGroup.push(event);
          if (timeToMinutes(event.endTime) > timeToMinutes(currentEndTime)) {
            currentEndTime = event.endTime;
          }
        }
      });

      // Добавляем последнюю группу
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }

      // Для каждой группы рассчитываем колонки
      const result: CalendarEvent[] = [];

      groups.forEach((group) => {
        if (group.length === 1) {
          // Одно событие - занимает всю ширину
          const event = { ...group[0], column: 0, columnCount: 1 };
          result.push(event);
        } else {
          // Несколько пересекающихся событий - распределяем по колонкам
          const columns: CalendarEvent[][] = [];

          group.forEach((event) => {
            let placed = false;

            // Ищем первую доступную колонку
            for (let i = 0; i < columns.length; i++) {
              const lastEventInColumn = columns[i][columns[i].length - 1];
              if (
                timeToMinutes(event.startTime) >=
                timeToMinutes(lastEventInColumn.endTime)
              ) {
                columns[i].push(event);
                event.column = i;
                event.columnCount = columns.length;
                placed = true;
                break;
              }
            }

            // Если не нашли подходящую колонку, создаем новую
            if (!placed) {
              columns.push([event]);
              event.column = columns.length - 1;
              event.columnCount = columns.length;
            }
          });

          // Обновляем columnCount для всех событий в группе
          const maxColumns = columns.length;
          group.forEach((event) => {
            event.columnCount = maxColumns;
          });

          result.push(...group);
        }
      });

      return result;
    },
    [timeToMinutes]
  );

  // Преобразуем события для отображения
  const calendarEvents = useMemo((): CalendarEvent[] => {
    const eventsByDay: { [key: string]: CalendarEvent[] } = {};

    // Создаем базовые события с правильным позиционированием по времени
    validEvents.forEach((event) => {
      // Находим день события в текущей неделе
      const eventDayIndex = weekDates.findIndex(
        (day) => day.dateString === event.date
      );

      if (eventDayIndex === -1) {
        console.warn(
          `Событие "${event.title}" на ${event.date} не найдено в текущей неделе`
        );
        return;
      }

      // Рассчитываем позицию события
      const { top, height } = calculateEventPosition(
        event.startTime,
        event.endTime
      );

      const dayLeft = eventDayIndex * (100 / 7);

      const calendarEvent: CalendarEvent = {
        ...event,
        top,
        height,
        left: dayLeft,
        width: 100 / 7, // по умолчанию вся ширина дня
        column: 0,
        columnCount: 1,
      };

      if (!eventsByDay[event.date]) {
        eventsByDay[event.date] = [];
      }
      eventsByDay[event.date].push(calendarEvent);
    });

    // Обрабатываем пересекающиеся события для каждого дня
    const result: CalendarEvent[] = [];

    Object.keys(eventsByDay).forEach((date) => {
      const dayEvents = eventsByDay[date];
      const eventsWithLayout = calculateEventLayout(dayEvents);

      // Применяем расчет ширины и позиции для каждого события
      eventsWithLayout.forEach((event) => {
        const columnWidth = 100 / 7 / event.columnCount;
        const left = event.left + columnWidth * event.column;

        result.push({
          ...event,
          width: columnWidth,
          left,
        });
      });
    });

    return result;
  }, [validEvents, weekDates, calculateEventPosition, calculateEventLayout]);

  // Навигация по неделям
  const goToPreviousWeek = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Форматирование даты для заголовка
  const getWeekRangeText = useCallback(() => {
    const firstDay = weekDates[0];
    const lastDay = weekDates[6];

    if (firstDay.month === lastDay.month) {
      return `${firstDay.day} - ${lastDay.day} ${firstDay.date.toLocaleString(
        "ru-RU",
        { month: "long" }
      )} ${firstDay.year}`;
    } else if (firstDay.year === lastDay.year) {
      return `${firstDay.day} ${firstDay.date.toLocaleString("ru-RU", {
        month: "short",
      })} - ${lastDay.day} ${lastDay.date.toLocaleString("ru-RU", {
        month: "short",
      })} ${firstDay.year}`;
    } else {
      return `${firstDay.day} ${firstDay.date.toLocaleString("ru-RU", {
        month: "short",
      })} ${firstDay.year} - ${lastDay.day} ${lastDay.date.toLocaleString(
        "ru-RU",
        { month: "short" }
      )} ${lastDay.year}`;
    }
  }, [weekDates]);

  // Общая высота календаря для eventsLayer
  const calendarHeight = useMemo(() => {
    if (timeSlots.length === 0) return 1440;
    const lastSlot = timeSlots[timeSlots.length - 1];
    return lastSlot.pixelPosition + 30;
  }, [timeSlots]);

  return (
    <div className={styles.calendar}>
      {selectedEvent && (
        <ModalWrapper
          isOpen={!!selectedEvent}
          onClose={closeEventPopup}
          title={selectedEvent.title}
          variant="center"
        >
          <p>
            <strong>Время:</strong> {selectedEvent.startTime} -{" "}
            {selectedEvent.endTime}
          </p>
          <p>
            <strong>Дата:</strong> {selectedEvent.date}
          </p>

          
          <p>
    <strong>Пользователь:</strong> 
    <a style={{marginLeft:4}}>
    {

      initialUsers[Math.floor(Math.random() * initialUsers.length)].username
    }
      </a>
  </p>


          <button 
    onClick={closeEventPopup}
    style={{
      backgroundColor: '#ff4444',
      color: 'white',
      border: 'none',
      width: '100%',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '15px'
    }}
  >
    Удалить
  </button>
        </ModalWrapper>
      )}

      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button onClick={goToPreviousWeek} className={styles.navButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ maxWidth: 20, maxHeight: 20 }}
            >
              <path
                d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className={styles.calendarTitle}>
            <h2>{getWeekRangeText()}</h2>
            <button onClick={goToToday} className={styles.todayButton}>
              Сегодня
            </button>
          </div>
          <button onClick={goToNextWeek} className={styles.navButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ maxWidth: 20, maxHeight: 20 }}
            >
              <path
                d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className={styles.calendarGrid}>
          <div className={styles.timeColumnHeader}></div>

          {weekDates.map((day) => (
            <div
              key={day.dateString}
              className={`${styles.dayHeader} ${
                day.isToday ? styles.today : ""
              } `}
            >
              <div className={styles.dayName}>
                {day.date.toLocaleDateString("ru-RU", { weekday: "short" })}
              </div>
              <div className={styles.dayNumber}>{day.day}</div>
            </div>
          ))}
          {timeSlots.map((slot) => (
            <React.Fragment key={slot.time}>
              <div
                className={`${styles.timeSlot} ${
                  slot.minute === 0 ? styles.hourSlot : styles.quarterSlot
                }`}
              >
                {slot.minute === 0 && (
                  <span
                    className={`${styles.timeLabel} ${
                      slot.hour === 0 && slot.minute === 0
                        ? styles.firstHour
                        : ""
                    }`}
                  >
                    {slot.time}
                  </span>
                )}
              </div>
              {weekDates.map((day) => (
                <div
                  key={`${day.dateString}-${slot.time}`}
                  className={`${styles.timeCell} ${
                    slot.minute === 45 ? styles.hourSlot : styles.quarterSlot
                  }`}
                />
              ))}
            </React.Fragment>
          ))}

          <div
            className={styles.eventsLayer}
            style={{ height: `${calendarHeight}px` }}
          >
            {calendarEvents.map((event) => {
              const hasEnoughHeight = event.height >= 40;
              const isSingleLine = !hasEnoughHeight;

              return (
                <div
                  key={event.id}
                  className={styles.calendarEvent}
                  style={{
                    top: `${event.top}px`,
                    left: `${event.left}%`,
                    width: `${event.width}%`,
                    height: `${event.height}px`,
                    backgroundColor: event.color || "#3498db",
                  }}
                  onClick={() => showEventPopup(event)}
                >
                  <div
                    className={`${styles.eventContent} ${
                      isSingleLine ? styles.singleLine : ""
                    }`}
                  >
                    <div className={styles.eventTime}>{event.startTime}</div>
                    <div className={styles.eventTitle}>{event.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;