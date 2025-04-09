import { HTMLAttributes, useEffect, useState } from 'react'

import IconEnabled from '@/assets/svg/icon-checkbox-enabled.svg'
import IconHover from '@/assets/svg/icon-checkbox-hover.svg'
import IconChecked from '@/assets/svg/icon-checkbox-checked-black.svg'
import IconCheckedDisabled from '@/assets/svg/icon-checkbox-checked-disabled.svg'
import iconDisabled from '@/assets/svg/icon-checkbox-disabled.svg'
import styled from 'styled-components'
import { fonts } from '@/styles/typography'

export type TCheckBoxValue = 'checked' | 'unchecked' | boolean

interface ICheckboxProps extends HTMLAttributes<HTMLDivElement> {
  value?: TCheckBoxValue | undefined
  disabled?: boolean | undefined
  onCheckedChange?: (v: TCheckBoxValue) => void
}

const Checkbox = ({
  value,
  onCheckedChange,
  disabled,
  children,
  ...props
}: ICheckboxProps) => {
  const [checked, setChecked] = useState<TCheckBoxValue>(false)
  const [hover, setHover] = useState<boolean>(false)
  const [icon, setIcon] = useState<string>(IconEnabled)

  useEffect(() => {
    if (checked != value && value != undefined) setChecked(value ?? false)
  }, [checked, value, setChecked])

  useEffect(() => {
    const getIcon = () => {
      if (checked == 'unchecked' || !checked) {
        if (disabled) return iconDisabled
        else if (hover) return IconHover
      } else if (checked == 'checked' || checked == true) {
        if (disabled) return IconCheckedDisabled
        else return IconChecked
      }
      return IconEnabled
    }
    setIcon(getIcon())
  }, [checked, disabled, hover])

  const onChecked = () => {
    let val = checked
    if (checked == 'unchecked') {
      val = 'checked'
    } else if (!checked) {
      val = true
    } else if (checked == 'checked') {
      val = 'unchecked'
    } else if (checked == true) {
      val = false
    }
    if (onCheckedChange) onCheckedChange(val)
    setChecked(val)
  }

  return (
    <CheckboxWrapper
      {...props}
      onClick={() => onChecked()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={icon} alt="checkbox" />
      <span>{children}</span>
    </CheckboxWrapper>
  )
}

export default Checkbox

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  span {
    ${fonts['Body2']}
    color: $text-neutral-primary;
  }
`
