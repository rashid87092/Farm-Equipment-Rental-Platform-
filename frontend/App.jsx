import { useEffect, useState } from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Navbar } from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import DashboardPage from "./pages/DashboardPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import ListEquipmentPage from "./pages/ListEquipmentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // ✅ Add this
import api from "./services/api";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("dashboard");
  };

  // ✅ Add this
  const handleRegisterSuccess = (newUser) => {
    setUser(newUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    setPage("home");
  };

  const pages = {
    home: <HomePage setPage={setPage} />,
    search: <SearchPage />,
    dashboard: <DashboardPage />,
    owner: <OwnerDashboard />,
    list: <ListEquipmentPage />,
    login: <LoginPage onLoginSuccess={handleLoginSuccess} setPage={setPage} />,       // ✅ added setPage
    register: <RegisterPage onRegisterSuccess={handleRegisterSuccess} setPage={setPage} />, // ✅ Add this
  };

  return (
    <div>
      <GlobalStyles />
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      <main>{pages[page] || pages.home}</main>
      <Footer />
    </div>
  );
}