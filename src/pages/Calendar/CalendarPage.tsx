import { SectionTabs } from "@/components";
import { Outlet } from "react-router-dom";

const CalendarPage = () => {
  
    const calendarTabs = [
    { label: "Schedule", path: "" },
    { label: "Events", path: "events" },
  ];

  return (
    <main>
      <SectionTabs tabs={calendarTabs} label="Calendar" />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CalendarPage;
