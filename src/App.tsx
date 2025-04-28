import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { SearchPage } from "./pages/SearchPage";
import { NotesPage } from "./pages/NotesPage";
import { ArchivePage } from "./pages/ArchivePage";
import { TrashPage } from "./pages/TrashPage";
import { SettingsPage } from "./pages/SettingsPage";
import useThemeAndColor from "./pages/SettingsPage";

export const App = () => {
  useThemeAndColor();

  return (
    <Router>
      <div className="relative flex flex-col sm:flex-row max-w-[1280px] w-full min-h-screen mx-auto">
        <DesktopNavigation />
        <main className="flex-1 py-3 px-3 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </Router>
  );
};
