import TodoCard from "../components/TodoCard";

const todos = ["todo1", "todo2", "todo3"];

const Dashboard = () => {
  return (
    <div>
      <h1>Todos</h1>
      <div>
        {todos.map(todo => (
          <TodoCard todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard