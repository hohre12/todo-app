import Button from '@/components/button/Button'
import SearchBox from '@/components/searchBox/SearchBox'
import { selectedTodosState, todoSearchTextState } from '@/state/todo'
import { fonts } from '@/styles/typography'
import { useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import RegistModal from './components/registModal/RegistModal'
import { useTodos } from '@/services/todo'
import TableRow from '@/components/tableRow/TableRow'
import Checkbox from '@/components/checkBox/CheckBox'

const TodoList = () => {
  const [selectedTodos, setSelectedTodos] = useRecoilState(selectedTodosState)
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false)
  const [searchText, setSearchText] = useRecoilState(todoSearchTextState)
  const [text, setText] = useState<string>(searchText)

  const { data: todos } = useTodos()

  const isAllChecked = useMemo(() => {
    if (!todos) return false
    return todos.every((it) => selectedTodos.includes(it)) && todos.length !== 0
  }, [selectedTodos, todos])

  const handleAllChecked = useCallback(() => {
    if (todos) {
      if (selectedTodos.length > 0) {
        setSelectedTodos([])
      } else {
        setSelectedTodos(todos)
      }
    }
  }, [selectedTodos.length, setSelectedTodos, todos])

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('')
  }, [setSearchText])

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value)
    },
    [setSearchText]
  )
  return (
    <>
      <TodoListWrapper>
        <Header>
          <ControlWrapper>
            <SearchBox
              value={text}
              placeholder="검색"
              onTextChange={(text) => setText(text)}
              onRemoveClick={handleSearchTextDelete}
              onKeyDown={handleSearch}
              onRecentClick={handleSearch}
            ></SearchBox>
            <Button
              variant="primary"
              width={200}
              onClick={() => setIsOpenRegistModal(!isOpenRegistModal)}
            >
              TODO 생성
            </Button>
          </ControlWrapper>
        </Header>
        <ListContent>
          {todos && todos.length > 0 ? (
            <>
              <ListInfo>
                <Checkbox
                  value={isAllChecked}
                  onCheckedChange={handleAllChecked}
                ></Checkbox>
                <h4>전체선택</h4>
              </ListInfo>
              <TableWrapper>
                {todos.map((todo, idx) => (
                  <TableRow key={idx} data={todo}></TableRow>
                ))}
              </TableWrapper>
            </>
          ) : (
            <div></div>
          )}
        </ListContent>
      </TodoListWrapper>
      {isOpenRegistModal && (
        <RegistModal onClose={() => setIsOpenRegistModal(false)}></RegistModal>
      )}
    </>
  )
}

export default TodoList

const TodoListWrapper = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 17px 20px;
  border-bottom: 1px solid #eee;
  height: 130px;
  justify-content: center;
  & > h2 {
    ${fonts['Title2']}
    text-align: left;
  }
`
const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 130px);
`
const ListInfo = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px 60px 0;
  align-items: center;
  & > p {
    margin-left: auto;
  }
`

const TableWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
`
