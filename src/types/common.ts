import { ReactNode } from 'react'

export type TVariant =
  | 'primary'
  | 'red'
  | 'gray'
  | 'lightGray'
  | 'white'
  | 'black'

export interface Toast {
  id: number
  title?: string
  content: string
  type: 'warning' | 'success' | 'error'
  children?: ReactNode
}

export interface Confirm {
  isOpen: boolean
  title?: string
  content?: string
  onCancel?: () => void
  cancelText?: string
  onConfirm?: (val: string) => void
  confirmText?: string
  onClose?: () => void
  confirmVariant?: TVariant
}
