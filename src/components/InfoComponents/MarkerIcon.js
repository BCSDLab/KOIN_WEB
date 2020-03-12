import React from 'react'
import styled, { keyframes } from 'styled-components';

const Pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1.0;
  }
  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`;

const Bounce = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2000px) rotate(-45deg);
  }
  60% {
    opacity: 1;
    transform: translateY(30px) rotate(-45deg);
  }
  80% {
    transform: translateY(-10px) rotate(-45deg);
  }
  100% {
    transform: translateY(0) rotate(-45deg);
  }
`;

const StyledMarker = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50% 50% 50% 0;
  background: linear-gradient(90deg, #175c8e 0%, #f7941e 100%);
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -15px 0 0 -17px;
  animation-name: ${Bounce};
  animation-fill-mode: both;
  animation-duration: 1s;
  border: 4px solid transparent;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;

  &::after {
    content: '';
    width: 11px;
    height: 11px;
    margin: 3px 0 0 2px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
    left: 0;
  }
`;


const Pulse = styled.div`
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  transform: rotateX(55deg);
  z-index: -2;

  &:after {
    display: none;
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: ${Pulsate} 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0.0;
    box-shadow: 0 0 1px 2px #89849b;
    animation-delay: 0s;
    left: 0;
  }
`;

const MarkerWrapper = styled.div`
  width: auto;
  height: auto;

  &:hover > ${Pulse} {
    &:after {
      display: block;
    }
  }
`;

export default function MarkerIcon() {
  return (
    <MarkerWrapper>
      <StyledMarker></StyledMarker>
      <Pulse></Pulse>
    </MarkerWrapper>
  )
}
