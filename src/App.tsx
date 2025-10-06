import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components";
import { ProtectedRoute, GuestRoute } from "@/routes";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/user/:slug" element={<div>Profile</div>} />
        </Route>
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<div>Auth Page</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
