export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // ISO 格式字符串
  priority: Priority;
  tags: string[];
  completed: boolean;
  createdAt: string;
}
