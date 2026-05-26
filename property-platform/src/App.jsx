import React, { useState, useEffect } from "react";
import "./App.css";
import PublicSite from "./components/PublicSite";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash === "#/admin" || hash === "#admin") {
      return "admin";
    }
    return "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/admin" || hash === "#admin") {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const routeToAdmin = () => {
    window.location.hash = "#/admin";
  };

  const routeToHome = () => {
    window.location.hash = "#/";
  };

  return (
    <main>
      {currentRoute === "admin" ? (
        <AdminPanel onRouteToHome={routeToHome} />
      ) : (
        <PublicSite onRouteToAdmin={routeToAdmin} />
      )}
    </main>
  );
}

export default App;
