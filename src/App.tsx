import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { useSettings } from "./pages/SettingsPage";
import { appPages } from "./routes/pages";

export const App = () => {
  useSettings();

  return (
    <Router>
      <div className="flex flex-col sm:flex-row h-screen max-w-[1280px] mx-auto">
        <DesktopNavigation />
        <main className="h-full w-full overflow-y-auto p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            {appPages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </Router>
  );
};
