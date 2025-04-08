import { APIResponse } from './../types/api'
import { ToDo, ToDoRequest } from '@/types/api'
import axiosInstance from './api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// get
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

// post
const createTodo = async (todo: ToDoRequest): Promise<ToDo> => {
  const res = await axiosInstance.post<APIResponse<ToDo>>('/todos', todo)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}

export const useCreateTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })
}

// put
const updateTodo = async (id: number, todo: ToDoRequest): Promise<ToDo> => {
  const res = await axiosInstance.put<APIResponse<ToDo>>(`/todos/${id}`, todo)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}

export const useUpdateTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ToDoRequest }) =>
      updateTodo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })
}
