import Button from '@/components/button/Button'
import SearchBox from '@/components/searchBox/SearchBox'
import { selectedTodosState, todoSearchTextState } from '@/state/todo'
import { fonts } from '@/styles/typography'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import styled from 'styled-components'
import RegistModal from './components/registModal/RegistModal'
import { useTodos } from '@/services/todo'
import TableRow from '@/components/tableRow/TableRow'
import Checkbox from '@/components/checkBox/CheckBox'
import { debounce } from 'lodash'
import FloatingMenu from './components/floatingMenu/FloatingMenu'
import { ToDo } from '@/types/api'
import EditModal from './components/editModal/EditModal'

const TodoList = () => {
  const [selectedTodos, setSelectedTodos] = useRecoilState(selectedTodosState)
  const resetTodos = useResetRecoilState(selectedTodosState)
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false)
  const [searchText, setSearchText] = useRecoilState(todoSearchTextState)
  const [text, setText] = useState<string>(searchText)
  const listWrapperRef = useRef<HTMLDivElement | null>(null)
  const [editTarget, setEditTarget] = useState<ToDo>()

  const { data, isLoading, error, fetchNextPage } = useTodos({
    keyword: searchText,
  })

  const todos = useMemo(() => {
    return data?.pages.flatMap((page) => page.todos) ?? []
  }, [data?.pages])

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
    resetTodos()
  }, [setSearchText, resetTodos])

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value)
      resetTodos()
    },
    [setSearchText, resetTodos]
  )

  const handleScroll = debounce(() => {
    if (listWrapperRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listWrapperRef.current

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextPage()
      }
    }
  }, 300)

  useEffect(() => {
    const wrapper = listWrapperRef.current
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll)
      }
    }
  }, [todos, handleScroll])

  if (isLoading)
    return (
      <div>
        <div className="loading"></div>
      </div>
    )
  if (error)
    return (
      <div>
        <span className="error">{error.message}</span>
      </div>
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
              <TableWrapper ref={listWrapperRef}>
                {todos.map((todo, idx) => (
                  <TableRow
                    key={idx}
                    data={todo}
                    onEditClick={(todo) => setEditTarget(todo)}
                  ></TableRow>
                ))}
              </TableWrapper>
              {selectedTodos.length > 0 && <FloatingMenu></FloatingMenu>}
            </>
          ) : (
            <div></div>
          )}
        </ListContent>
      </TodoListWrapper>
      {isOpenRegistModal && (
        <RegistModal onClose={() => setIsOpenRegistModal(false)}></RegistModal>
      )}
      {editTarget && (
        <EditModal
          onClose={() => setEditTarget(undefined)}
          propsTodo={editTarget}
        ></EditModal>
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
