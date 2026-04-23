import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { FileDownload, FileUpload } from "@mui/icons-material";
import { exportDatabase, importDatabase } from "./dbExportImport";
import { ConfirmDialog } from "../../shared/ui/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setStorageError } from "../../app/store/uiSlice";
import { db } from "../../app/db";

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    document.getElementById("import-input")?.click();
  }
};

export const DataManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isExportConfirmOpen, setIsExportConfirmOpen] = useState(false);
  const [notesCount, setNotesCount] = useState(0);

  const handleExportClick = async () => {
    const count = await db.notes.count();
    if (count === 0) {
      dispatch(setStorageError(t("management.no_notes")));
      return;
    }
    setNotesCount(count);
    setIsExportConfirmOpen(true);
  };

  const handleConfirmExport = async () => {
    try {
      await exportDatabase();
      setIsExportConfirmOpen(false);
    } catch (error) {
      setIsExportConfirmOpen(false);
      dispatch(setStorageError(t("management.export_error")));
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importDatabase(file);
        window.location.reload();
      } catch (error) {
        dispatch(setStorageError(t("management.import_error")));
        event.target.value = "";
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={{ backgroundColor: "var(--color-primary)", boxShadow: "none", "&:hover, &:focus": { boxShadow: "none" }, borderRadius: "8px" }}
        startIcon={<FileDownload />}
        onClick={handleExportClick}
      >
        {t("management.export_json")}
      </Button>

      <Button
        variant="outlined"
        sx={{ border: "2px solid var(--color-primary)", borderRadius: "8px", color: "var(--color-primary)" }}
        component="label"
        onKeyDown={handleKeyDown}
        startIcon={<FileUpload />}
      >
        {t("management.import_json")}
        <input id="import-input" type="file" hidden accept=".json" onChange={handleFileChange} />
      </Button>

      <ConfirmDialog
        open={isExportConfirmOpen}
        onClose={() => setIsExportConfirmOpen(false)}
        onConfirm={handleConfirmExport}
        title={t("management.confirm_export_title")}
        description={t("management.confirm_export_message", { count: notesCount })}
      />
    </Stack>
  );
};
