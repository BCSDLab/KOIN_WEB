import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { darken } from "polished";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  z-index: 100;
  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: ${props => props.length === "long" ? '376px' : '325px'};
  height: ${props => props.length === "long" ? '182px' : '170px'};
  padding: ${props => props.length === "long" ? '21px 21px 15px 21px' : '21px 21px 12px 21px'};
  box-sizing: border-box;
  background: white;
  border-radius: 2px;
  animation-duration: 0.25s;
  animation-timing-function: ease-out; // 처음에 빨랐다가 나중에 느려진다.
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  box-shadow: 0 10px 19px 0 rgba(0, 0, 0, 0.26);
  position: relative;
  z-index: 200;
  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}

  h3 {
    margin: 0;
    font-family: NanumSquareEB;
    font-size: 19px;
    line-height: 1.13;
    text-align: left;
    color: #000000;
  }

  p {
    font-family: NanumSquareR;
    font-size: 15px;
    line-height: 1.25;
    text-align: left;
    color: #797979;
  }

  @media (max-width: 576px) {
    width: ${props => props.length === "long" ? '280px' : '325px'};
    height: ${props => props.length === "long" ? '272px' : '170px'};

    h3 {
      font-size: 20px;
    }

    p {
      line-height: 1.6;
    }
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 576px) {
    bottom: 16px;
    right: 16px;
  }
`;

const Button = styled.button`
  width: ${props => props.type === 'confirm' ? '61px' : '93px' };
  height: 36px;
  font-family: NanumSquareR;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 2px;
  color: ${props => props.color === "#f2f5f7" ? "#185180" : "#ffffff"};
  cursor: pointer;
  text-align: center;
  background: ${props => props.color};

  & + & {
    margin-left: 10px;
  }

  &:hover {
    font-weight: bold;
  }

  &:active {
    background: ${props => darken(0.1, props.color)};
    font-weight: bold;
  }

  @media (max-width: 576px) {
    width: ${props => props.type === 'confirm' ? '55px' : '89px' };
    font-size: 14px;
  }
`;

export default function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
  length,
  type,
  theme
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  const dialogRef = useRef();

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onConfirm();
    }
    if (e.key === '1' && onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
    if(localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock
        disappear={!visible}
        length={length}
        onKeyPress={handleKeyPress}
        tabIndex="0"
        ref={dialogRef}>
        <h3>{title}</h3>
        <p>{children}</p>
        {type === "confirm" ? (
          <ButtonGroup>
            <Button color={"#f2f5f7"} type={type} onClick={onCancel}>
              {cancelText}
            </Button>
            <Button color={"#175c8e"} type={type} onClick={onConfirm}>
              {confirmText}
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button color={"#185180"} onClick={onConfirm}>
              {confirmText}
            </Button>
          </ButtonGroup>
        )}
      </DialogBlock>
    </DarkBackground>
  );
}
