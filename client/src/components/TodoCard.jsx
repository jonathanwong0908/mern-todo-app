import { useState } from "react";

const TodoCard = ({ todo }) => {
  const [currentTodo, setCurrentTodo] = useState(todo)

  function handleChange(event) {
    setCurrentTodo(event.current.value);
  }

  return (
    <div>
      <input value={currentTodo} onChange={handleChange} />
      <button>Update</button>
      <button>Delete</button>
    </div>
  )
}

export default TodoCard