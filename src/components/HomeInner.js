import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../store/clients/thunks';
import { addClientAction, deleteClientAction } from '../store/clients/actions';
import ClientAPI from '../api/services';
import { AuthContext } from '../api/AuthContext';
import Form from '../Form';
import Table from '../Table';
import { Container, CssBaseline } from '@mui/material';

export default function HomeInner() {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector(state => state.clients);
  const auth = useContext(AuthContext);

  useEffect(() =>{
    dispatch(fetchClients());
  }, [dispatch]);

  const delCli = async (id) => {
    if (!auth || !auth.isAdmin) return;
    const ok = await ClientAPI.delete(id);
    if (ok) {
      dispatch(deleteClientAction(id));
    }
  };

  const addClient = async (client) => {
    if (!auth || !auth.isAdmin) return null;
    const newClient = await ClientAPI.add(client);
    if (newClient) dispatch(addClientAction(newClient));
  };

  return (
    <Container sx={{ padding: 2 }}>
      <CssBaseline />

      {loading && <div>Загрузка ...</div>}
      {error && <div>Ошибка загрузки: {String(error)}</div>}

      {auth && auth.isAdmin && (
        <Form
          handleSubmit={addClient}
          inClient={{ name: "", surname: "", phone: "" }}
          clients={clients}
        />
      )}

      <Table clients={clients} delClient={delCli} isAdmin={auth && auth.isAdmin} />
    </Container>
  );
}
