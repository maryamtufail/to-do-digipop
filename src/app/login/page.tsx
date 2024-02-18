"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted:", formData);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
