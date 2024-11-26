import React, { useState, useEffect } from "react";
import { Button, Grid, Checkbox, FormControlLabel, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import axios from "../services/axios";

function PermissionsPage() {
  const [permissions, setPermissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPermission, setNewPermission] = useState("");

  useEffect(() => {
    // Fetch permissions from the API
    axios.get("/permissions").then((res) => setPermissions(res.data));
  }, []);

  const handleAddPermission = () => {
    // Add a new permission
    axios
      .post("/permissions", { name: newPermission })
      .then(() => {
        setPermissions([...permissions, { name: newPermission }]);
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeletePermission = (name) => {
    // Delete a permission by its name
    axios
      .delete(`/permissions/${name}`)
      .then(() => {
        setPermissions(permissions.filter((perm) => perm !== name));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Manage Permissions</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Permission
      </Button>
      <Grid container spacing={2}>
        {permissions.map((permission) => (
          <Grid item xs={4} key={permission}>
            <FormControlLabel
              control={<Checkbox />}
              label={permission}
              onChange={() => handleDeletePermission(permission)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Permission</DialogTitle>
        <DialogContent>
          <TextField
            label="Permission Name"
            fullWidth
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddPermission} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PermissionsPage;