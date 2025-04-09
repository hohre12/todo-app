import Input from '@/components/input/Input'
import { Required } from '@/styles/common'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import Button from '@/components/button/Button'
import { SvgIcon } from '@/components/svgIcon/SvgIcon'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/useeToast'
import { useTodo, useUpdateTodo } from '@/services/todo'
import { ToDo } from '@/types/api'

type TEditModalProps = {
  propsTodo: ToDo
  onClose: () => void
}

const EditModal = ({ propsTodo, onClose }: TEditModalProps) => {
  const [text, setText] = useState<string>()
  const [deadline, setDeadline] = useState<Date | null>(null)
  const { addToast } = useToast()
  const { data: todo } = useTodo(propsTodo.id)
  const { mutateAsync: updateTodo } = useUpdateTodo()
  const handleTodoEdit = async () => {
    if (!todo) return
    if (!text) return
    if (!deadline) return
    try {
      await updateTodo({
        id: propsTodo.id,
        data: {
          text,
          done: todo.done,
          deadline: deadline.getTime(),
        },
      })
      addToast({
        id: Date.now(),
        content: `할일이 수정되었습니다.`,
        type: 'success',
      })
      onClose()
    } catch (e) {
      console.warn(e)
    }
  }
  useEffect(() => {
    if (todo) {
      setText(todo.text)
      setDeadline(new Date(todo.deadline))
    }
  }, [todo])
  return (
    <EditModalRootWrapper>
      <EditModalWrapper>
        <EditModalHeader>
          <h1>TODO 수정</h1>
          <SvgIcon iconName="icon-close" alt="close" onClick={onClose} />
        </EditModalHeader>
        <EditModalBody>
          <Content>
            <span>
              할일<Required>*</Required>
            </span>
            <InputWrapper>
              <Input
                value={text}
                onTextChange={(value) => setText(value)}
                placeholder="할일을 입력해주세요"
              />
            </InputWrapper>
          </Content>
          <Content>
            <span>기한</span>
            <ReactDatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              minDate={new Date()}
              placeholderText="기한을 선택하세요"
              dateFormat="yyyy-MM-dd"
            ></ReactDatePicker>
          </Content>
        </EditModalBody>
        <EditModalFooter>
          <Button variant="red" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleTodoEdit}>
            수정
          </Button>
        </EditModalFooter>
      </EditModalWrapper>
    </EditModalRootWrapper>
  )
}

export default EditModal

const EditModalRootWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  height: 100%;
  overflow-y: auto;
`

const EditModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  position: fixed;
  top: 50%;
  left: calc(50% - 100px);
  margin: 0 100px 0 100px;
  min-height: 110px;
  max-height: 700px;
  border-radius: 16px;
  background-color: #ffffff;
  z-index: 1001;
  box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
`

const EditModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  svg {
    cursor: pointer;
  }
`

const EditModalBody = styled.div`
  width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const EditModalFooter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
  padding: 30px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    white-space: nowrap;
    margin-bottom: 10px;
  }
  .react-datepicker-wrapper {
    .react-datepicker__input-container {
      border: 1px solid #eee;
      padding: 10px;
      border-radius: 8px;
      input {
        border: none;
        width: 100%;
        &:focus-visible {
          outline: none !important;
        }
      }
    }
  }
`
const InputWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
`
