import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || "/";

  function handleSubmit(e) {
    e.preventDefault();
    const res = auth.login({ username, password });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Имя пользователя</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Пароль</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%" }} />
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button type="submit">Войти</button>
      </form>
      <div style={{ marginTop: 12 }}>
        <strong>Тестовые аккаунты</strong>
        <div>admin / adminpass</div>
        <div>user / userpass</div>
        <div style={{ marginTop: 8 }}><Link to="/">На главную</Link></div>
      </div>
    </div>
  );
}
