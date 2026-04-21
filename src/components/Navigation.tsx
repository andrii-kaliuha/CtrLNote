import { Menu } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, ListItemIcon, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { appPages } from "../routes/pages";

export const DesktopNavigation = () => {
  const [isSidebarCollapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <Box component="nav" sx={{ display: { xs: "none", md: "block" } }}>
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

            "&:hover, &.Mui-focusVisible": {
              backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
            },
            "& .MuiTouchRipple-root": {
              opacity: 0.8,
              color: "var(--color-primary) !important",
            },
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
              justifyContent: isSidebarCollapsed ? "center" : "flex-start",

              "&:hover, &.Mui-focusVisible": {
                backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
              },
              "& .MuiTouchRipple-root": {
                opacity: 0.8,
                color: "var(--color-primary) !important",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: "auto", color: "var(--color-primary)" }}>{icon}</ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary={t(title)} sx={{ ml: 2 }} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export const MobileNavigation = () => (
  <Box component="nav" sx={{ display: { md: "none" } }}>
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
  </Box>
);
