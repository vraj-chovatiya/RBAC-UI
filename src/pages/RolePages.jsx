import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, TextField, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import axios from "../services/axios";

function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch roles and permissions from the API
    axios.get("/roles").then((res) => setRoles(res.data));
    axios.get("/permissions").then((res) => setPermissions(res.data));
  }, []);

  const handleSave = () => {
    // Create new role or update existing role
    axios
      .post("/roles", formData)
      .then(() => {
        setRoles([...roles, formData]);
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    // Delete a role by its id
    axios
      .delete(`/roles/${id}`)
      .then(() => {
        setRoles(roles.filter((role) => role.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Manage Roles</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => {
                  setFormData(role);
                  setOpen(true);
                }}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.id ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div>
            <h4>Permissions</h4>
            {permissions.map((perm) => (
              <label key={perm}>
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(perm)}
                  onChange={() => {
                    const newPermissions = formData.permissions.includes(perm)
                      ? formData.permissions.filter((p) => p !== perm)
                      : [...formData.permissions, perm];
                    setFormData({ ...formData, permissions: newPermissions });
                  }}
                />
                {perm}
              </label>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RolesPage;