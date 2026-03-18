import { Menu } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, ListItemIcon, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { appPages } from "../routes/pages";

export const DesktopNavigation = () => {
  const [isSidebarCollapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="hidden md:block">
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
            <Menu sx={{ color: "var(--color-primary)" }} />
          </ListItemIcon>
          {!isSidebarCollapsed && <ListItemText primary={t("menu")} sx={{ ml: 2 }} />}
        </ListItemButton>

        {appPages.map(({ title, path, icon }) => (
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
            <ListItemIcon sx={{ minWidth: "auto", color: "var(--color-primary)" }}>{icon}</ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary={t(title)} sx={{ ml: 2 }} />}
          </ListItemButton>
        ))}
      </List>
    </nav>
  );
};

export const MobileNavigation = () => (
  <nav className="md:hidden">
    <BottomNavigation sx={{ backgroundColor: "var(--color-surface)", borderRadius: "12px" }}>
      {appPages.map(({ title, path, icon }) => (
        <BottomNavigationAction
          key={title}
          component={Link}
          to={path}
          icon={icon}
          sx={{
            width: 48,
            minWidth: 48,
            padding: 0,
            color: "var(--color-primary)",
            "&.Mui-selected": { color: "var(--color-primary)" },
          }}
        />
      ))}
    </BottomNavigation>
  </nav>
);
