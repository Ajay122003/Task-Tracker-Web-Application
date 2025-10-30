import React, { useEffect, useState } from "react";

function TaskForm({ onAdd, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} >
      <h4 className="fw-bold text-primary mb-3">
        {editTask ? " Edit Task" : " Add New Task"}
      </h4>

      {/* Floating Title Input */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control rounded-3 border-secondary"
          id="floatingTitle"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="floatingTitle">Task Title</label>
      </div>

      {/* Floating Description Input */}
      <div className="form-floating mb-4">
        <textarea
          className="form-control rounded-3 border-secondary"
          placeholder="Write task details..."
          id="floatingDesc"
          style={{ height: "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="floatingDesc">Description</label>
      </div>

      <div className="text-end">
        <button
          type="submit"
          className={`btn ${
            editTask ? "btn-warning text-dark" : "btn-primary"
          } px-4 py-2 fw-semibold rounded-3`}
          style={{ transition: "0.3s ease-in-out" }}
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

