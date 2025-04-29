import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";

type NoteType = { id: string; title: string; text: string; createdAt: number; status: "active" | "pinned" | "archived" | "deleted" };

export const NoteComponent: React.FC<NoteType> = ({ id, title, text, createdAt, status }) => {
  const openEditModal = (id: string) => console.log(`Відкрити модальне вікно редагування для нотатки з id: ${id}`);

  return (
    <li className="p-3 rounded-lg bg-[var(--color-surface)] h-[180px] overflow-hidden flex flex-col justify-between">
      <div>
        <h4 className="line-clamp-1">{title}</h4>
        {text && <p className="text-sm line-clamp-4">{text}</p>}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs leading-none">{createdAt}</p>
      </div>

      <MoreVertMenu status={status} id={id} openEditModal={openEditModal} />

      {/* <NoteEditor state={isModalOpen} closeModal={closeEditModal} /> */}
    </li>
  );
};

// const MoreVertMenu = () => {
//   return (
//     <>
//       <IconButton onClick={openMenu} sx={{ borderRadius: "50%", ":hover": { backgroundColor: "var(--color-hover)" } }}>
//         <MoreVert sx={{ color: "var(--text-primary)" }} />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={closeMenu}
//         sx={{
//           "& .MuiPaper-root": { width: "200px", backgroundColor: "var(--color-secondary)", borderRadius: "8px" },
//           "& .MuiList-root": { padding: 0 },
//         }}
//       >
//         {actions.map((item, index) => (
//           <NoteActionItem key={index} title={item.title} onClick={closeMenu} action={item.action} />
//         ))}
//       </Menu>
//     </>
//   );
// };

// import { JSX, useState } from "react";
// import MenuItem from "@mui/material/MenuItem";

// // Визначення типів
// type ActionItem = { title: string; action: () => void };

// type NoteActionItemProps = { title: string; onClick: () => void; action: () => void };

// // type MoreVertMenuProps = { actions: ActionItem[] };

// // Компонент для елементу меню
// const NoteActionItem = ({ title, onClick, action }: NoteActionItemProps): JSX.Element => {
//   const handleClick = (): void => {
//     action ? action() : null;
//     onClick();
//   };

//   return (
//     <MenuItem
//       onClick={handleClick}
//       sx={{ padding: "10px 16px", color: "var(--text-primary)", fontSize: "14px", "&:hover": { backgroundColor: "var(--color-hover)" } }}
//     >
//       {title}
//     </MenuItem>
//   );
// };

// // Головний компонент MoreVertMenu
// export const MoreVertMenu = ({ status }: { status: string }): JSX.Element => {
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);

//   const closeMenu = (): void => setAnchorEl(null);

//   const getAvailableActions = () => {
//     switch (status) {
//       case "active":
//         return [
//           { title: "Редагувати", action: openEditModal },
//           { title: "Закріпити", action: () => pin(id) },
//           { title: "Видалити", action: () => moveToTrash(id) },
//           { title: "Архівувати", action: () => archive(id) },
//         ];
//       case "pinned":
//         return [
//           { title: "Відкріпити", action: () => unpin(id) },
//           { title: "Видалити", action: () => moveToTrash(id) },
//           { title: "Архівувати", action: () => archive(id) },
//         ];
//       case "archived":
//         return [
//           { title: "Роз-архівувати", action: () => unarchive(id) },
//           { title: "Видалити", action: () => moveToTrash(id) },
//         ];
//       case "deleted":
//         return [
//           { title: "Відновити", action: () => restore(id) },
//           { title: "Видалити назавжди", action: () => deleteNote(id) },
//         ];
//       default:
//         return [];
//     }
//   };

//   const actions = getAvailableActions();

//   return (
//     <>
//       <IconButton onClick={openMenu} sx={{ borderRadius: "50%", ":hover": { backgroundColor: "var(--color-hover)" } }}>
//         <MoreVert sx={{ color: "var(--text-primary)" }} />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={closeMenu}
//         sx={{
//           "& .MuiPaper-root": { width: "200px", backgroundColor: "var(--color-secondary)", borderRadius: "8px" },
//           "& .MuiList-root": { padding: 0 },
//         }}
//       >
//         {actions.map((item: ActionItem, index: number) => (
//           <NoteActionItem key={index} title={item.title} onClick={closeMenu} action={item.action} />
//         ))}
//       </Menu>
//     </>
//   );
// };

import React, { JSX, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { pinNote, unpinNote, archiveNote, unarchiveNote, moveToTrash, restoreNote, removeNotePermanently } from "../store/slices/notesSlice";
// import { setEditableNote } from "../store/slices/notesSlice";

// Визначення типів
type MoreVertMenuItem = { title: string; onClick: () => void; action: () => void };

// Компонент для елементу меню
const MoreVertMenuItem = ({ title, onClick, action }: MoreVertMenuItem): JSX.Element => {
  const handleClick = (): void => {
    action ? action() : null;
    onClick();
  };

  return (
    <MenuItem
      onClick={handleClick}
      sx={{ padding: "10px 16px", color: "var(--text-primary)", fontSize: "14px", "&:hover": { backgroundColor: "var(--color-hover)" } }}
    >
      {title}
    </MenuItem>
  );
};

type MoreVertMenuProps = { status: string; id: string; openEditModal: (id: string) => void };

export const MoreVertMenu: React.FC<MoreVertMenuProps> = ({ status, id, openEditModal }): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useDispatch();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);

  const closeMenu = (): void => setAnchorEl(null);

  const getAvailableActions = () => {
    switch (status) {
      case "active":
        return [
          { title: "Редагувати", action: () => openEditModal(id) },
          { title: "Закріпити", action: () => dispatch(pinNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
          { title: "Архівувати", action: () => dispatch(archiveNote(id)) },
        ];
      case "pinned":
        return [
          { title: "Відкріпити", action: () => dispatch(unpinNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
          { title: "Архівувати", action: () => dispatch(archiveNote(id)) },
        ];
      case "archived":
        return [
          { title: "Роз-архівувати", action: () => dispatch(unarchiveNote(id)) },
          { title: "Видалити", action: () => dispatch(moveToTrash(id)) },
        ];
      case "deleted":
        return [
          { title: "Відновити", action: () => dispatch(restoreNote(id)) },
          { title: "Видалити назавжди", action: () => dispatch(removeNotePermanently(id)) },
        ];
      default:
        return [];
    }
  };

  const actions = getAvailableActions();

  return (
    <>
      <IconButton onClick={openMenu} sx={{ borderRadius: "50%", ":hover": { backgroundColor: "var(--color-hover)" } }}>
        <MoreVert sx={{ color: "var(--text-primary)" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        sx={{
          "& .MuiPaper-root": { width: "200px", backgroundColor: "var(--color-secondary)", borderRadius: "8px" },
          "& .MuiList-root": { padding: 0 },
        }}
      >
        {actions.map((item, index) => (
          <MoreVertMenuItem key={index} title={item.title} onClick={closeMenu} action={item.action} />
        ))}
      </Menu>
    </>
  );
};
