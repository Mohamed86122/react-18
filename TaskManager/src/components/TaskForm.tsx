import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import type { Task, TaskCategory } from '../types/task';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  categories: TaskCategory[];
  onClose: () => void;
}

export default function TaskForm({ onSubmit, categories, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      category,
      dueDate,
      completed: false,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add New Task</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        Add Task
      </button>
    </form>
  );
}