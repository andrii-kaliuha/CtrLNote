import { Button } from "@mui/material";
import { useState } from "react";
import notifications from "../notifications.json";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import NotificationIcon from "@mui/icons-material/NotificationImportant";

export const NotificationsPage = () => {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <section className="flex flex-col w-full">
      {isEmpty === false ? (
        <div className="flex gap-3 self-end p-3">
          <Button variant="text" color="primary" onClick={() => setIsEmpty(true)}>
            Видалити все
          </Button>
        </div>
      ) : null}
      {isEmpty ? <EmptyNotifications /> : <Notifications />}
    </section>
  );
};

const EmptyNotifications = () => (
  <div className="flex flex-col items-center justify-center h-3/4">
    <NotificationIcon sx={{ fontSize: 128 }} />
    <p>Список повідомлень пустий</p>
  </div>
);

const Notifications = () => (
  <ul className="flex flex-col gap-3 mx-3">
    {notifications.map((notification) => (
      <Notification key={notification.id} title={notification.title} description={notification.description} date={notification.date} />
    ))}
  </ul>
);

const Notification = ({ title, description, date }: { title: string; description: string; date: string }) => {
  return (
    <li className="flex items-start justify-between p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-300">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
      <IconButton color="error">
        <Delete />
      </IconButton>
    </li>
  );
};

export default Notification;
