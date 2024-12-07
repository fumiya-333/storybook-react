import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import TaskList from "./TaskList";
import { tasksSlice } from "../lib/store";

export default {
  component: TaskList,
  title: "TaskList",
  tags: ["autodocs"],
};

const MockedState = ({ tasks, status, children }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          taskbox: tasksSlice.reducer,
        },
        preloadedState: {
          taskbox: {
            tasks,
            status,
            error: null,
          },
        },
      })}
    >
      {children}
    </Provider>
  );
};

const defaultTasks = [
  { id: "1", title: "タイトル1", completed: false, pinned: false },
  { id: "2", title: "タイトル2", completed: false, pinned: false },
  { id: "3", title: "タイトル3", completed: false, pinned: false },
  { id: "4", title: "タイトル4", completed: false, pinned: false },
  { id: "5", title: "タイトル5", completed: false, pinned: false },
  { id: "6", title: "タイトル6", completed: false, pinned: false },
];

MockedState.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      pinned: PropTypes.bool.isRequired,
    })
  ).isRequired,
  status: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const Default = () => (
  <MockedState tasks={defaultTasks}>
    <TaskList />
  </MockedState>
);

export const WithPinnedTasks = () => (
  <MockedState
    tasks={[
      ...defaultTasks.slice(0, 5),
      { id: "6", title: "タイトル6", completed: false, pinned: true },
    ]}
  >
    <TaskList />
  </MockedState>
);

export const Loading = () => (
  <MockedState tasks={[]} status={"loading"}>
    <TaskList />
  </MockedState>
);

export const Empty = () => (
  <MockedState tasks={[]}>
    <TaskList />
  </MockedState>
);
