import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAvailableActions } from "../shared/utils/noteActions";
import { useDeleteNote } from "../shared/hooks/useDeleteNote";
import { ConfirmDialog } from "../shared/ui/ConfirmDialog";
import { MoreVertMenuProps } from "../shared/types/types";
import { useDispatch } from "react-redux";

export const MoreVertMenu = ({ status, id }: MoreVertMenuProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { deleteNote, isConfirmOpen, closeConfirm, handleConfirm } = useDeleteNote();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const actions = getAvailableActions(status, id, dispatch, deleteNote);

  return (
    <>
      <IconButton
        onClick={openMenu}
        sx={{
          borderRadius: "50%",
          transition: "all 0.2s ease",
          color: "var(--text-primary)", // колір іконки за замовчуванням

          // Стан при наведенні (Hover)
          "&:hover": {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 90%)",
            color: "var(--color-primary)", // іконка стає кольоровою
          },

          // Стан при натисканні (Active / Click)
          "&:active": {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 80%)",
            transform: "scale(0.92)", // легкий ефект натискання
          },

          // Якщо меню відкрите, кнопка може залишатися підсвіченою
          ...(Boolean(anchorEl) && {
            backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%)",
            color: "var(--color-primary)",
          }),
        }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        // Додаємо невеликий відступ від кнопки
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            width: "180px", // трохи вужче зазвичай виглядає краще для контекстного меню
            backgroundColor: "var(--color-secondary)",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // м'яка тінь
            marginTop: "4px",
            border: "3px solid color-mix(in srgb, var(--color-primary), transparent 85%)", // тонка рамка
          },
          "& .MuiList-root": { padding: "4px 0" }, // невеликі відступи зверху/знизу списку
        }}
      >
        {actions.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.action();
              closeMenu();
            }}
            sx={{
              padding: "8px 16px",
              color: "var(--text-primary)",
              fontSize: "14px",
              minHeight: "36px", // синхронізація висоти з налаштуваннями
              transition: "all 0.15s ease",

              // Напівпрозорий Hover з Primary кольором
              "&:hover": {
                backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 85%) !important",
                color: "var(--color-primary)",
              },

              // Акцент на активному стані (якщо потрібно)
              "&:active": {
                backgroundColor: "color-mix(in srgb, var(--color-primary), transparent 75%) !important",
              },
            }}
          >
            {t(item.title)}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={t("confirm_delete_title")}
        description={t("confirm_delete_message")}
      />
    </>
  );
};
