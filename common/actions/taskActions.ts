import { taskKey, tasksKey } from '../data/keys'
import { Status, TaskType } from '../types/TaskType'
import customFetch from '../utils/customFetch'

export const createTask = async (task: TaskType) =>
  await customFetch(`${tasksKey()}/create`, 'POST', task)

export const editTask = async (task: TaskType) =>
  await customFetch(`${taskKey(task.id)}/edit`, 'PUT', task)

export const changeTaskStatus = async (taskId: string, status: Status) =>
  await customFetch(`${taskKey(taskId)}?status=${status}`, 'PUT')

export const deleteTask = async (taskId: string) =>
  await customFetch(`${taskKey(taskId)}/delete`, 'DELETE')
