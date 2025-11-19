import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../store/clients/thunks';
import { addClientAction, deleteClientAction } from '../store/clients/actions';
import ClientAPI from '../api/services';
import { AuthContext } from '../api/AuthContext';
import { ColorModeContext } from '../ThemeContext';
import Form from '../Form';
import Table from '../Table';
import { Container, CssBaseline, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomeInner() {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector(state => state.clients);
  const auth = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const delCli = async (id) => {
    if (!auth.isAdmin) return;
    const ok = await ClientAPI.delete(id);
    if (ok) {
      dispatch(deleteClientAction(id));
    }
  };

  const addClient = async (client) => {
    if (!auth.isAdmin) return null;
    const newClient = await ClientAPI.add(client);
    if (newClient) dispatch(addClientAction(newClient));
  };

  return (
    <Container sx={{ padding: 2 }}>
      <CssBaseline />
      <header style={{ marginBottom: 12 }}>
        {auth.isAuthenticated ? (
          <div>
            Вошёл как <strong>{auth.user.username}</strong> роль <strong>{auth.user.role}</strong>
            <Button variant="outlined" onClick={auth.logout} sx={{ ml: 2 }}>Выйти</Button>
          </div>
        ) : (
          <Link to="/login">Войти</Link>
        )}
        <Button variant="outlined" onClick={colorMode.toggleColorMode} sx={{ ml: 2 }}>
          Переключить тему
        </Button>
      </header>

      {loading && <div>Загрузка...</div>}
      {error && <div>Ошибка загрузки: {String(error)}</div>}

      {auth.isAdmin && (
        <Form handleSubmit={addClient} inClient={{ name: "", surname: "", phone: "" }} />
      )}

      <Table clients={clients} delClient={delCli} isAdmin={auth.isAdmin} />
    </Container>
  );
}
