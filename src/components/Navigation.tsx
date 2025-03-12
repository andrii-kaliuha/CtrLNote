import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { useState } from "react";

import { Menu, StickyNote2, CheckCircle, Notifications, Archive, Delete, Settings } from "@mui/icons-material";

const navItems = [
  { title: "Нотатки", path: "/notes", icon: <StickyNote2 /> },
  { title: "Завдання", path: "/tasks", icon: <CheckCircle /> },
  { title: "Сповіщення", path: "/notifications", icon: <Notifications /> },
  { title: "Архів", path: "/archive", icon: <Archive /> },
  { title: "Кошик", path: "/trash", icon: <Delete /> },
  { title: "Налаштування", path: "/settings", icon: <Settings /> },
];

export default navItems;

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="sticky top-0 left-0 h-screen flex-shrink-0 p-6">
      <List
        sx={{
          width: collapsed ? 64 : 240,
          p: 0,
          backgroundColor: "#faedcd",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.3s ease",
        }}
      >
        {/* Кнопка для зміни стану */}
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
              color: "#1976d2",
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
