import {
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Calculator } from "./Calculator";
import { DrawerHeader, Main, TopBar, drawerWidth } from "./styles";
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon } from "./assets";
import { isAuthenticated } from "./utils";
import { SignUp } from "./modals/SignUp";
import { useDelete, useDeleteAll, useGetHistory } from "./hooks/calculator";

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);

  const { data } = useGetHistory();
  const { delete: deleteEntry } = useDelete();
  const { deleteAll } = useDeleteAll();

  const isLoggedIn = isAuthenticated();

  const handleDrawerOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else setOpenRegistrationModal(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box className="w-[100vw] h-[100vh] bg-zinc-900 overflow-hidden flex items-center justify-center">
      <Box
        component={Paper}
        className="lg:w-[25%] sm:w-[100%] text-red-600 relative"
      >
        <TopBar open={open} component={Paper}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              Calculator
            </Typography>
            <Button
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }), cursor: "pointer" }}
            >
              History
            </Button>
          </Toolbar>
        </TopBar>

        <Main open={open} className="p-2 h-[90%] w-full">
          <Calculator />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <>History</>
          </DrawerHeader>
          <Box className="h-full w-full p-2">
            {data?.data?.length ? (
              <Box className="flex flex-col justify-between gap-2 h-full">
                <Box>
                  {data?.data?.map((x: any, i: number) => (
                    <Box
                      className="w-full flex flex-col items-end my-1"
                      key={i}
                    >
                      <Box>{x?.expression}</Box>
                      <Box fontWeight={"bold"}>{x?.result}</Box>
                      <IconButton
                        onClick={() => {
                          deleteEntry(x?._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>

                <>
                  <Button className="w-full" onClick={() => deleteAll()}>
                    Clear all
                  </Button>
                </>
              </Box>
            ) : (
              <>No history yet</>
            )}
          </Box>
        </Drawer>
      </Box>
      {openRegistrationModal && (
        <SignUp
          onClose={(status: boolean) => {
            setOpenRegistrationModal(false);
            if (status) {
            }
          }}
        />
      )}
    </Box>
  );
}

export default App;
