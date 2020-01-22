import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${props => props.width ? `${props.width}px` : '390px' };
  height: 45px;
  box-sizing: border-box;
  border: #d2dae2 1px solid;
  font-size: 15px;
  padding-left: 20px;
  margin-bottom: 12px;

  &::placeholder {
    font-size: 15px;
    letter-spacing: -0.8px;
    padding-left: 0;
    color: #bec9d5;
  }

  &:disabled {
    background-color: #e5eaf0;
    border: 1px solid #d2dae2;
    color: #b5c1cd;
  }
  
  @media (max-width: 576px) {
    width: calc(100% - 40px);
    height: 32px;
  }
`;

export default function Input({
  type,
  name,
  value,
  placeholder,
  autoComplete,
  onChange,
  disabled,
  width,
  ref
}) {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      disabled={disabled}
      width={width}
      ref={ref}
    />
  )
}
