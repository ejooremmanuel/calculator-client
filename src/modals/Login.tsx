import {
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../hooks/auth";
import { Toast } from "../components/Toast";

type Props = {
  onClose: Function;
};

export const Login = ({ onClose }: Props) => {
  const [payload, setPayload] = useState({
    name: "",
    password: "",
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [message, setMessage] = useState("");

  const { isLoading, mutateAsync } = useLogin();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  return (
    <Dialog open onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>Login</DialogTitle>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          mutateAsync(payload)
            .then(() => {
              setMessage("Login successful");

              onClose();
            })
            .catch((err) => {
              setMessage(err?.response?.data?.error);
              
            })
            .finally(() => {
              setShowPrompt(true);
            });
        }}
      >
        <DialogContent>
          <Box className="flex flex-col gap-3 w-full">
            <TextField
              label="Username"
              fullWidth
              value={payload?.name}
              onChange={handleChange}
              name="name"
              required
            />
            <TextField
              label="Password"
              fullWidth
              value={payload?.password}
              name="password"
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20} />}
          >
            Login
          </Button>
        </DialogActions>
      </Box>
      {showPrompt && <Toast message={message} />}
    </Dialog>
  );
};
