import PropTypes from "prop-types";

const Task = ({
  task: { id, title, completed, pinned } = {},
  loading,
  onCompletedChange,
  onPinChange,
}) => {
  // スケルトン表示
  const skeletonStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "#ddd",
    borderRadius: "4px",
    marginRight: "8px",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        marginBottom: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {loading ? (
        <>
          {/* スケルトン表示 */}
          <div style={skeletonStyle}></div>
          <div
            style={{
              flex: 1,
              height: "16px",
              backgroundColor: "#ddd",
              borderRadius: "4px",
            }}
          ></div>
          <div style={{ ...skeletonStyle, marginRight: "0" }}></div>
        </>
      ) : (
        <>
          {/* 通常表示 */}
          <label
            aria-label={`checkbox-${id}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "8px",
            }}
          >
            <input
              id={`checkbox-${id}`}
              name={`checkbox-${id}`}
              type="checkbox"
              checked={completed}
              onChange={() => onCompletedChange(!completed, id)}
              style={{
                width: "16px",
                height: "16px",
                marginRight: "4px",
                cursor: "pointer",
              }}
            />
          </label>

          <span
            style={{
              flex: 1,
              marginLeft: "8px",
              fontSize: "14px",
              color: completed ? "#888" : "#000",
              textDecoration: completed ? "line-through" : "none",
            }}
            aria-label={`text-${id}`}
          >
            {title}
          </span>

          <button
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              color: pinned ? "#007BFF" : "#888",
            }}
            aria-label={pinned ? "Unpin this task" : "Pin this task"}
            onClick={() => onPinChange(!pinned, id)}
          >
            {pinned ? "📌" : "📍"}
          </button>
        </>
      )}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    pinned: PropTypes.bool.isRequired,
  }),
  loading: PropTypes.bool,
  onCompletedChange: PropTypes.func,
  onPinChange: PropTypes.func,
};

export default Task;
