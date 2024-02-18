"use client"
import React, { useState } from 'react';
import { Button, TextField, Typography, Card, CardContent, Grid } from '@mui/material';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup form submitted:', formData);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item xs={6}>
      <Card>
        <CardContent>
      <Typography variant="h6">Sign Up</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
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
      <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
      </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
