import { ToDo } from '@/types/api'
import styled from 'styled-components'
import Button from '../button/Button'
import moment from 'moment'
import Checkbox from '../checkBox/CheckBox'

type TTableRowProps = {
  data: ToDo
}

const TableRow = ({ data }: TTableRowProps) => {
  return (
    <TableRowWrapper>
      {/* 체크박스 */}
      <Checkbox />
      <TodoInfoWrapper>
        <TextWrapper>{data.text}</TextWrapper>
        <DeadlineWrapper>
          {moment(data.deadline).format('yyyy-MM-DD')}
        </DeadlineWrapper>
      </TodoInfoWrapper>
      <ButtonWrapper>
        <Button>수정</Button>
        <Button>삭제</Button>
      </ButtonWrapper>
    </TableRowWrapper>
  )
}

export default TableRow

const TableRowWrapper = styled.div`
  display: flex;
  padding: 24px 40px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.1);
  gap: 30px;
`

const TodoInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const TextWrapper = styled.h4``
const DeadlineWrapper = styled.span``
const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: auto;
`
