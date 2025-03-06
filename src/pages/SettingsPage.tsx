import { useState } from "react";
import { Switch, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SettingsPage = () => {
  return (
    <section className="flex-1">
      <Settings />
    </section>
  );
};

const Settings = () => {
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24_hour");
  const [theme, setTheme] = useState("light");
  const [appColor, setAppColor] = useState("blue");
  const [language, setLanguage] = useState("ukrainian");
  const [trash, toogleTrash] = useState(true);
  const [notifications, toogleNotifications] = useState(true);

  return (
    <ul className="flex flex-col gap-3 mx-6">
      <Setting
        title="Формат дати"
        value={dateFormat}
        function={setDateFormat}
        options={[
          { name: "DD/MM/YYYY", value: "DD/MM/YYYY" },
          { name: "MM/DD/YYYY", value: "MM/DD/YYYY" },
          { name: "YYYY-MM-DD", value: "YYYY-MM-DD" },
        ]}
      />
      <Setting
        title="Формат часу"
        value={timeFormat}
        function={setTimeFormat}
        options={[
          { name: "12 годин", value: "12_hour" },
          { name: "24 години", value: "24_hour" },
        ]}
      />
      <Setting
        title="Тема інтерфейсу"
        value={theme}
        function={setTheme}
        options={[
          { name: "Світла", value: "light" },
          { name: "Темна", value: "dark" },
        ]}
      />
      <Setting
        title="Основний колір інтерфейсу"
        value={appColor}
        function={setAppColor}
        options={[
          { name: "Синій", value: "blue" },
          { name: "Червоний", value: "red" },
          { name: "Жовтий", value: "yellow" },
          { name: "Зелений", value: "green" },
          { name: "Фіолетовий", value: "purple" },
        ]}
      />
      <Setting
        title="Мова"
        value={language}
        function={setLanguage}
        options={[
          { name: "Англійська", value: "english" },
          { name: "Українська", value: "ukrainian" },
          { name: "Польська", value: "polish" },
        ]}
      />
      <li>
        <ShortcutsList />
      </li>
      <li>
        <div className="flex items-center justify-between w-full">
          <p>Увімкнути Кошик</p>
          <Switch checked={trash} onChange={(e) => toogleTrash(e.target.checked)} />
        </div>
      </li>
      <li>
        <div className="flex items-center justify-between w-full">
          <p>Увімкнути Сповіщення</p>
          <Switch checked={notifications} onChange={(e) => toogleNotifications(e.target.checked)} />
        </div>
      </li>
    </ul>
  );
};

interface Option {
  value: string;
  name: string;
}

interface LiProps {
  title: string;
  value: string;
  options: Option[];
  function: (value: string) => void;
}

const Setting = ({ title, value, options, function: handleChange }: LiProps) => {
  return (
    <li>
      <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="body1">{title}</Typography>
        <Select value={value} sx={{ height: 40, width: 200 }} onChange={(e) => handleChange(e.target.value)}>
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </li>
  );
};

const shortcuts = [
  { label: "Перейти до наступної або попередньої нотатки", keys: "J / K" },
  { label: "Перемістити нотатку в наступну або попередню позицію", keys: "Shift + J / K" },
  { label: "Перейти до наступного чи попереднього елемента списку", keys: "P / N" },
  { label: "Перемістити пункт списку в наступну або попередню позицію", keys: "Shift + P / N" },
  { label: "Створити нотатку", keys: "C" },
  { label: "Шукати в нотатках", keys: "/" },
  { label: "Вибрати всі нотатки", keys: "Ctrl + A" },
  { label: "Відкрити довідку", keys: "? / Ctrl + /" },
  { label: "Заархівувати нотатку", keys: "E" },
  { label: "Перемістити нотатку в кошик", keys: "#" },
  { label: "Закріпити або відкріпити нотатку", keys: "F" },
];

const ShortcutsList = () => {
  return (
    <Accordion sx={{ boxShadow: "none", padding: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
        <Typography>Переглянути комбінації клавіш</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {shortcuts.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.label} secondary={item.keys} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
