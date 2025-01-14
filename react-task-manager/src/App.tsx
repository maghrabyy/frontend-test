import "./App.css";
import { TaskAddForm } from "./components/forms/TaskAddForm";
import { TaskList } from "./components/TaskList";
import { CheckSquare } from "lucide-react";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="flex items-center gap-4 mb-8">
            <CheckSquare size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <TaskAddForm />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
