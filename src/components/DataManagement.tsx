import React from "react";
import { Button, Stack } from "@mui/material";
import { FileDownload, FileUpload } from "@mui/icons-material";
import { exportDatabase, importDatabase } from "../shared/utils/dbExportImport";

const DataManagement = () => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (window.confirm("Ви впевнені що хочете імпортувати нотатки?")) {
        await importDatabase(file);
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" startIcon={<FileDownload />} onClick={exportDatabase}>
        Експорт JSON
      </Button>

      <Button variant="outlined" component="label" startIcon={<FileUpload />}>
        Імпорт JSON
        <input type="file" hidden accept=".json" onChange={handleFileChange} />
      </Button>
    </Stack>
  );
};

export default DataManagement;
