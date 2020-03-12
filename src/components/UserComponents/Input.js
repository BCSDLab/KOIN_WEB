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
    color: #bec9d5;
  }

  &:disabled {
    background-color: #e5eaf0;
    border: 1px solid #d2dae2;
    color: #b5c1cd;
  }
  @media (max-width: 576px) {
    width: 320px;
    height: 36px;
    padding-left: 16px;

    &::placeholder {
      font-size: 14px;
    }
  }
`;

export default React.memo(function Input({
  type,
  name,
  value,
  placeholder,
  autoFocus,
  autoComplete,
  onChange,
  disabled,
  width,
  ref,
  style
}) {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      onChange={onChange}
      disabled={disabled}
      width={width}
      ref={ref}
      style={style}
    />
  )
})