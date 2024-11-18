export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;
  createdAt: string;
}

export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};