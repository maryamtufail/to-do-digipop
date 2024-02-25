"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { Button, Typography, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import TodoList from "~/component/todoList";

const Task: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const allTodos = useSelector((state: RootState) => state.todos.todos);

  const [filteredTodos, setFilteredTodos] = useState(allTodos);
  const [filterValue, setFilterValue] = useState<"all" | "completed" | "notCompleted">("all");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (filterValue === "all") {
      setFilteredTodos(allTodos);
    } else if (filterValue === "completed") {
      setFilteredTodos(allTodos.filter(todo => todo.complete));
    } else if (filterValue === "notCompleted") {
      setFilteredTodos(allTodos.filter(todo => !todo.complete));
    }
  }, [allTodos, filterValue]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const userId = user?.id || null;

  return (
    <Grid
      container
      justifyContent="center"
      style={{ height: "100vh", marginTop: "20px" }}
    >
      <Grid item xs={6}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Task Dashboard, {user?.username && user?.id || "User"}!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
        <ToggleButtonGroup
          value={filterValue}
          exclusive
          onChange={(event, newValue) => setFilterValue(newValue)}
          aria-label="filter todos"
          style={{ marginTop: "10px" }}
        >
          <ToggleButton value="all" aria-label="all todos">All</ToggleButton>
          <ToggleButton value="completed" aria-label="completed todos">Completed</ToggleButton>
          <ToggleButton value="notCompleted" aria-label="not completed todos">Not Completed</ToggleButton>
        </ToggleButtonGroup>
        <TodoList todos={filteredTodos} userId={userId} />
      </Grid>
    </Grid>
  );
};

export default Task;
