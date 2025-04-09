import Button from '@/components/button/Button'
import { SvgIcon } from '@/components/svgIcon/SvgIcon'
import { useConfirm } from '@/hooks/useConfirm'
import { useToast } from '@/hooks/useeToast'
import { useDeleteTodos } from '@/services/todo'
import { selectedTodosState } from '@/state/todo'
import { fonts } from '@/styles/typography'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import styled from 'styled-components'

const FloatingMenu = () => {
  const selectedTodos = useRecoilValue(selectedTodosState)
  const resetTodos = useResetRecoilState(selectedTodosState)
  const { mutateAsync: deleteTodos } = useDeleteTodos()
  const { showConfirm, hideConfirm } = useConfirm()
  const { addToast } = useToast()
  const handleTodosDelete = async () => {
    try {
      await deleteTodos(selectedTodos.map((todo) => todo.id))
      hideConfirm()
      addToast({
        id: Date.now(),
        content: `${selectedTodos.length}개의 할일들이 삭제되었습니다.`,
        type: 'success',
      })
      resetTodos()
    } catch (e) {
      console.warn(e)
    }
  }
  return (
    <FloatingMenuWrapper>
      <h4>
        <span>{selectedTodos.length}개</span>
        선택
      </h4>
      <FloatingItem>
        <Button
          variant="transparent"
          onClick={() =>
            showConfirm({
              isOpen: true,
              title: '할일 선택 삭제',
              content: `선택된 할일들을 삭제하시겠습니까?`,
              onCancel: hideConfirm,
              cancelText: '취소',
              onConfirm: handleTodosDelete,
              confirmText: '삭제',
              onClose: hideConfirm,
              confirmVariant: 'red',
            })
          }
        >
          <SvgIcon iconName="icon-trash" alt="trash" />
          <p>할일삭제</p>
        </Button>
      </FloatingItem>
    </FloatingMenuWrapper>
  )
}

export default FloatingMenu

const FloatingMenuWrapper = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 2;
  & > h4 {
    word-break: break-word;
    padding: 5px;
    font-size: 16px;
    color: #000;
    font-weight: 400;
    width: 112px;
    text-align: center;
    span {
      font-size: 16px;
      display: inline-block;
      color: #005cd6;
      padding-right: 3px;
      font-weight: 700;
    }
  }
`

const FloatingItem = styled.div`
  padding: 0 12px;
  border-left: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-items: center;
  & > button {
    display: flex;
    flex-direction: column;
    height: auto;
    opacity: 0.5;
    width: 78px;
    height: 63px;
    white-space: nowrap;
    &:hover {
      opacity: 1;
      background: #f5f5f5;
    }
    &.active {
      background: #f5f5f5;
    }
    p {
      ${fonts['Body2']}
    }
  }
`
