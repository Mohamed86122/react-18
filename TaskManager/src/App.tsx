import React, { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import type { Task, TaskCategory } from './types/task';

const defaultCategories: TaskCategory[] = [
  { id: '1', name: 'Personnel', color: '#3B82F6' },
  { id: '2', name: 'Travail', color: '#EF4444' },
  { id: '4', name: 'Sport', color: '#8B5CF6' },
];

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [categories] = useState<TaskCategory[]>(defaultCategories);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);
  

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    const matchesCategory =
      selectedCategory === 'all' || task.category === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Layout className="w-8 h-8 text-blue-500" /> */}
              <img src="./public/assets/images/logo.png" id="image" alt="Task Manager"  />
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add Task
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <TaskForm
                onSubmit={handleAddTask}
                categories={categories}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              category={categories.find((c) => c.id === task.category)!}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No tasks found</h3>
            <p className="text-gray-500 mt-2">
              {filter === 'all'
                ? "You haven't created any tasks yet"
                : filter === 'active'
                ? 'No active tasks'
                : 'No completed tasks'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import { useEffect } from 'react';
