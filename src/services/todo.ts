import { APIResponse } from './../types/api'
import { ToDo, ToDoRequest } from '@/types/api'
import axiosInstance from './api'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

// get todos
const getTodos = async ({
  pageParam = 1,
  limit = 10,
  keyword = '',
}: {
  pageParam?: number
  limit?: number
  keyword?: string
}): Promise<{ todos: ToDo[]; nextPage?: number }> => {
  const res = await axiosInstance.get<APIResponse<ToDo[]>>('/todos')
  if (res.data.code !== 200) throw new Error(res.data.message)
  let allTodos: ToDo[] = res.data.data ?? []
  if (keyword) {
    allTodos = allTodos.filter((todo) =>
      todo.text.toLowerCase().includes(keyword.toLowerCase())
    )
  }
  const offset = (pageParam - 1) * limit
  const paged = allTodos.slice(offset, offset + limit)
  const hasNext = offset + limit < allTodos.length
  return { todos: paged, nextPage: hasNext ? pageParam + 1 : undefined }
}

export const useTodos = ({
  limit = 10,
  keyword = '',
}: {
  limit?: number
  keyword?: string
}) => {
  return useInfiniteQuery({
    queryKey: ['todos', keyword],
    queryFn: ({ pageParam = 1 }) => getTodos({ pageParam, limit, keyword }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
}

// get todo
const getTodo = async (id: ToDo['id']): Promise<ToDo> => {
  const res = await axiosInstance.get<APIResponse<ToDo>>(`/todos/${id}`)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}

export const useTodo = (id: ToDo['id']) => {
  return useQuery({
    queryKey: ['todo'],
    queryFn: () => getTodo(id),
    enabled: !!id,
  })
}

// create todo
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

// update todo
const updateTodo = async (id: ToDo['id'], todo: ToDoRequest): Promise<ToDo> => {
  const res = await axiosInstance.put<APIResponse<ToDo>>(`/todos/${id}`, todo)
  if (res.data.code !== 200) throw new Error(res.data.message)
  return res.data.data!
}

export const useUpdateTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: ToDo['id']; data: ToDoRequest }) =>
      updateTodo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })
}

// delete todo
const deleteTodo = async (id: ToDo['id']) => {
  const res = await axiosInstance.delete<APIResponse<void>>(`/todos/${id}`)
  if (res.data.code !== 200) throw new Error(res.data.message)
}

export const useDeleteTodo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: ToDo['id']) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })
}

// delete todos
const deleteTodos = async (ids: ToDo['id'][]) => {
  const res = await axiosInstance.delete<APIResponse<void>>(`/todos`, {
    data: { ids },
  })
  if (res.data.code !== 200) throw new Error(res.data.message)
}

export const useDeleteTodos = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (ids: ToDo['id'][]) => deleteTodos(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  })
}
