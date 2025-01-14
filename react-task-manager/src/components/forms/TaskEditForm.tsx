import { useForm } from "react-hook-form";
import { Priority, Task } from "../../types/task";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/task_slice";
import { SetStateAction, Dispatch } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface TaskEditFormProps {
  task: Task;
  setEditingId: Dispatch<SetStateAction<string | null>>;
}

export const TaskEditForm = ({ task, setEditingId }: TaskEditFormProps) => {
  const dispatch = useDispatch();

  const editTaskSchema = yup
    .object({
      title: yup
        .string()
        .required("Task title is required")
        .max(100, "Task title is too long"),
      priority: yup
        .mixed<Priority>()
        .oneOf(["low", "medium", "high"] as const)
        .required(),
    })
    .required();

  type EditTaskFormData = yup.InferType<typeof editTaskSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskFormData>({
    resolver: yupResolver(editTaskSchema),
    defaultValues: {
      title: task.title,
      priority: task.priority,
    },
  });

  const handleEdit = (id: string, data: EditTaskFormData) => {
    dispatch(editTask({ id, ...data }));
    setEditingId(null);
  };
  return (
    <form
      onSubmit={handleSubmit((data) => handleEdit(task.id, data))}
      className="flex gap-4"
    >
      <div className="flex-1">
        <input
          type="text"
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.title
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } focus:outline-none focus:ring-2`}
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <select
        className={`px-4 py-2 appearance-none rounded-lg border ${
          errors.priority
            ? "border-red-300 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } focus:outline-none focus:ring-2`}
        {...register("priority")}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="p-2 text-green-600 hover:text-green-700">
        <Check size={20} />
      </button>
      <button
        type="button"
        onClick={() => setEditingId(null)}
        className="p-2 text-red-600 hover:text-red-700"
      >
        <X size={20} />
      </button>
    </form>
  );
};
