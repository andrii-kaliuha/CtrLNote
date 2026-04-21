import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { useSettings } from "./shared/hooks/useSettings";
import { appPages } from "./routes/pages";
import { ErrorNotifier } from "./shared/ui/ErrorNotifier";

export const App = () => {
  useSettings();

  return (
    <HashRouter>
      <div className="flex flex-col md:flex-row overflow-hidden h-[100dvh] max-w-7xl mx-auto p-3 gap-3">
        <DesktopNavigation />
        <main className="flex-1 min-h-0">
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
