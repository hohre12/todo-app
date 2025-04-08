import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { TOAST_TIME } from '@/constants/common'
import { toastListState } from '@/state/common'
import { Toast } from '@/types/common'
export const useToast = () => {
  const [toastList, setToastList] = useRecoilState(toastListState)

  const addToast = useCallback(
    (toastValue: Toast) => {
      const id = Date.now()
      const newToast = { ...toastValue, id }
      setToastList((prevList) => {
        const updatedList = [...prevList, newToast]

        setTimeout(() => {
          setToastList((currentList) =>
            currentList.filter((toast) => toast.id !== id)
          )
        }, TOAST_TIME)

        return updatedList
      })
    },
    [setToastList]
  )

  return {
    addToast,
    toastList,
  }
}
