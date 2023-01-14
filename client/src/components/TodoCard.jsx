const TodoCard = ({ todo }) => {
  return (
    <div>
      <input value={todo} />
      <button>Update</button>
      <button>Delete</button>
    </div>
  )
}

export default TodoCard