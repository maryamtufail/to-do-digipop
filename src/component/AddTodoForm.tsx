import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, updateTodo } from "../redux/todoSlice";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Grid } from "@mui/material";

interface AddTodoFormProps {
  editTodo: any | null;
  setEditTodo: React.Dispatch<React.SetStateAction<any | null>>;
}

const useStyles = makeStyles({
  form: {
    marginBottom: "20px",
  },
  button: {
    marginBottom: "20px",
  }
});

const AddTodoForm: React.FC<AddTodoFormProps> = ({ editTodo, setEditTodo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, setText] = useState(editTodo ? editTodo.text : "");

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
    }
  }, [editTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (editTodo) {
        dispatch(updateTodo({ id: editTodo.id, text }));
        setEditTodo(null);
      } else {
        dispatch(addTodo({ id: uuid(), text }));
      }
      setText("");
    }
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit} className={classes.form}>
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          variant="outlined"
          label="Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          {editTodo ? "Update" : "Add"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTodoForm;
