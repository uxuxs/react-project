import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../api/AuthContext";
import { ColorModeContext } from "../ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PaletteIcon from "@mui/icons-material/Palette";

export default function Header() {
  const auth = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const currentMode = colorMode?.mode || "light";
  const toggle = colorMode?.toggleColorMode || (() => {});

  const renderThemeIcon = () => {
    if (currentMode === "dark") return <Brightness4Icon />;
    if (currentMode === "purple") return <PaletteIcon />;
    return <Brightness7Icon />;
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!auth?.isAuthenticated ? (
            <Button color="inherit" onClick={handleLoginClick}>
              Войти
            </Button>
          ) : (
            <Button color="inherit" onClick={handleProfileClick}>
              Профиль
            </Button>
          )}

          <Button color="inherit" component={Link} to="/">
            Таблица клиентов
          </Button>
        </Box>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
          Управление клиентами
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
            {renderThemeIcon()}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
