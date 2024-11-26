import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from './pages/UserPages';
import RolePage from "./pages/RolePages";
import PermissionsPage from "./pages/PermissionPages";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/roles" element={<RolePage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
