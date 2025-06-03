import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #007bff;
        color: white;
        &:hover {
          background-color: #0056b3;
        }
      `;
    case 'secondary':
      return css`
        background-color: #6c757d;
        color: white;
        &:hover {
          background-color: #5a6268;
        }
      `;
    case 'danger':
      return css`
        background-color: #dc3545;
        color: white;
        &:hover {
          background-color: #c82333;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 0.5rem 1rem;
        font-size: 1.25rem;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => getVariantStyles(props.variant || 'primary')}
  ${props => getSizeStyles(props.size || 'medium')}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? '로딩 중...' : children}
    </StyledButton>
  );
}; 