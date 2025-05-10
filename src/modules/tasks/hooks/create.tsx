import {useState} from 'react';
import {Task, Priority} from '../types.ts';
import {createTask, updateTask} from '../services/create.ts';
import {v4 as uuidv4} from 'uuid';

export const useCreateTask = (editingTask?: Task, onFinish?: () => void) => {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(
    editingTask?.description || '',
  );
  const [dueDate, setDueDate] = useState<string | undefined>(
    editingTask?.dueDate,
  );
  const [priority, setPriority] = useState<Priority>(
    editingTask?.priority || 'medium',
  );
  const [tags, setTags] = useState<string[]>(editingTask?.tags || []);

  const handleSave = async () => {
    const now = new Date().toISOString();
    const task: Task = {
      id: editingTask?.id || uuidv4(),
      title,
      description,
      dueDate,
      priority,
      tags,
      completed: editingTask?.completed ?? false,
      createdAt: editingTask?.createdAt || now,
    };
    editingTask ? await updateTask(task) : await createTask(task);
    onFinish?.();
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    tags,
    setTags,
    handleSave,
  };
};
