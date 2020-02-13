import React, { useState, useEffect, createContext, useCallback} from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';


const DarkBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.7;
  z-index: 1;
`;

export default function useDarkenBackground (Child) {
  const [show, setShow] = useState(false);
  const { Provider: DarkBackgroundProvider, Consumer: DarkBackgroundConsumer } = createContext({show, setShow});

  const Provider = (Background) => ({children}) => {
    return (
     <DarkBackgroundProvider value={{show, setShow}}>
       {children}

       {createPortal((
         <div className="dark-background__container">
           <DarkBackgroundConsumer>
             {({show}) => show && (
               <Background>{show +''}</Background>
             )}
           </DarkBackgroundConsumer>
         </div>
       ), document.body)}
       {Child}
     </DarkBackgroundProvider>
    )
  };



  return [setShow, Provider(DarkBackground)];
}