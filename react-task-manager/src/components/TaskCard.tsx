import { Task } from "../types/task";
import { useState } from "react";
import { Check, Trash2, Edit2 } from "lucide-react";
import { toggleTask, deleteTask } from "../redux/task_slice";
import { useDispatch } from "react-redux";
import { getPriorityColor } from "../util/getPriorityColor";
import { TaskEditForm } from "./forms/TaskEditForm";

interface TaskCardProps {
  task: Task;
}
export const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);

  const startEdit = (id: string) => {
    setEditingId(id);
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        task.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-300"
      }`}
    >
      {editingId === task.id ? (
        <TaskEditForm task={task} setEditingId={setEditingId} />
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTask(task.id))}
            className={`p-2 rounded-full ${
              task.completed
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Check size={20} />
          </button>
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
          <button
            onClick={() => startEdit(task.id)}
            className="p-2 text-blue-600 hover:text-blue-700"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
