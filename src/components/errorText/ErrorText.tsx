import { text } from '@/styles/color'
import { fonts } from '@/styles/typography'
import styled from 'styled-components'
import { SvgIcon } from '../svgIcon/SvgIcon'

type TErrorTextProps = {
  errorMessage: string
}

const ErrorText = ({ errorMessage }: TErrorTextProps) => {
  return (
    <ErrorTextWrapper>
      <SvgIcon iconName="icon-error" alt="error" />
      <span>{errorMessage}</span>
    </ErrorTextWrapper>
  )
}

export default ErrorText

const ErrorTextWrapper = styled.div`
  ${fonts['Small']}
  margin-top: 5px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
  color: ${text['textRed']};
`
