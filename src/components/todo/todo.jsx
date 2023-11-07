import { Icon } from "@tremor/react";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </p>
      <div>
        <Icon
          className="edit-icon"
          onClick={() => editTodo(task.id)}
          src="/public/images/iconEdit.png"
        />
        <Icon
          className="delete-icon"
          onClick={() => deleteTodo(task.id)}
          src="/public/images/iconDelete.png"
        />
      </div>
    </div>
  );
};
