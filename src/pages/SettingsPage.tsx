import { useState } from "react";
import { Switch, FormControl, MenuItem, Select, Typography } from "@mui/material";

export const SettingsPage = () => (
  <section className="flex-1">
    <Settings />
  </section>
);

const Settings = () => {
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24_hour");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("ukrainian");
  const [trash, toogleTrash] = useState(true);

  return (
    <ul className="flex flex-col gap-3">
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
        <div className="flex items-center justify-between w-full">
          <p>Увімкнути Кошик</p>
          <Switch checked={trash} onChange={(e) => toogleTrash(e.target.checked)} />
        </div>
      </li>
    </ul>
  );
};

type Option = { value: string; name: string };
type SettingProps = { title: string; value: string; options: Option[]; function: (value: string) => void };

const Setting = ({ title, value, options, function: handleChange }: SettingProps) => {
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
