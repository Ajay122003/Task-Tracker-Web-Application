import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
  if (tasks.length === 0)
    return (
      <p className="text-center text-muted py-4 animate__animated animate__fadeIn">
        No tasks available.
      </p>
    );

  return (
    <div className="animate__animated animate__fadeInUp">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;

