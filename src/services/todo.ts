import { APIResponse } from './../types/api'
import { ToDo, ToDoRequest } from '@/types/api'
import axiosInstance from './api'

export const createTodo = async (todo: ToDoRequest): Promise<ToDo> => {
  const res = await axiosInstance.post<APIResponse<ToDo>>('/todos', todo)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}
