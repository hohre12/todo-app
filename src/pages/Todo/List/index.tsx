import Button from '@/components/button/Button'
import SearchBox from '@/components/searchBox/SearchBox'
import { todoSearchTextState } from '@/state/todo'
import { fonts } from '@/styles/typography'
import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import RegistModal from './components/registModal/RegistModal'

const TodoList = () => {
  const [isOpenRegistModal, setIsOpenRegistModal] = useState<boolean>(false)
  const [searchText, setSearchText] = useRecoilState(todoSearchTextState)
  const [text, setText] = useState<string>(searchText)
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
          <h2>할일목록</h2>
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
  & > h2 {
    ${fonts['Title2']}
    text-align: left;
  }
`
const ControlWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 20px;
`
