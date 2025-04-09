import styled from 'styled-components'

const GlobalNavigationBar = () => {
  return (
    <GlobalNavigationBarWrapper>
      <h1>Todo</h1>
    </GlobalNavigationBarWrapper>
  )
}

export default GlobalNavigationBar

export const GlobalNavigationBarWrapper = styled.div`
  width: calc(100% - 100px);
  height: 60px;
  padding: 0 30px;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 100px;
  border-bottom: 1px solid #e1e0dd;
`
