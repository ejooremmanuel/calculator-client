import { Alert, Snackbar } from "@mui/material";
import React from "react";

type Props = {
  message: string;
  severity?: "error" | "success";
};

export const Toast = ({ message, severity = "success" }: Props) => {
  return (
    <Snackbar
      autoHideDuration={6000}
      open={true}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={() => {}}
    >
      <Alert variant="filled" severity={"info"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
