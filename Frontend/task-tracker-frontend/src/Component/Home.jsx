import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskForm from "../Component/TaskForm";
import TaskList from "../Component/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async (taskData) => {
    if (editTask) {
      await updateTask(editTask.id, taskData);
      setEditTask(null);
    } else {
      await createTask(taskData);
    }
    loadTasks();
  };

  const handleEdit = (task) => setEditTask(task);

  const handleUpdate = async (id, data) => {
    await updateTask(id, data);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="min-vh-100 bg-dark">
      {/* Header Section */}
      <header
        className="text-center py-5 bg-gradient"
        style={{
          background: "linear-gradient(135deg, #007bff 0%, #00bcd4 100%)",
          color: "white",
        }}
      >
        <h1 className="fw-bold display-5 ">
          📝 Task Manager
        </h1>
        <p className="lead opacity-75">Stay productive, organized & focused!</p>
      </header>

      <div className="container my-5">
        {/* Task Form */}
        <div className="card border-0 shadow-lg rounded-4 mb-4 animate__animated animate__fadeIn">
          <div className="card-body">
            <TaskForm onAdd={handleAdd} editTask={editTask} />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="d-flex justify-content-center mb-4 animate__animated animate__fadeInUp">
          <div className="btn-group">
            {["All", "Pending", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn ${
                  filter === f ? "btn-primary" : "btn-outline-secondary"
                } fw-semibold px-3`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="card shadow border-0 rounded-4 p-3 bg-white animate__animated animate__fadeInUp">
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-clipboard-x text-muted" style={{ fontSize: "4rem" }}></i>
              <h5 className="text-secondary mt-3">No tasks yet</h5>
              <p className="text-muted small">Add your first task above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

