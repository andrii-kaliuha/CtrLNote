import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { useSettings } from "./shared/hooks/useSettings";
import { appPages } from "./routes/pages";
import { ErrorNotifier } from "./shared/ui/ErrorNotifier";

export const App = () => {
  useSettings();

  return (
    <HashRouter>
      <div className="app-container">
        <DesktopNavigation />
        <main className="main-content">
          <ErrorNotifier />
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            {appPages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </HashRouter>
  );
};
