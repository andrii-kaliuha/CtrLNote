import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText, Drawer } from "@mui/material";

const navItems = [
  { title: "Нотатки", path: "/notes" },
  { title: "Завдання", path: "/tasks" },
  { title: "Сповіщення", path: "/notifications" },
  { title: "Архів", path: "/archive" },
  { title: "Кошик", path: "/trash" },
  { title: "Налаштування", path: "/settings" },
];

type NavigationProps = {
  isVisible: boolean;
};

export const Navigation: React.FC<NavigationProps> = ({ isVisible }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isVisible}
      sx={{ width: isVisible ? 300 : 0, flexShrink: 0, "& .MuiDrawer-paper": { position: "absolute", zIndex: 1 } }}
    >
      <nav>
        <List sx={{ width: 300, p: 0 }}>
          {navItems.map(({ title, path }) => (
            <ListItemButton
              component={Link}
              to={path}
              key={title}
              sx={{ height: 48, px: 3, py: 1.5, color: "#1976d2", "&:hover": { backgroundColor: "#0000000a" } }}
            >
              <ListItemText primary={title} />
            </ListItemButton>
          ))}
        </List>
      </nav>
    </Drawer>
  );
};
