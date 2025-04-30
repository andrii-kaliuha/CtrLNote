import { Menu, StickyNote2, Archive, Search, Delete, Settings } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, ListItemIcon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { title: "Нотатки", path: "/notes", icon: <StickyNote2 /> },
  { title: "Архів", path: "/archive", icon: <Archive /> },
  { title: "Пошук", path: "/search", icon: <Search /> },
  { title: "Кошик", path: "/trash", icon: <Delete /> },
  { title: "Налаштування", path: "/settings", icon: <Settings /> },
];

export const DesktopNavigation = () => {
  const [isSidebarCollapsed, setCollapsed] = useState(false);

  return (
    <nav className="hidden sm:block sticky top-0 left-0 h-screen flex-shrink-0 py-3 pl-3">
      <List
        sx={{
          width: isSidebarCollapsed ? 64 : 240,
          p: 0,
          backgroundColor: "var(--color-surface)",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.3s ease",
        }}
      >
        <ListItemButton
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={isSidebarCollapsed ? "Відкрити меню" : "Згорнути меню"}
          sx={{
            justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            py: 1.5,
            height: 48,
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <Menu sx={{ color: "var(--text-primary)" }} />
          </ListItemIcon>
          {!isSidebarCollapsed && <ListItemText primary="Меню" sx={{ ml: 2 }} />}
        </ListItemButton>

        {navigationLinks.map(({ title, path, icon }) => (
          <ListItemButton
            component={Link}
            to={path}
            key={title}
            sx={{
              py: 1.5,
              height: 48,
              "&:hover": { backgroundColor: "var(--color-hover)" },
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",
            }}
          >
            <ListItemIcon sx={{ minWidth: "auto", color: "var(--text-primary)" }}>{icon}</ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary={title} sx={{ ml: 2 }} />}
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
};

export const MobileNavigation = () => (
  <nav className="sm:hidden sticky bottom-0 left-0 right-0 z-10">
    <BottomNavigation sx={{ backgroundColor: "var(--color-surface)", borderTop: "4px solid var(--color-background)" }}>
      {navigationLinks.map((item) => (
        <BottomNavigationAction
          key={item.title}
          component={Link}
          to={item.path}
          icon={item.icon}
          sx={{ width: 48, minWidth: 48, padding: 0, color: "#1976d2", "&.Mui-selected": { color: "#1976d2" } }}
        />
      ))}
    </BottomNavigation>
  </nav>
);
