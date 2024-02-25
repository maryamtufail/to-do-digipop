import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/todoSlice";
import AddTodoForm from "./AddTodoForm";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Grid,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

interface Todo {
  id: number;
  text: string;
  userId: number; // User ID associated with the todo
}

interface TodoListProps {
  todos: Todo[];
  userId: any; // User ID of the currently logged-in user
}

const useStyles = makeStyles({
  todoItem: {
    marginBottom: "10px",
  },
});

const TodoList: React.FC<TodoListProps> = ({ todos, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  // Filter todos based on userId
  const userTodos = todos.filter(todo => todo.userId === userId);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <AddTodoForm editTodo={editTodo} userId={userId} setEditTodo={setEditTodo} />
        {userTodos.length === 0 ? (
          <Typography variant="body1">No todos to show</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Todo</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.text}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default TodoList;
