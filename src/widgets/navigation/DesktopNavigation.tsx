import { Menu } from "@mui/icons-material";
import { List, ListItemButton, ListItemText, ListItemIcon, Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { appPages } from "../../app/routes/pages";

const listSx = (isSidebarCollapsed: boolean) => ({
  width: isSidebarCollapsed ? 64 : 240,
  p: 0,
  backgroundColor: "var(--color-surface)",
  height: "100%",
  borderRadius: "var(--radius-md)",
  transition: "width 0.3s ease",
});

const listItemSx = (isSidebarCollapsed: boolean) => ({
  py: 1.5,
  height: "var(--btn-icon)",
  justifyContent: isSidebarCollapsed ? "center" : "flex-start",
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
  },
  "& .MuiTouchRipple-root": {
    opacity: 0.8,
    color: "var(--color-primary) !important",
  },
});

export const DesktopNavigation = () => {
  const [isSidebarCollapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <Box component="nav" sx={{ display: { xs: "none", md: "block" } }}>
      <List sx={listSx(isSidebarCollapsed)}>
        <ListItemButton
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={isSidebarCollapsed ? t("menu.open") : t("menu.close")}
          sx={listItemSx(isSidebarCollapsed)}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <Menu sx={{ color: "var(--color-primary)" }} />
          </ListItemIcon>
          {!isSidebarCollapsed && <ListItemText primary={t("menu.title")} sx={{ ml: 2 }} />}
        </ListItemButton>

        {appPages.map(({ title, path, icon }) => (
          <ListItemButton component={Link} to={path} key={title} sx={listItemSx(isSidebarCollapsed)}>
            <ListItemIcon sx={{ minWidth: "auto", color: "var(--color-primary)" }}>{icon}</ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary={t(title)} sx={{ ml: 2 }} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
