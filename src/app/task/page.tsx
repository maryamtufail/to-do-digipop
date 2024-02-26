"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import {
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import TodoList from "~/component/todoList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  greeting: {
    marginBottom: 16,
  },
  button: {
    marginLeft: 16,
  },
  toggleButtonGroup: {
    marginTop: 16,
  },
}));

const Task: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const allTodos = useSelector((state: RootState) => state.todos.todos);
  const [greeting, setGreeting] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState(allTodos);
  const [filterValue, setFilterValue] = useState<
    "all" | "completed" | "notCompleted"
  >("all");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (filterValue === "all") {
      setFilteredTodos(allTodos);
    } else if (filterValue === "completed") {
      setFilteredTodos(allTodos.filter((todo) => todo.complete));
    } else if (filterValue === "notCompleted") {
      setFilteredTodos(allTodos.filter((todo) => !todo.complete));
    }
  }, [allTodos, filterValue]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let newGreeting = "";
    if (hour >= 5 && hour < 12) {
      newGreeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }
    setGreeting(newGreeting);
  }, []);

  const userId = user?.id || null;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h6">TODO</Typography>
        <Button
          variant="contained"
          onClick={handleLogout}
          className={classes.button}
        >
          Logout
        </Button>
      </div>
      <Typography variant="h6" className={classes.greeting}>
        {greeting}, {user?.username || "User"}!
      </Typography>
      <ToggleButtonGroup
        value={filterValue}
        exclusive
        onChange={(event, newValue) => setFilterValue(newValue)}
        aria-label="filter todos"
        style={{ marginTop: "10px" }}
      >
        <ToggleButton value="all" aria-label="all todos">
          All
        </ToggleButton>
        <ToggleButton value="notCompleted" aria-label="active todos">
          Active
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed todos">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>
      <TodoList todos={filteredTodos} userId={userId} />
    </div>
  );
};

export default Task;
