import React from "react";

function TaskItem({ task, onUpdate, onDelete, onEdit }) {
  const createdDate = new Date(task.created_at).toLocaleDateString();

  return (
    <div
      className={`card border-0 shadow-sm rounded-4 mb-3 p-3  ${
        task.completed ? "bg-light" : "bg-white"
      }`}
      style={{
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="flex-grow-1">
          <h5
            className={`fw-bold mb-1 ${
              task.completed ? "text-decoration-line-through text-muted" : "text-dark"
            }`}
          >
            {task.title}
          </h5>
          <p className="text-muted mb-2 small">{task.description}</p>

          <div className="d-flex align-items-center gap-3 small">
            <span className="text-secondary">
              <i className="bi bi-clock me-1"></i>
              {createdDate}
            </span>
            <span
              className={`badge rounded-pill ${
                task.completed ? "bg-success" : "bg-warning text-dark"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
          <button
            onClick={() => onUpdate(task.id, { completed: !task.completed })}
            className="btn btn-outline-success btn-sm rounded-circle"
            title="Toggle Complete"
          >
            <i className="bi bi-check-circle"></i>
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
    </div>
  );
}

export default TaskItem;

