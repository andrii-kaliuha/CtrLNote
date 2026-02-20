import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { useSettings } from "./pages/SettingsPage";
import { appPages } from "./routes/pages";

export const App = () => {
  useSettings();

  return (
    <BrowserRouter basename="/CtrLNote/">
      <div className="flex flex-col sm:flex-row overflow-hidden h-screen max-w-7xl mx-auto">
        <DesktopNavigation />
        {/* <main className="h-full w-full overflow-y-auto p-3 flex gap-3"> */}
        {/* <main className="h-full w-full p-3 flex gap-3"> */}
        {/* <main className="h-full w-full flex p-3 gap-3"> */}
        {/* <main className="h-full w-full flex"> */}
        {/* <main className="h-full w-full overflow-y-auto p-3"> */}
        {/* <main className="h-full w-full p-3"> */}
        <main className="m-3">
          <Routes>
            <Route path="/" element={<Navigate to="/notes" replace />} />
            {appPages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </BrowserRouter>
  );
};
