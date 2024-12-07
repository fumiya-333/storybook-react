import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/?userId=1"
  );
  const data = await response.json();
  return data.map((task) => ({
    ...task,
    id: `${task.id}`,
    pinned: false,
  }));
});

export const tasksSlice = createSlice({
  name: "taskbox",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateTaskCompleted: (state, action) => {
      const { completed, id } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index >= 0) {
        console.log("Raw tasks:", JSON.stringify(state.tasks));
        try {
          state.tasks[index].completed = completed;
        } catch (error) {
          console.error("Update failed:", error);
        }
      }
    },
    updateTaskPinned: (state, action) => {
      const { pinned, id } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index >= 0) {
        state.tasks[index].pinned = pinned;
      }
    },
  },
  extraReducers: (builder) => {
    // 非同期処理待機時
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tasks = [];
    });
    // 非同期処理成功時
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.tasks = action.payload;
    });
    // 非同期処理エラー時
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = "failed";
      state.error = "Something went wrong";
      state.tasks = [];
    });
  },
});

export const { updateTaskCompleted, updateTaskPinned } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: tasksSlice.reducer,
  },
});

export default store;
