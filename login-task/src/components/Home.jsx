import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(allTasks[user] || []);
  }, [user]);

  const addTask = () => {
    const newTask = { id: Date.now(), title, desc, completed: false };
    const updated = [...tasks, newTask];
    setTasks(updated);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[user] = updated;
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    setTitle("");
    setDesc("");
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[user] = updated;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[user] = updated;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Tasks</h2>
          <button onClick={logout} className="text-red-500">Logout</button>
        </div>

        <input
          placeholder="Task title"
          className="w-full p-2 mb-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Task description"
          className="w-full p-2 mb-3 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={addTask} className="w-full bg-blue-600 text-white py-2 rounded mb-4">
          Add Task
        </button>

        {tasks.map((t) => (
          <div key={t.id} className={`border p-2 mb-2 rounded ${t.completed ? "bg-green-100" : ""}`}>
            <h3 className="font-semibold">{t.title}</h3>
            <p className="text-sm">{t.desc}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => toggleTask(t.id)} className="text-blue-600 text-sm">Complete</button>
              <button onClick={() => deleteTask(t.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}