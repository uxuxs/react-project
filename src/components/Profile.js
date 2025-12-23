import React, { useContext, useEffect } from "react";
import { Container, Paper, Typography, Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../api/AuthContext";

export default function Profile() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (!auth || !auth.isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Профиль пользователя
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Имя пользователя</Typography>
          <Typography variant="body1">{auth.user?.username}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Роль</Typography>
          <Typography variant="body1">{auth.user?.role}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Права доступа</Typography>
          {auth.isAdmin ? (
            <Typography variant="body1">Администратор — полный доступ</Typography>
          ) : (
            <Typography variant="body1">Обычный пользователь — ограниченный доступ</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
