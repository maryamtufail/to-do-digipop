'use client'
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/authActions";

const Login: React.FC = () => {
 
  const [formData, setFormData] = useState({
    username: "",
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
    dispatch(loginAsync(formData));
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
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="username"
              name="username"
              type="username"
              value={formData.username}
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
