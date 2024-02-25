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
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signupAsync } from "../../redux/authActions";
import { validationSchema } from "../../schema/validationSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (values: any) => {
    await dispatch(signupAsync(values));
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
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
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
                    error={touched.username && !!errors.username}
                    helperText={<ErrorMessage name="username" />}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    error={touched.email && !!errors.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={touched.password && !!errors.password}
                    helperText={<ErrorMessage name="password" />}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>
            <Typography variant="body1" style={{ marginTop: "1rem" }}>
              Already have an account?
              <Link href="/login">
                <Button color="primary">Login</Button>
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
