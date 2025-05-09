import { useSelector } from "react-redux";
import type { NoteProps } from "../types";
import { formatDate } from "../utils/formatDate";
import { MoreVertMenu } from "./MoreVertMenu";
import { RootState } from "../store/store";

export const Note: React.FC<NoteProps> = ({ id, title, text, createdAt, status }) => {
  const language = useSelector((state: RootState) => state.settings.language);
  return (
    <li className="p-3 rounded-lg bg-[var(--color-surface)] h-[180px] overflow-hidden flex flex-col justify-between">
      <div>
        <h4 className="line-clamp-1 whitespace-pre-wrap">{title}</h4>
        <p className="text-sm line-clamp-4 whitespace-pre-wrap">{text}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs leading-none">{formatDate(createdAt, language)}</p>
        <MoreVertMenu status={status} id={id} />
      </div>
    </li>
  );
};
