import React, { useState, useEffect, createContext, useCallback} from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';


const DarkBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export default function useDarkenBackground (Child, props) {
  const [show, setShow] = useState(false);
  const close = useCallback(() => setShow(false), []);
  const { Provider: DarkBackgroundProvider, Consumer: DarkBackgroundConsumer } = createContext({show, close});

  const Provider = (Background) => ({children}) => {
    return (
     <DarkBackgroundProvider value={{show, close}}>
       {children}

       {createPortal((
         <div className="dark-background__container">
           <DarkBackgroundConsumer>
             {({show, close}) => show && (
               <Background>
                 <Child
                   close={close}
                   {...props}/>
               </Background>
             )}
           </DarkBackgroundConsumer>
         </div>
       ), document.body)}
     </DarkBackgroundProvider>
    )
  };



  return [setShow, Provider(DarkBackground)];
}