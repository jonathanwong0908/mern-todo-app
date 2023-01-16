import { useEffect } from "react";
import { getTodosThunk } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";

// const todos = ["todo1", "todo2", "todo3"];

const Dashboard = () => {
  const todos = useSelector(state => state.todo.todos);
  console.log(todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosThunk());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {todos.length && todos.map(todo => (
          <TodoCard todo={todo} key={todo} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard