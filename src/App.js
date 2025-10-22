import './App.css';
import ClientAPI from "./api/services";
import Table from "./Table";
import Form from "./Form";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./api/AuthContext";
import Login from "./api/Login";

const initialClients = ClientAPI.all();

function HomeInner() {
  const [clients, setClients] = useState(initialClients);
  const auth = useContext(AuthContext);

  const delCli = (id) => {
    if (!auth.isAdmin) return;
    if (ClientAPI.delete(id)) {
      setClients(clients.filter((client) => client.id !== id));
    }
  };

  const addClient = (client) => {
    if (!auth.isAdmin) return null;
    const newClient = ClientAPI.add(client);
    if (newClient) {
      setClients([...clients, newClient]);
    }
  }

  return (
    <div className="App" style={{ padding: 16 }}>
      <header style={{ marginBottom: 12 }}>
        {auth.isAuthenticated ? (
          <div>
            Вошёл как <strong>{auth.user.username}</strong> роль <strong>{auth.user.role}</strong>
            <button onClick={auth.logout} style={{ marginLeft: 8 }}>Выйти</button>
          </div>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </header>

      {auth.isAdmin && (
        <Form handleSubmit={addClient} inClient={{name: "", surname: "", phone: ""}} />
      )}

      <Table clients={clients} delClient={delCli} isAdmin={auth.isAdmin} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeInner />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
