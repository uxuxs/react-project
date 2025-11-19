import './App.css';
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./api/AuthContext";
import Login from "./api/Login";
import { createTheme, ThemeProvider } from '@mui/material';
import { ColorModeContext } from './ThemeContext';

import { Provider } from 'react-redux';
import store from './store';
import HomeInner from './components/HomeInner';

export default function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
    }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<HomeInner />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
