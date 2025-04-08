import { APIResponse } from './../types/api'
import { ToDo, ToDoRequest } from '@/types/api'
import axiosInstance from './api'
import { useQuery } from '@tanstack/react-query'

const getTodos = async (): Promise<ToDo[]> => {
  const res = await axiosInstance.get<APIResponse<ToDo[]>>('/todos')
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })
}

export const createTodo = async (todo: ToDoRequest): Promise<ToDo> => {
  const res = await axiosInstance.post<APIResponse<ToDo>>('/todos', todo)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}
