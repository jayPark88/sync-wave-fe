import React from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input<{ hasError?: boolean; fullWidth?: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  font-size: 1rem;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }
  
  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #dc3545;
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth,
  ...props
}) => {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput
        hasError={!!error}
        fullWidth={fullWidth}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}; 