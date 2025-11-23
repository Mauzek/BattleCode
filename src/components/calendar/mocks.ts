import type { TimeSlot } from "./types";

export const mockEvents: TimeSlot[] =
[
    {
        "id": "random-0",
        "title": "Совещание 1",
        "startTime": "06:00",
        "endTime": "07:30",
        "date": "2025-11-23",
        "color": "#3498db"
    },
    {
        "id": "random-1",
        "title": "Встреча 2",
        "startTime": "07:30",
        "endTime": "09:00",
        "date": "2025-11-21",
        "color": "#3498db"
    },
    {
        "id": "random-2",
        "title": "Разработка 3",
        "startTime": "07:30",
        "endTime": "08:00",
        "date": "2025-11-17",
        "color": "#3498db"
    },
    {
        "id": "random-3",
        "title": "Встреча 4",
        "startTime": "04:30",
        "endTime": "04:00",
        "date": "2025-11-22",
        "color": "#1abc9c"
    },
    {
        "id": "random-4",
        "title": "Обучение 5",
        "startTime": "01:30",
        "endTime": "03:00",
        "date": "2025-11-21",
        "color": "#1abc9c"
    },
    {
        "id": "random-5",
        "title": "Совещание 6",
        "startTime": "02:00",
        "endTime": "03:00",
        "date": "2025-11-23",
        "color": "#2ecc71"
    },
    {
        "id": "random-6",
        "title": "Демо 7",
        "startTime": "06:30",
        "endTime": "09:00",
        "date": "2025-11-22",
        "color": "#34495e"
    },
    {
        "id": "random-7",
        "title": "Code Review 8",
        "startTime": "02:30",
        "endTime": "04:00",
        "date": "2025-11-22",
        "color": "#3498db"
    },
    {
        "id": "random-8",
        "title": "Планирование 9",
        "startTime": "02:00",
        "endTime": "05:30",
        "date": "2025-11-20",
        "color": "#2ecc71"
    },
    {
        "id": "random-9",
        "title": "Планирование 10",
        "startTime": "01:30",
        "endTime": "04:00",
        "date": "2025-11-22",
        "color": "#e74c3c"
    },
    {
        "id": "random-10",
        "title": "Обучение 11",
        "startTime": "04:30",
        "endTime": "05:30",
        "date": "2025-11-21",
        "color": "#f39c12"
    },
    {
        "id": "random-11",
        "title": "Демо 12",
        "startTime": "04:00",
        "endTime": "05:00",
        "date": "2025-11-22",
        "color": "#2ecc71"
    },
    {
        "id": "random-12",
        "title": "Code Review 13",
        "startTime": "03:00",
        "endTime": "06:00",
        "date": "2025-11-19",
        "color": "#3498db"
    },
    {
        "id": "random-13",
        "title": "Демо 14",
        "startTime": "01:00",
        "endTime": "04:00",
        "date": "2025-11-21",
        "color": "#f39c12"
    },
    {
        "id": "random-14",
        "title": "Встреча 15",
        "startTime": "05:30",
        "endTime": "07:00",
        "date": "2025-11-19",
        "color": "#34495e"
    },
    {
        "id": "random-15",
        "title": "Планирование 16",
        "startTime": "00:30",
        "endTime": "02:00",
        "date": "2025-11-22",
        "color": "#3498db"
    },
    {
        "id": "random-16",
        "title": "Тестирование 17",
        "startTime": "07:00",
        "endTime": "08:30",
        "date": "2025-11-20",
        "color": "#3498db"
    },
    {
        "id": "random-17",
        "title": "Совещание 18",
        "startTime": "08:30",
        "endTime": "10:00",
        "date": "2025-11-18",
        "color": "#e74c3c"
    },
    {
        "id": "random-18",
        "title": "Code Review 19",
        "startTime": "00:30",
        "endTime": "02:00",
        "date": "2025-11-18",
        "color": "#2ecc71"
    },
    {
        "id": "random-19",
        "title": "Code Review 20",
        "startTime": "03:30",
        "endTime": "03:30",
        "date": "2025-11-21",
        "color": "#2ecc71"
    },
    {
        "id": "random-20",
        "title": "Code Review 21",
        "startTime": "08:30",
        "endTime": "08:30",
        "date": "2025-11-17",
        "color": "#3498db"
    },
    {
        "id": "random-21",
        "title": "Встреча 22",
        "startTime": "08:30",
        "endTime": "11:30",
        "date": "2025-11-17",
        "color": "#2ecc71"
    },
    {
        "id": "random-22",
        "title": "Разработка 23",
        "startTime": "01:00",
        "endTime": "02:30",
        "date": "2025-11-23",
        "color": "#f39c12"
    }
]


export const getInitialDate = (): Date => {
  return new Date(); 
};

// Генерация случайных событий для тестирования
export const generateRandomEvents = (count: number): TimeSlot[] => {
  const events: TimeSlot[] = [];
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];
  const titles = [
    'Встреча', 'Презентация', 'Совещание', 'Разработка', 
    'Тестирование', 'Code Review', 'Планирование', 'Демо', 'Обучение'
  ];

  const startDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const dayOffset = Math.floor(Math.random() * 7-5); // 0-6 дней от стартовой даты
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + dayOffset);
    
    const startHour = 0 + Math.floor(Math.random() * 9); // 8:00 - 18:00
    // const startHour = 0 + Math.floor(Math.random() * 23);

    const duration = 0.5 + Math.random() * 3; // 0.5 - 3.5 часа
    const endHour = startHour + duration;
    
    const startMinutes = Math.random() > 0.5 ? 0 : 30;
    const endMinutes = Math.random() > 0.5 ? 0 : 30;
    
    // Гарантируем, что событие не переходит на следующий день
    const adjustedEndHour = Math.min(endHour, 23);
    const adjustedEndMinutes = endMinutes;
    
    events.push({
      id: `random-${i}`,
      title: `${titles[Math.floor(Math.random() * titles.length)]} ${i + 1}`,
      startTime: `${Math.floor(startHour).toString().padStart(2, '0')}:${startMinutes === 0 ? '00' : '30'}`,
      endTime: `${Math.floor(adjustedEndHour).toString().padStart(2, '0')}:${adjustedEndMinutes === 0 ? '00' : '30'}`,
      date: eventDate.toISOString().split('T')[0],
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
  
  return events;
};