"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodoComplete } from "../redux/todoSlice";
import AddTodoForm from "./AddTodoForm";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@mui/styles";
import "./todo.module.css";

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
  icons: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    paddingTop: "25px",
  },
  completedTodo: {
    textDecoration: "line-through",
    color: "gray",
  },

  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    listStyle: "none",
    cursor: "pointer",
  },
  pageItem: {
    marginRight: "10px",
    marginLeft: "10px",
  },
  activePage: {
    color: "#007FFF",
  },
});

const TodoList: React.FC<TodoListProps> = ({ todos, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const todosPerPage = 5;
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const indexOfLastTodo = (currentPage + 1) * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodoComplete(id));
  };

  const userTodos = currentTodos.filter((todo) => todo.userId === userId);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <AddTodoForm
        userId={userId}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        complete={editTodo?.complete || false}
      />
      {userTodos.length === 0 ? (
        <p>No todos to show</p>
      ) : (
        <>
          <TableContainer>
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
                    <TableCell className={classes.icons}>
                      <Button onClick={() => handleEdit(todo)}>
                        <EditIcon />
                      </Button>
                      <Button onClick={() => handleDelete(todo.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ReactPaginate
            className={classes.pagination}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            activeClassName={classes.activePage}
            pageClassName={classes.pageItem}
          />
        </>
      )}
    </>
  );
};

export default TodoList;
