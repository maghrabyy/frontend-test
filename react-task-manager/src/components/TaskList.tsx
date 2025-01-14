import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setFilter } from "../redux/task_slice";
import { Priority } from "../types/task";
import { getPriorityColor } from "../util/getPriorityColor";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);

  const filteredUncompletedTasks = tasks
    .filter((task) => filter === "all" || task.priority === filter)
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((task) => !task.completed);

  console.log(tasks);

  const filteredCompletedTasks = tasks
    .filter((task) => filter === "all" || task.priority === filter)
    .sort((a, b) => b.completedAt! - a.completedAt!)
    .filter((task) => task.completed);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        {(["high", "medium", "low"] as Priority[]).map((p) => (
          <button
            key={p}
            onClick={() => dispatch(setFilter(p))}
            className={`px-4 py-2 rounded-lg capitalize ${
              filter === p ? "bg-blue-600 text-white" : getPriorityColor(p)
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredUncompletedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <div className="space-y-4">
        {filteredCompletedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
