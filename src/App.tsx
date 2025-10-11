import { Navigate, Route, Routes } from "react-router-dom";
import { AppToaster, Layout } from "@/components";
import { ProtectedRoute, GuestRoute } from "@/routes";
import {
  HomePage,
  AuthPage,
  CoursesPage,
  CoursePage,
  ProfilePage,
  TaskPage,
  NotFound,
  CalendarPage,
  ProfileInfo,
  ProfileBadges,
  ProfileEdit,
  ProfileSettings,
  CoursesIndex,
  CoursesMy,
  CoursesCompleted,
  CourseIndex,
  CourseTasks,
  CourseEdit,
  TaskIndex,
  TaskChecks,
  CalendarIndex,
  CalendarEvents,
} from "@/pages";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/user/:username" element={<ProfilePage />}>
              <Route index element={<ProfileInfo />} />
              <Route path="badges" element={<ProfileBadges />} />
              <Route path="edit" element={<ProfileEdit />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            <Route path="/courses" element={<CoursesPage />}>
              <Route index element={<CoursesIndex />} />
              <Route path="my" element={<CoursesMy />} />
              <Route path="completed" element={<CoursesCompleted />} />
            </Route>

            <Route path="/courses/:courseId" element={<CoursePage />}>
              <Route index element={<CourseIndex />} />
              <Route path="tasks" element={<CourseTasks />} />
              <Route path="edit" element={<CourseEdit />} />
            </Route>

            <Route
              path="/courses/:courseId/tasks/:taskId"
              element={<TaskPage />}
            >
              <Route index element={<TaskIndex />} />
              <Route path="checks" element={<TaskChecks />} />
            </Route>

            <Route path="/calendar" element={<CalendarPage />}>
              <Route index element={<CalendarIndex />} />
              <Route path="events" element={<CalendarEvents />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppToaster />
    </>
  );
}

export default App;
