import { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData)); // ✅ FIX
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-wrap items-center bg-gray-400">
      <div className="mt-4 min-h-screen w-full flex flex-col items-center bg-gray-400">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
