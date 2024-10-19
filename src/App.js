import "./App.css";
import Login from "./components/login-signup/Login";
import Tasks from "./pages/Tasks/Tasks";
import Projects from "./pages/Projects/Projects";
import Reports from "./pages/Reports/Reports";
import SignUp from "./components/login-signup/Register";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route 
            path="/*" 
            element={
              <Layout>
                <Routes>
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/dashboard" element={<Tasks />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </Layout>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
