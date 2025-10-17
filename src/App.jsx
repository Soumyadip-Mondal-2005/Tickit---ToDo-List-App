import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { MdEdit, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todosOg = JSON.parse(todoString);
      setTodos(todosOg);
    }
  }, []);

  const saveToLocal = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => setShowFinished(!showFinished);

  const handleEdit = (e, id) => {
    let t = todos.find((i) => i.id === id);
    if (!t) return;
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocal(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocal(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim().length <= 3) return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocal(newTodos);
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      isCompleted: !newTodos[index].isCompleted,
    };
    setTodos(newTodos);
    saveToLocal(newTodos);
  };

  return (
    <>
      <Navbar />
      {/* Outer Wrapper with Rotating Gradient Border */}
      <div className="relative flex justify-center items-center min-h-[90vh] px-4 py-10">
        {/* Rotating Gradient Border */}
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <div className="absolute w-[120%] h-[120%] animate-spin-slow bg-[conic-gradient(from_0deg,#10b981,#9333ea,#ec4899,#10b981)] opacity-70 blur-[80px] rounded-full"></div>
        </div>

        {/* Inner Container */}
        <div
          className="relative z-10 w-full max-w-[800px] rounded-3xl p-6 sm:p-10 
                     bg-gradient-to-br from-[#0a0a0f] via-[#18042c] to-[#001d15]
                     border border-white/10 shadow-[0_0_40px_rgba(147,51,234,0.3)]
                     backdrop-blur-xl overflow-hidden"
        >
          {/* Add Todo */}
          <h2 className="font-bold text-2xl mb-4 text-emerald-400">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 px-4 py-2 rounded-lg bg-black/70 border border-zinc-700 text-zinc-100 
                         focus:outline-none focus:border-emerald-400 placeholder-zinc-500"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="px-5 py-2 font-semibold rounded-lg text-white 
                         bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400 
                         hover:from-pink-500 hover:to-emerald-500 transition-all 
                         shadow-[0_0_15px_#a855f755] cursor-pointer disabled:opacity-40"
            >
              Add
            </button>
          </div>

          {/* Show Finished Toggle */}
          <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#130027] to-[#00271d] p-4 rounded-2xl border border-zinc-700/60 shadow-inner">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  onChange={toggleFinished}
                  type="checkbox"
                  checked={showFinished}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-zinc-700 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-purple-500 transition-all"></div>
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-6 peer-checked:bg-emerald-300 transition-all duration-300 shadow"></div>
              </div>
              <span className="text-zinc-200 font-medium text-sm sm:text-base">
                Showing Completed Tasks
              </span>
            </label>

            <div
              className={`text-sm px-3 py-1 rounded-lg ${
                showFinished
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-600/30"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700"
              } transition-all duration-300`}
            >
              {showFinished ? "ON" : "OFF"}
            </div>
          </div>

          {/* Todos */}
          <h2 className="font-bold text-xl mb-3 text-purple-300">Your Todos</h2>
          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {todos.length === 0 && (
              <div className="text-zinc-400 text-center italic">
                No todos to display
              </div>
            )}

            {todos
              .filter((item) => showFinished || !item.isCompleted)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 rounded-xl 
                             bg-gradient-to-r from-[#0f0f1a] via-[#1a0029] to-[#001a12]
                             border border-zinc-800 hover:shadow-[0_0_15px_#9333ea55]
                             transition-all flex-wrap gap-3"
                >
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    className="cursor-pointer accent-emerald-400"
                  />
                  <div
                    className={`flex-1 break-words ${
                      item.isCompleted
                        ? "text-zinc-400 line-through"
                        : "text-zinc-100"
                    }`}
                  >
                    {item.todo}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="px-3 py-1 text-sm bg-zinc-800 rounded-md 
                                 hover:bg-purple-700/60 transition-all"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="px-3 py-1 text-sm rounded-md text-white 
                                 bg-gradient-to-r from-pink-600 to-red-600 
                                 hover:from-pink-500 hover:to-red-900 transition-all"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
