import React, { useState } from 'react';
import styled from 'styled-components';

const StorePosterImage = styled.img`  
  max-width: 600px;
  max-height: 100%;
  cursor: pointer;
  position: fixed;
  margin: auto;
  
  @media (max-width: 576px) {
    & {
      max-width: calc(100% - 68px);
      max-height: calc(100% - 100px);
    }
  }
`;

const StorePosterArrowButton = styled.a`
  width: 60px;
  height: 60px;
  background-image: url(${props => 'https://static.koreatech.in/assets/img/' + props.type + '-arrow.png'});
  background-size: 24px 24px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: #252525;
  border-radius: 50%;
  box-sizing: border-box;
  position: fixed;
  top: calc((100vh - 60px) / 2);
  ${props => props.type === 'prev' ? 'left' : 'right'}: 50px;
  cursor: pointer;
  
  &:hover {
    background-color: #f7941e;
  }
  
  @media (max-width: 576px) {
    & {
      width: 24px;
      height: 24px;
      background-color: transparent;
      ${props => props.type === 'prev' ? 'left' : 'right'}: 10px;
      top: calc((100vh - 24px) / 2);
    }
    &:hover {
      background-color: transparent;
    }
  }
`;

const StorePosterCloseButton = styled.div`
  position: fixed;
  top: 33px;
  right: 62px;
  width: 33px;
  height: 41px;
  cursor: pointer;
  background-image: url('https://static.koreatech.in/assets/img/close.png');
  
  @media (max-width: 576px) {
    & {
      top: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
      background-size: 24px;
      background-color: transparent;
    }
    &:hover {
      background-color: transparent;
    }
  }
`;

export default function StorePoster ({
  image,
  selectedImage: initialImage,
  toggleDarkBackground
}) {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const selectedIndex = image.findIndex(value => value === selectedImage);

  return (
    <>
      {selectedIndex !== 0 && <StorePosterArrowButton type={'prev'} onClick={() => setSelectedImage(image[selectedIndex - 1])} />}
      {selectedIndex !== image.length - 1 && <StorePosterArrowButton type={'next'} onClick={() => setSelectedImage(image[selectedIndex + 1])} />}
      <StorePosterCloseButton onClick={toggleDarkBackground} />
      <StorePosterImage src={selectedImage} />
    </>
  )
}
