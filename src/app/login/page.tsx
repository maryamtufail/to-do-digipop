"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/authActions";
import { loginSchema } from "../../schema/loginSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (credential: any) => {
    dispatch(loginAsync(credential));
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
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema} 
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    type="text"
                    error={touched.username && !!errors.username}
                    helperText={<ErrorMessage name="username" />}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    error={touched.password && !!errors.password}
                    helperText={<ErrorMessage name="password" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              Don't have an account?
              <Link href="/signup">
                <Button color="primary">Sign Up</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
