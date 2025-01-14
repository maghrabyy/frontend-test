import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Priority } from "../types/task";

interface TaskState {
  tasks: Task[];
  filter: Priority | "all";
}

const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TaskState = {
  tasks: loadTasks(),
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<Task, "id" | "createdAt" | "completedAt">>
    ) => {
      const newTask: Task = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        completedAt: null,
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.completedAt = Date.now();
        } else {
          task.completedAt = null;
        }
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasks(state.tasks);
    },
    editTask: (
      state,
      action: PayloadAction<{ id: string; title: string; priority: Priority }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
        saveTasks(state.tasks);
      }
    },
    setFilter: (state, action: PayloadAction<Priority | "all">) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter } =
  taskSlice.actions;
export default taskSlice.reducer;
