import React from "react";
import { useState } from "react";

const phoneRegex = /^\+?\d{1,3}\(?\d{1,4}\)?[\d\-\s]{5,}$/;

const Form = ({ handleSubmit, inClient, clients = [] }) => {
  const [client, setClient] = useState(inClient);
  const [errors, setErrors] = useState({});

  const validate = (c) => {
    const e = {};
    if (!c.name || c.name.trim() === "") e.name = "Имя обязательно";
    if (!c.surname || c.surname.trim() === "") e.surname = "Фамилия обязательна";
    if (!c.phone || c.phone.trim() === "") e.phone = "Телефон обязателен";
    else if (!phoneRegex.test(c.phone)) e.phone = "Неверный формат телефона";
    const exists = clients.some(
      (x) => x.phone && x.phone.trim() === c.phone.trim() && x.id !== c.id
    );
    if (exists) e.phone = "Клиент с таким телефоном уже существует";
    return e;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...client, [name]: value };
    setClient(next);
    setErrors((prev) => ({ ...prev, ...validate(next) }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const e = validate(client);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    handleSubmit(client);
    setClient(inClient);
    setErrors({});
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ marginBottom: 8 }}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={client.name}
          onChange={handleChange}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label htmlFor="surname">Surname</label>
        <br />
        <input
          type="text"
          name="surname"
          value={client.surname}
          onChange={handleChange}
        />
        {errors.surname && <div style={{ color: "red" }}>{errors.surname}</div>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          type="text"
          name="phone"
          value={client.phone}
          onChange={handleChange}
        />
        {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
