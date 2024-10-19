import "./App.css";
import Auth from "./pages/Auth/Auth";
import Login from "./components/login-signup/Login";
import Tasks from "./pages/Tasks/Tasks";
import Projects from "./pages/Projects/Projects";
import Reports from "./pages/Reports/Reports";
import SignUp from "./components/login-signup/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth />} /> {/* Default route */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;