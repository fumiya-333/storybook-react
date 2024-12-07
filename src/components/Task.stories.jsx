import { useState } from "react";
import PropTypes from "prop-types";
import Task from "./Task";

export default {
  component: Task,
  title: "Task",
  tags: ["autodocs"],
};

const TaskStory = ({ defaultCompleted, defaultPinned }) => {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [pinned, setPinned] = useState(defaultPinned);

  return (
    <Task
      task={{
        id: "1",
        title: "Task 1",
        completed,
        pinned,
      }}
      onCompletedChange={setCompleted}
      onPinChange={setPinned}
    />
  );
};

TaskStory.propTypes = {
  defaultCompleted: PropTypes.bool.isRequired,
  defaultPinned: PropTypes.bool.isRequired,
};

export const Default = () => (
  <TaskStory defaultCompleted={false} defaultPinned={false} />
);

export const Pinned = () => (
  <TaskStory defaultCompleted={false} defaultPinned={true} />
);

export const Archived = () => (
  <TaskStory defaultCompleted={true} defaultPinned={false} />
);
