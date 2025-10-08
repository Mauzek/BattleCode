import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import { ProtectedRoute, GuestRoute } from "@/routes";
import {
  HomePage,
  AuthPage,
  CoursesPage,
  CoursePage,
  ProfilePage,
  AssignmentPage,
  NotFound,
  CalendarPage,
} from "@/pages";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/my" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route
            path="/courses/:courseId/assignments/:assignmentId"
            element={<AssignmentPage />}
          />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
