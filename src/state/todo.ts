import { ToDo } from '@/types/api'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'todo',
  storage: localStorage,
})

export const todoSearchTextState = atom<string>({
  key: 'todoSearchTextState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export const selectedTodosState = atom<ToDo[]>({
  key: 'selectedTodosState',
  default: [],
})
