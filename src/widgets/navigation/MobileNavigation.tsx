import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { appPages } from "../../app/routes/pages";

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
