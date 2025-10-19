import type { TimeSlot } from "./types";

export const mockEvents: TimeSlot[] = [
  {
    id: '1',
    title: 'Утренняя планерка',
    startTime: '12:00',
    endTime: '23:45',
    date: '2025-10-14',
    color: '#3498db'
  },
  {
    id: '2',
    title: 'Разработка нового функционала',
    startTime: '10:15',
    endTime: '11:30',
    date: '2025-10-14',
    color: '#2ecc71'
  },
  {
    id: '3',
    title: 'Встреча с заказчиком',
    startTime: '14:00',
    endTime: '15:30',
    date: '2025-10-14',
    color: '#e74c3c'
  },
  {
    id: '4',
    title: 'Code Review',
    startTime: '16:00',
    endTime: '17:00',
    date: '2025-10-14',
    color: '#f39c12'
  },
  {
    id: '5',
    title: 'Спринт планирование',
    startTime: '10:00',
    endTime: '12:00',
    date: '2025-10-15',
    color: '#9b59b6'
  },
  {
    id: '6',
    title: 'Обед с коллегами',
    startTime: '13:00',
    endTime: '14:00',
    date: '2025-10-15',
    color: '#e67e22'
  },
  {
    id: '7',
    title: 'Работа над багами',
    startTime: '14:30',
    endTime: '16:30',
    date: '2025-10-15',
    color: '#1abc9c'
  },
  {
    id: '8',
    title: 'Английский язык',
    startTime: '09:30',
    endTime: '10:30',
    date: '2025-10-16',
    color: '#34495e'
  },
  {
    id: '9',
    title: 'Демо новой версии',
    startTime: '11:00',
    endTime: '12:30',
    date: '2025-10-16',
    color: '#d35400'
  },
  {
    id: '10',
    title: 'Техническое интервью',
    startTime: '14:00',
    endTime: '16:00',
    date: '2025-10-16',
    color: '#c0392b'
  },
  {
    id: '11',
    title: 'Работа с документацией',
    startTime: '09:00',
    endTime: '11:00',
    date: '2025-10-17',
    color: '#16a085'
  },
  {
    id: '12',
    title: 'Встреча с отделом маркетинга',
    startTime: '12:00',
    endTime: '13:00',
    date: '2025-10-17',
    color: '#8e44ad'
  },
  {
    id: '13',
    title: 'Оптимизация производительности',
    startTime: '14:00',
    endTime: '17:00',
    date: '2025-10-17',
    color: '#27ae60'
  },
  {
    id: '14',
    title: 'Недельный отчет',
    startTime: '10:00',
    endTime: '11:30',
    date: '2025-10-18',
    color: '#2980b9'
  },
  {
    id: '15',
    title: 'Обучение новых сотрудников',
    startTime: '12:00',
    endTime: '14:00',
    date: '2025-10-18',
    color: '#f1c40f'
  },
  {
    id: '16',
    title: 'Ретроспектива спринта',
    startTime: '15:00',
    endTime: '16:30',
    date: '2025-10-18',
    color: '#e74c3c'
  },
  {
    id: '17',
    title: 'Йога',
    startTime: '10:00',
    endTime: '11:00',
    date: '2025-10-19',
    color: '#7f8c8d'
  },
  {
    id: '18',
    title: 'Поход в кино',
    startTime: '15:00',
    endTime: '18:00',
    date: '2025-10-19',
    color: '#e84393'
  },
  {
    id: '19',
    title: 'Семейный обед',
    startTime: '0:00',
    endTime: '2:00',
    date: '2025-10-20',
    color: '#fd79a8'
  },
  {
    id: '20',
    title: 'Подготовка к неделе',
    startTime: '1:45',
    endTime: '3:00',
    date: '2025-10-20',
    color: '#00cec9'
  },
  {
    id: '21',
    title: 'Совещание 1',
    startTime: '2:45',
    endTime: '4:30',
    date: '2025-10-20',
    color: '#74b9ff'
  },
  {
    id: '22',
    title: 'Совещание 2',
    startTime: '10:00',
    endTime: '11:00',
    date: '2025-10-14',
    color: '#ff7675'
  },
  {
    id: '23',
    title: 'Совещание 3',
    startTime: '10:15',
    endTime: '11:30',
    date: '2025-10-14',
    color: '#55efc4'
  }
];

export const getInitialDate = (): Date => {
  return new Date(); 
};

// Генерация случайных событий для тестирования
export const generateRandomEvents = (count: number): TimeSlot[] => {
  const events: TimeSlot[] = [];
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];
  const titles = [
    'Встреча', 'Презентация', 'Обед', 'Совещание', 'Разработка', 
    'Тестирование', 'Code Review', 'Планирование', 'Демо', 'Обучение'
  ];

  const startDate = new Date();
  
  for (let i = 0; i < count; i++) {
    const dayOffset = Math.floor(Math.random() * 7); // 0-6 дней от стартовой даты
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + dayOffset);
    
    const startHour = 8 + Math.floor(Math.random() * 10); // 8:00 - 18:00
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