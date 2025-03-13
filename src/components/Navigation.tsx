import { Link } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  BottomNavigation,
  BottomNavigationAction,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Menu, StickyNote2, CheckCircle, Notifications, Archive, Delete, Settings, Search, Clear } from "@mui/icons-material";
import { Paper, Slide } from "@mui/material";

import { useState } from "react";

const navItems = [
  { title: "Пошук", path: "/search", icon: <Search /> },
  { title: "Нотатки", path: "/notes", icon: <StickyNote2 /> },
  { title: "Завдання", path: "/tasks", icon: <CheckCircle /> },
  // { title: "Архів", path: "/archive", icon: <Archive /> },
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

// export const MobileNavigation = () => {
//   const [value, setValue] = useState(0);

//   return (
//     <nav className="md:hidden sticky bottom-0 left-0 right-0 z-10">
//       <BottomNavigation
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         sx={{ backgroundColor: "#faedcd" }}
//       >
//         {navItems.slice(0, 5).map((item, index) => (
//           <BottomNavigationAction
//             key={item.title}
//             component={Link}
//             to={item.path}
//             icon={item.icon}
//             sx={{
//               width: 48,
//               minWidth: 48,
//               padding: 0,
//               color: "#1976d2",
//               "&.Mui-selected": {
//                 color: "#1976d2",
//               },
//             }}
//           />
//         ))}
//       </BottomNavigation>
//     </nav>
//   );
// };

import { Drawer, Divider, IconButton, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

export const MobileNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Перші 3 пункти для верхньої панелі
  const topNavItems = navItems.slice(0, 3);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="md:hidden">
      {/* Фіксована нижня навігаційна панель */}
      <Paper
        className="fixed bottom-0 left-0 right-0 z-10"
        elevation={3}
        sx={{
          backgroundColor: "#faedcd",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "64px",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          {/* Кнопки текстової навігації */}
          <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
            {topNavItems.map((item) => (
              <Box
                key={item.title}
                component={Link}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  color: "#1976d2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ fontSize: "0.9rem", fontWeight: "500" }}>{item.title}</Box>
              </Box>
            ))}
          </Box>

          {/* Кнопка меню */}
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "#1976d2",
              ml: 1,
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      </Paper>

      {/* Бокова панель з повною навігацією */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            maxHeight: "80%",
            backgroundColor: "#faedcd",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItemButton
              component={Link}
              to={item.path}
              key={item.title}
              onClick={toggleDrawer}
              sx={{
                py: 1.5,
                color: "#1976d2",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
