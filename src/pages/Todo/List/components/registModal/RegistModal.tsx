import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { SvgIcon } from '@/components/svgIcon/SvgIcon'
import { Required } from '@/styles/common'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { useCreateTodo } from '@/services/todo'
import { useToast } from '@/hooks/useeToast'

type TRegistModalProps = {
  onClose: () => void
}

const RegistModal = ({ onClose }: TRegistModalProps) => {
  const [text, setText] = useState<string>()
  const [deadline, setDeadline] = useState<Date | null>(null)
  const { addToast } = useToast()
  const { mutateAsync: createTodo } = useCreateTodo()

  const handleTodoRegist = async () => {
    if (!text) return
    if (!deadline) return
    try {
      const res = await createTodo({
        text,
        done: false,
        deadline: deadline.getTime(),
      })
      addToast({
        id: Date.now(),
        content: `할일 - ${res.text}(이) 생성되었습니다.`,
        type: 'success',
      })
      onClose()
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <RegistModalRootWrapper>
      <RegistModalWrapper>
        <RegistModalHeader>
          <h1>신규 TODO 생성</h1>
          <SvgIcon iconName="icon-close" alt="close" onClick={onClose} />
        </RegistModalHeader>
        <RegistModalBody>
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
        </RegistModalBody>
        <RegistModalFooter>
          <Button variant="red" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleTodoRegist}>
            생성
          </Button>
        </RegistModalFooter>
      </RegistModalWrapper>
    </RegistModalRootWrapper>
  )
}

export default RegistModal

const RegistModalRootWrapper = styled.div`
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
const RegistModalWrapper = styled.div`
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
const RegistModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  svg {
    cursor: pointer;
  }
`

const RegistModalBody = styled.div`
  width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const RegistModalFooter = styled.div`
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
