import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Donate from "./pages/Donate";


function AppLayout() {
  const location = useLocation();
  const showShell = location.pathname !== "/";

  return (
    <>
      {/* {showShell ? <Navbar /> : null} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/programs" element={<Navigate to="/#programs" replace />} />
        <Route path="/media" element={<Navigate to="/#news" replace />} />
        <Route path="/joinus" element={<Navigate to="/#joinus" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/donate" element={<Donate />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* {showShell ? <Footer /> : null} */}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
