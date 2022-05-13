import Form from "./components/Form";
import { useState, useEffect } from "react";
import TodosList from "./components/TodosList";
import swal from "sweetalert";

function App() {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [singleTodo, setSingleTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteDoneTasks = () => {
    const check = todos.some((todo) => todo.completed);
    if (check) {
      setTodos(todos.filter((todo) => !todo.completed));
    } else {
      swal("Oops", "No task completed yet", "error");
    }
  };

  const handleSeeMore = ({ id }) => {
    setShowModal(true);
    const found = todos.find((item) => item.id === id);
    setSingleTodo(found);
  };

  return (
    <div className={`h-screen overflow-y-hidden ${showModal && "bg-red-400"}`}>
      {showModal ? (
        <div className="lg:w-1/3 md:w-8/12 w-10/12 mx-auto py-10 px-5 bg-gray-200 shadow-lg mt-52">
          <p className="text-center text-gray-500 text-lg">
            {singleTodo.title}
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="float-right bg-blue-500 text-white text-sm px-4 py-1 rounded-lg"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="xl:w-5/12 lg:w-7/12 md:w-9/12 w-10/12 mx-auto mt-24 p-4 shadow-lg">
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
          />
          <div className="max-h-96 overflow-y-auto mt-2">
            {todos.length < 1 ? (
              <p className="text-center text-lg text-gray-500 bold ">
                Task List Empty
              </p>
            ) : (
              <TodosList
                todos={todos}
                setTodos={setTodos}
                setEditTodo={setEditTodo}
                handleSeeMore={handleSeeMore}
              />
            )}
          </div>
          {todos.length > 0 && (
            <div className="flex justify-between space-x-4 mt-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white flex-1 py-2"
                onClick={deleteDoneTasks}
              >
                Delete Done Tasks
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white flex-1 py-2"
                onClick={() => setTodos([])}
              >
                Delete All Tasks
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
