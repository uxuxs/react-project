import React, { useState } from "react";
import {
  Table as MuiTable,
  TableContainer,
  Button,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ClientTable = ({ clients = [], delClient, isAdmin = false }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedId == null) return;
    await delClient(selectedId);
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Phone</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.surname}</TableCell>
                <TableCell>{client.phone}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenConfirm(client.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этого клиента? Это действие нельзя будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">Отмена</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
