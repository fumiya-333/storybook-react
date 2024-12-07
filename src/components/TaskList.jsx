import { useDispatch, useSelector } from "react-redux";
import { updateTaskCompleted, updateTaskPinned } from "../lib/store";
import Task from "./Task";

const TaskList = () => {
  const tasks = useSelector((state) =>
    [...state.taskbox.tasks]
      .sort((a, b) => b.pinned - a.pinned)
      .filter((task) => !task.completed)
  );
  const status = useSelector((state) => state.taskbox.status);
  const dispatch = useDispatch();

  const updateCompleted = (completed, id) =>
    dispatch(updateTaskCompleted({ completed, id }));

  const updatePinned = (pinned, id) =>
    dispatch(updateTaskPinned({ pinned, id }));

  if (status === "loading") {
    return Array.from({ length: 8 }).map((_, index) => (
      <Task key={index} loading />
    ));
  }

  if (!tasks.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#888",
          fontSize: "16px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <p>タスクが存在しません</p>
        <p>タスクを作成してください</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onCompletedChange={updateCompleted}
          onPinChange={updatePinned}
        />
      ))}
    </div>
  );
};

export default TaskList;
