import { SectionTabs } from "@/components";
import { useTranslation } from "@/hooks";
import { Outlet } from "react-router-dom";

const CalendarPage = () => {
    const {t} = useTranslation();

    const calendarTabs = [
    { label: t("Schedule"), path: "" },
    { label: t("Events"), path: "events" },
  ];

  return (
    <main>
      <SectionTabs tabs={calendarTabs} label={t("Calendar")} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default CalendarPage;
