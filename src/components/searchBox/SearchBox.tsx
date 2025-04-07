import { KeyboardEvent, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { SvgIcon } from '../svgIcon/SvgIcon'
import Input from '../input/Input'
import { color } from '@/styles/color'

type TSearchBoxProps = {
  className?: string
  value: string
  placeholder?: string
  onTextChange?: (value: string) => void
  onKeyDown?: (value: string) => void
  onRemoveClick?: () => void
  onRecentClick?: (value: string) => void
}

const SearchBox = ({
  className,
  value,
  placeholder,
  onTextChange,
  onKeyDown,
  onRemoveClick,
}: TSearchBoxProps) => {
  const searchBoxRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (value && onKeyDown) {
          onKeyDown(value)
        }
      }
    },
    [onKeyDown, value]
  )

  return (
    <SearchBoxRootWrapper className={className} ref={searchBoxRef}>
      <SvgIcon iconName="icon-search" alt="search" />
      <Input
        value={value}
        onTextChange={onTextChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onRemoveClick={onRemoveClick}
      />
    </SearchBoxRootWrapper>
  )
}

export default SearchBox

const SearchBoxRootWrapper = styled.div`
  width: 480px;
  height: 50px;
  padding: 10px;
  border-radius: 24px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: ${color['lightGray']};
  position: relative;
`
