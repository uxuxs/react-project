import './App.css';
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./api/AuthContext";
import Login from "./api/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorModeContext } from './ThemeContext';

import { Provider } from 'react-redux';
import store from './store';
import HomeInner from './components/HomeInner';
import Header from "./components/Header";
import Profile from "./components/Profile";

export default function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => {
      setMode((prev) => {
        // cycle: light -> dark -> purple -> light
        if (prev === 'light') return 'dark';
        if (prev === 'dark') return 'purple';
        return 'light';
      });
    },
  }), [mode]);

  const theme = useMemo(() => {
    if (mode === 'purple') {
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#6a1b9a', // deep purple
          },
          secondary: {
            main: '#ab47bc',
          },
          background: {
            default: '#f3e5f5',
            paper: '#f8bbff',
          },
          text: {
            primary: '#2e003e',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: '#6a1b9a',
              },
            },
          },
        },
      });
    }

    return createTheme({
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<HomeInner />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
