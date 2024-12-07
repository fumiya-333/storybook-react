import { useDispatch, useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useEffect } from "react";
import { fetchTasks } from "../lib/store";

const InboxScreen = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.taskbox);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <nav>
        <h1 className="">タスク一覧</h1>
      </nav>
      <TaskList />
    </div>
  );
};

export default InboxScreen;
