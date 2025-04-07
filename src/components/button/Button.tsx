import { color, text } from '@/styles/color';
import { fonts } from '@/styles/typography';
import { TVariant } from '@/types/common';
import { HTMLAttributes, MouseEvent } from 'react';
import styled from 'styled-components';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  variant?: TVariant;
  width?: number;
  height?: number;
  size?: 'small' | 'medium';
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  className,
  disabled = false,
  variant = 'gray',
  width,
  height,
  size = 'medium',
  onClick,
  ...props
}: IButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };
  return (
    <ButtonRootWrapper
      $width={width}
      $height={height}
      disabled={disabled}
      className={[className, variant, size].join(' ')}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </ButtonRootWrapper>
  );
};

export default Button;

const ButtonRootWrapper = styled.button<{ $width?: number; $height?: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  border-radius: 8px;
  width: ${(props) => (props.$width ? `${props.$width}px` : '115px')};
  height: ${(props) => (props.$height ? `${props.$height}px` : '48px')};
  border: none;
  white-space: nowrap;
  // size
  &.small {
    ${fonts['Small']}
    padding: 5px 10px 5px 10px;
  }
  &.medium {
    ${fonts['Caption']}
    padding: 13px 20px;
  }

  // variant
  &.primary {
    color: ${text['textWhite']};
    background: ${color['primary']};
    &:hover {
      background: #72a0fc;
    }
  }
  &.red {
    color: ${text['textWhite']};
    background: ${color['red']};
    &:hover {
      background: #f76643;
    }
  }
  &.gray {
    color: ${text['textSubtitle']};
    background: ${color['white']};
    border: 1px solid ${text['textSubtitle']};
    &:hover {
      background: #f7f7f7;
    }
  }
  &.lightGray {
    color: ${text['textSecondary']};
    background: ${color['lightGray']};
    &:hover {
      background: #f0f0f0;
    }
  }
  &.white {
    color: ${text['textBlack']};
    background: ${color['white']};
    border: 1px solid #000;
    &:hover {
      background: #f7f7f7;
    }
  }
  &.black {
    color: ${text['textWhite']};
    background: ${color['black']};
    &:hover {
      background: #383838;
    }
  }
`;
