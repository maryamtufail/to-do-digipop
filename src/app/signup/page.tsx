"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signupAsync } from "../../redux/authActions";

const Signup: React.FC = (userData) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupAsync(formData));
    router.push("/task");
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
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
