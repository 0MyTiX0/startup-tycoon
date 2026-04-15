import { useState, useEffect, MouseEvent, ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Game from "./pages/Game";
import Shop from "./pages/shop";
import Stats from "./pages/stats";
import Settings from "./pages/settings";
import NotFound from "./pages/notFound";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname,
  );

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const navigate = (path: string, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  let Component: ReactNode;
  switch (currentPath) {
    case "/":
    case "/game":
      Component = <Game />;
      break;
    case "/shop":
      Component = <Shop />;
      break;
    case "/stats":
      Component = <Stats />;
      break;
    case "/settings":
      Component = <Settings />;
      break;
    default:
      Component = <NotFound />;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      <main style={{ flex: 1, padding: "20px" }}>{Component}</main>

      <Footer />
    </div>
  );
}
