import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import type { Task, TaskCategory } from '../types/task';

interface TaskCardProps {
  task: Task;
  category: TaskCategory;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, category, onToggle, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task.id)}
            className={`p-2 rounded-full ${
              task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-opacity-80`}
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          {category.name}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Clock size={14} />
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
}