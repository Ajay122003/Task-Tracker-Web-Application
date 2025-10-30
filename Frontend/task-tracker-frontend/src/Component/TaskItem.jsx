

import React from "react";

function TaskItem({ task, onUpdate, onDelete, onEdit }) {
  const isCompleted = task.status === "Completed";
  const createdDate = new Date(task.created_at).toLocaleDateString();

  return (
    <div
      className={`task-item card border-0 rounded-4 p-3 mb-3 ${
        isCompleted ? "bg-light-subtle" : "bg-white"
      } shadow-sm hover-zoom`}
    >
      <div className="d-flex justify-content-between align-items-start flex-wrap">
        <div>
          <h5
            className={`fw-bold ${
              isCompleted ? " text-black" : "text-dark"
            }`}
          >
            {task.title}
          </h5>
          <p className="text-muted small mb-2">{task.description}</p>

          <span
            className={`badge px-3 py-2 rounded-pill fw-semibold ${
              isCompleted ? "bg-success-subtle text-success" : "bg-warning-subtle text-dark"
            }`}
          >
            {task.status}
          </span>
        </div>

        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button
            onClick={() =>
              onUpdate(task.id, {
                status: isCompleted ? "Pending" : "Completed",
              })
            }
            className="btn btn-outline-success btn-sm rounded-circle"
            title="Toggle Status"
          >
            <i className="bi bi-check2"></i>
          </button>
          <button
            onClick={() => onEdit(task)}
            className="btn btn-outline-primary btn-sm rounded-circle"
            title="Edit Task"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-outline-danger btn-sm rounded-circle"
            title="Delete Task"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <p className="small text-muted mt-2">
        <i className="bi bi-clock me-1"></i>
        {createdDate}
      </p>
    </div>
  );
}

export default TaskItem;
