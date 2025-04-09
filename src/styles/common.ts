import styled from 'styled-components'
import { fonts } from './typography'
import { text } from './color'

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px);
  .loading {
    width: 48px;
    height: 48px;
    border: 5px solid #eee;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
`

export const Required = styled.p`
  display: inline-block;
  color: #ff3b31;
`

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px);
  .error {
    ${fonts['Caption']}
    color: ${text['textSecondary']};
  }
`

export const NoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto;
  align-items: center;
  justify-content: center;
  padding: 120px;
  & > span {
    ${fonts['Caption']}
    color: ${text['textSecondary']};
  }
`
