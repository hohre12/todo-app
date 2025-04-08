import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import GlobalNavigationBar from './components/globalNavigationBar/GlobalNavigationBar'
import SideNavigationBar from './components/sideNavigationBar/SideNavigationBar'
import { ReactNode } from 'react'
import styled from 'styled-components'
import TodoList from './pages/Todo/List'
import Toast from './components/toast/Toast'

interface PrivateRouteProps {
  children: ReactNode
}

const WrapperRoute = ({ children }: PrivateRouteProps) => {
  return <RootWrapper>{children}</RootWrapper>
}

// 버튼, 인풋, 컨펌, 토스트, 테이블로우, 모달
function App() {
  return (
    <div>
      <GlobalNavigationBar></GlobalNavigationBar>
      <SideNavigationBar></SideNavigationBar>
      <Routes>
        <Route path="/todo">
          <Route
            index
            element={
              <WrapperRoute>
                <TodoList></TodoList>
              </WrapperRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate replace to="/todo" />} />
      </Routes>
      <Toast></Toast>
    </div>
  )
}

export default App

const RootWrapper = styled.div`
  width: calc(100% - 100px);
  height: calc(100% - 60px);
  position: fixed;
  left: 100px;
  top: 60px;
`
