import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types.ts';

const TASK_STORAGE_KEY = 'TASKS_STORAGE_KEY';

export const getAllTasks = async (): Promise<Task[]> => {
  const raw = await AsyncStorage.getItem(TASK_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const createTask = async (task: Task) => {
  const tasks = await getAllTasks();
  const newTasks = [...tasks, task];
  await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(newTasks));
};

export const updateTask = async (updated: Task) => {
  const tasks = await getAllTasks();
  const newTasks = tasks.map(t => (t.id === updated.id ? updated : t));
  await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(newTasks));
};
