
import React, { useEffect, useState } from "react";

function TaskForm({ onAdd, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status || "Pending");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <div className="glass-card p-4 rounded-4 shadow form-card">
      <h4 className="fw-bold mb-4 text-dark">
        {editTask ? " Edit Task" : " Add New Task"}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control rounded-3 border-1"
            id="floatingTitle"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="floatingTitle">Task Title</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control rounded-3 border-1"
            id="floatingDesc"
            style={{ height: "100px" }}
            placeholder="Enter task details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label htmlFor="floatingDesc">Description</label>
        </div>

        <div className="form-floating mb-4">
          <select
            className="form-select rounded-3 border-2"
            id="floatingStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="floatingStatus">Status</label>
        </div>

        <button
          type="submit"
          className={`btn w-100 py-2 fw-semibold ${
            editTask ? "btn-warning text-dark" : "btn-success text-light"
          } rounded-3 shadow-sm`}
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;






