import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoThunk, updateTodoThunk } from "../store/todoSlice";

const TodoCard = ({ todo }) => {
  const [currentTodo, setCurrentTodo] = useState(todo.todo);
  const todoId = todo.id;

  const dispatch = useDispatch();

  function handleChange(event) {
    setCurrentTodo(event.target.value);
  }

  function handleUpdateTodo(event) {
    event.preventDefault();
    dispatch(updateTodoThunk(todoId, currentTodo));
  }

  function handleDeleteTodo(event) {
    event.preventDefault();
    dispatch(deleteTodoThunk(todoId));
  }

  return (
    <div>
      <input type="text" value={currentTodo} onChange={handleChange} name="todo" />
      <button onClick={handleUpdateTodo}>Update</button>
      <button onClick={handleDeleteTodo}>Delete</button>
    </div>
  )
}

export default TodoCard