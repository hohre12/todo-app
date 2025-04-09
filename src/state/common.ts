import { Confirm, Toast } from '@/types/common'
import { atom } from 'recoil'

export const confirmState = atom<Confirm>({
  key: 'confirmState',
  default: {
    isOpen: false,
    confirmVariant: 'gray',
  },
})

export const toastListState = atom<Toast[]>({
  key: 'toastListState',
  default: [],
})
