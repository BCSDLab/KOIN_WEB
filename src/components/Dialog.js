import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { darken, lighten } from "polished";

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
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  animation-duration: 0.25s;
  animation-timing-function: ease-out; // 처음에 빨랐다가 나중에 느려진다.
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  z-index: 200;
  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  height: 2.25rem;
  font-size: 1rem;
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;
  background: ${props => props.color};

  & + & {
    margin-left: 0.5rem;
  }

  &:hover {
    background: ${props => lighten(0.1, props.color)};
  }

  &:active {
    background: ${props => darken(0.1, props.color)};
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
  length
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  
  useEffect(() => {
    if(localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!localVisible && !animate) return null;
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        {length === 2 ? (
          <ButtonGroup>
            <Button color={"#175c8e"} onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button color={"#f7941e"} onClick={onCancel}>
              {cancelText}
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button color={"#175c8e"} onClick={onConfirm}>
              {confirmText}
            </Button>
          </ButtonGroup>
        )}
      </DialogBlock>
    </DarkBackground>
  );
}
