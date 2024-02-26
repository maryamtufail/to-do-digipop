import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, updateTodo } from "../redux/todoSlice";
import { makeStyles } from "@mui/styles";
import { TextField, Button } from "@mui/material";

interface AddTodoFormProps {
  userId: any;
  complete: any;
  editTodo: any | null;
  setEditTodo: React.Dispatch<React.SetStateAction<any | null>>;
}

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: "20px",
    "@media (max-width: 600px)": {
      marginBottom: "10px",
    },
  },
  button: {
    marginLeft: "20px",
    width: "8rem",
    height: "3.3rem",
    marginBottom: "20px",
    "@media (max-width: 600px)": {
      marginBottom: "10px",
    },
  },
});

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  editTodo,
  setEditTodo,
  userId,
  complete,
}) => {
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
        dispatch(updateTodo({ id: editTodo.id, text, userId, complete }));
        setEditTodo(null);
      } else {
        dispatch(addTodo({ id: uuid(), text, userId, complete }));
      }
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        fullWidth
        variant="outlined"
        label="Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
      >
        {editTodo ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default AddTodoForm;
