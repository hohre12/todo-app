import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { confirmState } from '@/state/common'
import { Confirm } from '@/types/common'

export const useConfirm = () => {
  const setConfirmState = useSetRecoilState(confirmState)

  const showConfirm = useCallback(
    (confirmValue: Confirm) => {
      setConfirmState({ ...confirmValue })
    },
    [setConfirmState]
  )

  const hideConfirm = useCallback(() => {
    setConfirmState({ isOpen: false, confirmVariant: 'gray' })
  }, [setConfirmState])

  return {
    showConfirm,
    hideConfirm,
  }
}
