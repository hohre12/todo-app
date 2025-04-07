import styled from 'styled-components'
import Logo from '@/assets/png/logo.png'

const SideNavigationBar = () => {
  return (
    <SideNavigationBarWrapper>
      <LogoWrapper>
        <img src={Logo} />
      </LogoWrapper>
      <SideMenuWrapper>
        <li>TODO</li>
      </SideMenuWrapper>
    </SideNavigationBarWrapper>
  )
}

export default SideNavigationBar

const SideNavigationBarWrapper = styled.div`
  width: 100px;
  height: 100vh;
  background: #fff;
  color: #000;
  border-right: 1px solid #e1e0dd;
`
const LogoWrapper = styled.div`
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const SideMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgb(225, 224, 221);
    padding: 15px;
    cursor: pointer;
  }
`
