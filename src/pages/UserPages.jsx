import React, { useState, useEffect } from "react";
import { Button, Dialog, TextField, Select, MenuItem, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import UserTable from "../components/UserTable";
import axios from "../services/axios";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "Active" });

  useEffect(() => {
    // Fetch users and roles from the API
    axios.get("/users").then((res) => setUsers(res.data));
    axios.get("/roles").then((res) => setRoles(res.data));
  }, []);

  const handleSave = () => {
    // Save new user to the API
    axios
      .post("/users", formData)
      .then((res) => {
        setUsers([...users, res.data]); // Assuming the API returns the full user object
        setOpen(false); // Close the dialog
      })
      .catch((err) => console.error("Error saving user:", err));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <UserTable users={users} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Select
            fullWidth
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersPage;
