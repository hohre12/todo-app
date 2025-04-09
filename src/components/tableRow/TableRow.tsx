import { ToDo } from '@/types/api'
import styled from 'styled-components'
import Button from '../button/Button'
import moment from 'moment'
import Checkbox, { TCheckBoxValue } from '../checkBox/CheckBox'
import { useDeleteTodo, useUpdateTodo } from '@/services/todo'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { selectedTodosState } from '@/state/todo'
import { useCallback } from 'react'
import { color, text } from '@/styles/color'
import { fonts } from '@/styles/typography'
import { useToast } from '@/hooks/useeToast'
import { useConfirm } from '@/hooks/useConfirm'

type TTableRowProps = {
  data: ToDo
}

const TableRow = ({ data }: TTableRowProps) => {
  const [selectedTodos, setSelectedTodos] = useRecoilState(selectedTodosState)
  const resetTodos = useResetRecoilState(selectedTodosState)
  const { addToast } = useToast()
  const { showConfirm, hideConfirm } = useConfirm()
  const { mutateAsync: updateTodo } = useUpdateTodo()
  const { mutateAsync: deleteTodo } = useDeleteTodo()

  const getIsDeadline = (deadline: number): boolean => {
    const now = moment().startOf('day')
    const dueDate = moment(deadline).startOf('day')
    const diffDate = dueDate.diff(now, 'days')
    return diffDate >= 0 && diffDate <= 2
  }

  const handleChecked = useCallback(
    (val: TCheckBoxValue, todo: ToDo) => {
      if (val) {
        setSelectedTodos([...selectedTodos, todo])
      } else {
        const newList = selectedTodos.filter((it) => it.id !== todo.id)
        setSelectedTodos(newList)
      }
    },
    [selectedTodos, setSelectedTodos]
  )

  const handleTodoDone = async () => {
    try {
      const res = await updateTodo({
        id: data.id,
        data: {
          text: data.text,
          done: true,
          deadline: data.deadline,
        },
      })
      addToast({
        id: Date.now(),
        content: `할일 - ${res.text}(이) 완료되었습니다.`,
        type: 'success',
      })
    } catch (e) {
      console.warn(e)
    }
  }

  const handleTodoDelete = async () => {
    try {
      await deleteTodo(data.id)
      hideConfirm()
      addToast({
        id: Date.now(),
        content: `할일 - ${data.text}(이) 삭제되었습니다.`,
        type: 'success',
      })
      resetTodos()
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <TableRowWrapper
      $isDone={data.done}
      $isDeadline={getIsDeadline(data.deadline)}
    >
      <Checkbox
        value={selectedTodos.some((st) => st.id === data.id)}
        onCheckedChange={(val) => handleChecked(val, data)}
      />
      <TodoInfoWrapper>
        <TextWrapper $isDone={data.done}>{data.text}</TextWrapper>
        <DeadlineWrapper $isDone={data.done}>
          {moment(data.deadline).format('yyyy-MM-DD')}
        </DeadlineWrapper>
      </TodoInfoWrapper>
      <ButtonWrapper>
        {!data.done && (
          <>
            <Button variant="primary" onClick={handleTodoDone}>
              완료
            </Button>
            <Button>수정</Button>
          </>
        )}
        <Button
          variant="red"
          onClick={() =>
            showConfirm({
              isOpen: true,
              title: '할일 삭제',
              content: `할일 - ${data.text}(를) 삭제하시겠습니까?`,
              onCancel: hideConfirm,
              cancelText: '취소',
              onConfirm: handleTodoDelete,
              confirmText: '삭제',
              onClose: hideConfirm,
              confirmVariant: 'red',
            })
          }
        >
          삭제
        </Button>
      </ButtonWrapper>
    </TableRowWrapper>
  )
}

export default TableRow

const TableRowWrapper = styled.div<{ $isDone: boolean; $isDeadline: boolean }>`
  display: flex;
  padding: 24px 40px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.1);
  gap: 30px;
  color: ${({ $isDone, $isDeadline }) =>
    $isDone
      ? text['textSecondary']
      : $isDeadline
      ? text['textyello']
      : text['textBlack']};
  background: ${({ $isDone, $isDeadline }) =>
    $isDone
      ? color['lightGray']
      : $isDeadline
      ? color['lightYello']
      : color['white']};
`

const TodoInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const TextWrapper = styled.h4<{ $isDone: boolean }>`
  ${fonts['Caption']}
  text-decoration: ${({ $isDone }) => ($isDone ? 'line-through' : 'none')};
`
const DeadlineWrapper = styled.span<{ $isDone: boolean }>`
  ${fonts['Small']}
  text-decoration: ${({ $isDone }) => ($isDone ? 'line-through' : 'none')};
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: auto;
`
