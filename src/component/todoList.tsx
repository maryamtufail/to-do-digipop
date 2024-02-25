import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodoComplete } from "../redux/todoSlice";
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
  Checkbox,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
  userId: number;
}

interface TodoListProps {
  todos: Todo[];
  userId: any;
}

const useStyles = makeStyles({
  todoItem: {
    marginBottom: "10px",
  },
  completedTodo: {
    textDecoration: "line-through",
    color: "gray",
  },
  actionsCell: {
    display: "flex",
    justifyContent: "flex-end",
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

  // Toggle todo completion status
  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodoComplete(id));
  };

  const userTodos = todos.filter((todo) => todo.userId === userId);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={8}>
        <AddTodoForm
          editTodo={editTodo}
          userId={userId}
          setEditTodo={setEditTodo}
          complete={editTodo?.complete || false}
        />
        {userTodos.length === 0 ? (
          <Typography variant="body1">No todos to show</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {userTodos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>
                      <Checkbox
                        checked={todo.complete || false}
                        onChange={() => handleToggleComplete(todo.id)}
                      />
                      <span
                        className={
                          todo.complete ? classes.completedTodo : undefined
                        }
                      >
                        {todo.text}
                      </span>
                    </TableCell>
                    <TableCell className={classes.actionsCell}>
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
