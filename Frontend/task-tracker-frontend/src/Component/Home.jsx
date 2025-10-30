
import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TaskForm from "../Component/TaskForm";
import TaskList from "../Component/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleAddOrUpdate = async (taskData) => {
    try {
      if (editTask) {
        await updateTask(editTask.id, taskData);
        setEditTask(null);
      } else {
        await createTask(taskData);
      }
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleEdit = (task) => setEditTask(task);

  const handleUpdateStatus = async (id, data) => {
    try {
      await updateTask(id, data);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return task.status === "Pending";
    if (filter === "Completed") return task.status === "Completed";
    return true;
  });

  return (
    <div className="home-page min-vh-100 d-flex flex-column bg-light">
      <header className="hero-section mt-5 text-center py-5 text-black">
        <div className="container">
          <h1 className="fw-bold display-5  glow-text">
            <i className="bi bi-check2-square me-2"></i>Task Management
          </h1>
          <p className="lead opacity-75 mb-0">
            Plan Smart • Stay Focused • Achieve More
          </p>
        </div>
      </header>

      <main className="flex-grow-1 container-fluid py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="glass-card p-4 rounded-4 shadow h-100">
              <TaskForm onAdd={handleAddOrUpdate} editTask={editTask} />
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
              <h5 className="fw-bold text-dark mb-3  mb-md-0">
                {filter} Tasks{" "}
                <span className="badge bg-dark-subtle text-dark">
                  {filteredTasks.length}
                </span>
              </h5>

              <div className="btn-group filter-buttons">
                {["All", "Pending", "Completed"].map((type) => (
                  <button
                    key={type}
                    className={`btn rounded-pill mx-1 my-1 fw-semibold ${
                      filter === type ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className=" task-list-section p-4 rounded-4 shadow-sm">
              {filteredTasks.length > 0 ? (
                <TaskList
                  tasks={filteredTasks}
                  onUpdate={handleUpdateStatus}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <div className="text-center py-5">
                  <i
                    className="bi bi-journal-x text-muted"
                    style={{ fontSize: "3.5rem" }}
                  ></i>
                  <h5 className="text-secondary mt-3 fw-semibold">
                    No Tasks Yet
                  </h5>
                  <p className="text-muted small">
                    Add a task using the left form to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3 small text-white bg-dark mt-auto shadow-lg">
        <i className="bi bi-lightning-charge-fill text-warning me-1"></i>
        <span className="text-white">Task Tracker Web App © 2025</span>
      </footer>
    </div>
  );
}

export default Home;
