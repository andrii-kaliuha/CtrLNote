import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul className="w-72">
        <NavigationItem text="Нотатки" to="/notes" />
        <NavigationItem text="Нагадування" to="/tasks" />
        <NavigationItem text="Події" to="/events" />
        <NavigationItem text="Архів" to="/archive" />
        <NavigationItem text="Кошик" to="/trash" />
        <NavigationItem text="Налаштування" to="/settings" />
      </ul>
    </nav>
  );
};

export const NavigationItem = ({ text, to }: { icon?: string; text: string; to: string }) => {
  return (
    <li>
      <Link to={to} className="flex items-center gap-3 px-6 py-3 rounded-r-3xl hover:bg-gray-100">
        {text}
      </Link>
    </li>
  );
};
