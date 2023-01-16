import { useEffect, useRef } from "react";
import { getTodosThunk, addTodoThunk } from "../store/todoSlice";
import { logoutThunk } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";

const Dashboard = () => {
  const addTodoInputRef = useRef();

  const todos = useSelector(state => state.todo.todos);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleAddTodo(event) {
    event.preventDefault();
    const todo = addTodoInputRef.current.value;
    if (todo === "" || todos.includes(todo)) return;
    dispatch(addTodoThunk(addTodoInputRef.current.value));
    addTodoInputRef.current.value = "";
  }

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logoutThunk());
  }

  return (
    <div className="dashboardContainer">
      <div className="dashboardTitleContainer">
        <h1>Todos</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="addTodoContainer">
        <input ref={addTodoInputRef} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        {token != null
          ? todos.length
            ? todos.map(todo => (
              <TodoCard todo={todo} key={todo.id} />
            ))
            : "no todos yet"
          : "loading"
        }
      </div>
    </div>
  )
}

export default Dashboard