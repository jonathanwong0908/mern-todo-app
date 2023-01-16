import { useEffect, useRef } from "react";
import { getTodosThunk, addTodoThunk } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";

// const todos = ["todo1", "todo2", "todo3"];

const Dashboard = () => {
  const addTodoInputRef = useRef();

  const todos = useSelector(state => state.todo.todos);
  console.log(todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleAddTodo(event) {
    event.preventDefault();
    dispatch(addTodoThunk(addTodoInputRef.current.value));
    addTodoInputRef.current.value = "";
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <input ref={addTodoInputRef} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        {todos.length
          ? todos.map(todo => (
            <TodoCard todo={todo} key={todo.id} />
          ))
          : "no todos yet"
        }
      </div>
    </div>
  )
}

export default Dashboard