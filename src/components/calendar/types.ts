export interface TimeSlot {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
}

export interface WeekDate {
  date: Date;
  day: number;
  month: number;
  year: number;
  dateString: string;
  isToday: boolean;
}

export interface CalendarEvent extends TimeSlot {
  top: number;
  height: number;
  width: number;
  left: number;
  column: number;
  columnCount: number;
}

export interface CalendarProps {
  events: TimeSlot[];
  startHour?: number;
  endHour?: number;
  initialDate?: Date;
}

export interface TimeSlotInfo {
  time: string;
  hour: number;
  minute: number;
  pixelPosition: number;
}