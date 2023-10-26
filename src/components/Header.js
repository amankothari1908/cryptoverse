import {
  MenuItem,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Select,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../store/CryptoContext";
import classes from "./Header.module.css";
import AuthModal from "./Authentication/AuthModal";
import UsersideBar from "./Authentication/UsersideBar";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Cryptoverse
            </Typography>
            <Select
              variant="outlined"
              className={classes["header-select"]}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UsersideBar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
