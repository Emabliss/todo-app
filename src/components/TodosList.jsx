import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import swal from "sweetalert";

const TodosList = ({ todos, setTodos, setEditTodo, handleSeeMore }) => {
  const handleDelete = ({ id }) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    });
  };

  const handleComplete = ({ id }) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
    const check = todos.some(
      (item) => item.id === id && item.completed === false
    );
    if (check) {
      swal("Good Job!", "Todo Completed", "success");
    } else {
      swal("Try to complete your task soon");
    }
  };

  const handleEdit = ({ id }) => {
    const foundTodo = todos.find((item) => item.id === id && !item.completed);
    setEditTodo(foundTodo);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          className="flex items-center justify-between border-2 p-2 hover:bg-slate-200"
          key={todo.id}
        >
          <p
            className={`${
              todo.completed && "line-through"
            } text-gray-500 font-semibold decoration-red-600 decoration-2 ${
              todo.title.length > 60 && "cursor-pointer"
            } hover:scale-x-95`}
            onClick={() => handleSeeMore(todo)}
          >
            {todo.title.length > 60
              ? `${todo.title.length > 60 && todo.title.slice(0, 45)}...`
              : todo.title}
          </p>
          <div className="space-x-2 xs:block flex flex-col items-center">
            <CheckCircleIcon
              onClick={() => handleComplete(todo)}
              className={`${
                todo.completed ? "text-green-500" : "text-blue-500"
              } cursor-pointer`}
              style={{ width: 26 }}
            />
            <EditIcon
              className="text-yellow-400 cursor-pointer"
              style={{ width: 26 }}
              onClick={() => handleEdit(todo)}
            />
            <DeleteIcon
              className="text-red-500 cursor-pointer"
              style={{ width: 26 }}
              onClick={() => handleDelete(todo)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
