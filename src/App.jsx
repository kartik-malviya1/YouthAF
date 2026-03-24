import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Donate from "./pages/Donate";
import Blog from "./pages/Blogs";
import About from "./pages/About";
// import Media from "./pages/Media";
// import Prorgram from "./pages/Programs";
// import Contact from "./pages/Contact";
// import JoinUs from "./pages/JoinUs";

function AppLayout() {
  const location = useLocation();
  const showShell = location.pathname !== "/";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/programs" element={<Program/>} />
        <Route path="/media" element={<Media/>} />
        <Route path="/joinus" element={<JoinUs/>} />
        <Route path="/contact" element={<Contact/>} /> */}
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
