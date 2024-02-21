"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { Button, Typography, Grid } from "@mui/material";

const Task: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Grid
      container
      justifyContent="center"
      style={{ height: "100vh", marginTop: "20px" }}
    >
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Task Dashboard, {user?.username || "User"}!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
    
      </Grid>
    </Grid>
  );
};

export default Task;
