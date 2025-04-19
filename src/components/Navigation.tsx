import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText, ListItemIcon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Menu, StickyNote2Outlined, ArchiveOutlined, Delete, Settings, Search } from "@mui/icons-material";
import { useState } from "react";

const navItems = [
  { title: "Нотатки", path: "/notes", icon: <StickyNote2Outlined /> },
  { title: "Архів", path: "/archive", icon: <ArchiveOutlined /> },
  { title: "Пошук", path: "/search", icon: <Search /> },
  { title: "Кошик", path: "/trash", icon: <Delete /> },
  { title: "Налаштування", path: "/settings", icon: <Settings /> },
];

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="hidden md:block sticky top-0 left-0 h-screen flex-shrink-0 py-3 pl-3">
      <List
        sx={{
          width: collapsed ? 64 : 240,
          p: 0,
          backgroundColor: "var(--color-surface)",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.3s ease",
        }}
      >
        <ListItemButton
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{
            justifyContent: collapsed ? "center" : "flex-start",
            py: 1.5,
            height: 48,
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <Menu />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Меню" sx={{ ml: 2 }} />}
        </ListItemButton>

        {navItems.map(({ title, path, icon }) => (
          <ListItemButton
            component={Link}
            to={path}
            key={title}
            sx={{
              py: 1.5,
              height: 48,
              "&:hover": { backgroundColor: "#0000000a" },
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <ListItemIcon sx={{ minWidth: "auto" }}>{icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={title} sx={{ ml: 2 }} />}
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
};

export const MobileNavigation = () => {
  const [value, setValue] = useState(0);

  return (
    <nav className="md:hidden sticky bottom-0 left-0 right-0 z-10">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "#faedcd" }}
      >
        {navItems.map((item) => (
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
};
