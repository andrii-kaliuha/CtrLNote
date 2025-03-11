import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText } from "@mui/material";

const navItems = [
  { title: "Нотатки", path: "/notes" },
  { title: "Завдання", path: "/tasks" },
  { title: "Сповіщення", path: "/notifications" },
  { title: "Архів", path: "/archive" },
  { title: "Кошик", path: "/trash" },
  { title: "Налаштування", path: "/settings" },
];

export const Navigation = () => (
  <nav className="bg-[#faedcd] flex-shrink-0 m-6 ml-6 rounded-xl">
    <List sx={{ width: 300, p: 0 }}>
      {navItems.map(({ title, path }, index) => (
        <ListItemButton
          component={Link}
          to={path}
          key={title}
          sx={{
            height: 48,
            px: 3,
            py: 1.5,
            color: "#1976d2",
            borderTopRightRadius: index === 0 ? "12px" : 0,
            borderTopLeftRadius: index === 0 ? "12px" : 0,
            "&:hover": { backgroundColor: "#0000000a" },
          }}
        >
          <ListItemText primary={title} />
        </ListItemButton>
      ))}
    </List>
  </nav>
);
