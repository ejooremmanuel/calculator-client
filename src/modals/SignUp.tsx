import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useCreateUser } from "../hooks/auth";
import { Login } from "./Login";
import { Toast } from "../components/Toast";

type Props = {
  onClose: Function;
};

export const SignUp = ({ onClose }: Props) => {
  const { isLoading, mutateAsync } = useCreateUser();
  const [isLogin, setIsLogin] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    password: "",
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  return (
    <Dialog open onClose={() => onClose()} fullWidth maxWidth="sm">
      <DialogTitle>Sign Up</DialogTitle>

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          mutateAsync(payload)
            .then(() => {
              onClose();
              setIsLogin(true);
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
        <Button
          fullWidth
          sx={{ mx: "auto" }}
          onClick={() => {
            setIsLogin(true);
            // onClose();
          }}
        >
          Already have an account? Login here...
        </Button>
        <DialogActions sx={{ pb: 3 }}>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            endIcon={isLoading && <CircularProgress size={20} />}
          >
            Sign up
          </Button>
        </DialogActions>
      </Box>
      {isLogin && (
        <Login
          onClose={() => {
            setIsLogin(false);
          }}
        />
      )}
      {showPrompt && message && <Toast message={message} />}
    </Dialog>
  );
};
