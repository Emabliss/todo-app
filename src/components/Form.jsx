import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos(
        [...todos, { id: uuidv4(), title: input, completed: false }].reverse()
      );
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
      setInput("");
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex">
        <label
          htmlFor="task"
          className="bg-blue-700 flex items-center justify-center"
        >
          <ListAltIcon className="text-white w-2%" />
        </label>
        <input
          type="text"
          placeholder="Enter todo..."
          value={input}
          onChange={onInputChange}
          required
          className="w-98% outline-none border-2 p-1 border-blue-500"
          id="task"
        />
      </div>
      <button
        type="submit"
        className="block bg-blue-700 hover:bg-blue-600 text-white w-full mt-2 py-1"
      >
        {editTodo ? "Update" : "Add New Task"}
      </button>
    </form>
  );
};

export default Form;
