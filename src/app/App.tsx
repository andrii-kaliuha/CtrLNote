import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation } from "../widgets/navigation/DesktopNavigation";
import { MobileNavigation } from "../widgets/navigation/MobileNavigation";
import { useSettings } from "../features/settings/useSettings";
import { ErrorNotifier } from "../shared/ui/ErrorNotifier";
import { appPages } from "./routes/pages";

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
