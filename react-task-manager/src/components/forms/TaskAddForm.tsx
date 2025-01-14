import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addTask } from "../../redux/task_slice";
import { Priority } from "../../types/task";
import { PlusCircle } from "lucide-react";

const taskSchema = yup
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

type TaskFormData = yup.InferType<typeof taskSchema>;

export const TaskAddForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      priority: "medium" as Priority,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({ ...data, completed: false }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a new task..."
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
          className={`px-4 appearance-none py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2`}
          {...register("priority")}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};
