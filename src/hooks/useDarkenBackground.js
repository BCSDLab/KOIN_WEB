import React, { useState, useContext, createContext, useCallback} from 'react'
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';


const DarkBackground = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || css`rgba(0, 0, 0, 0.7)`};
  z-index: ${props => props.zIndex || 21};
  cursor: ${props => props.canClickBackground ? 'pointer' : 'default'};
`;

const DarkBackgroundContext = createContext();
const { Provider, Consumer} = DarkBackgroundContext;

function Background (props) {
  return <DarkBackground {...props} />
}

export const DarkBackgroundProvider = ({children}) => {
  const [show, setShow] = useState(false);
  const [zIndex, setZIndex] = useState(21);
  const [canClickBackground, setCanClickBackground] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(css`rgba(0, 0, 0, 0.7)`);
  const [ChildComponent, setChildComponent] = useState(() => {});
  const toggleDarkBackground = useCallback((value) => setShow(show => typeof value === 'boolean' ? value : !show), []);
  const changeChildComponent = (Component) => {
    setChildComponent(() => () => Component);
  };
  const configDarkBackground = ({zIndex, backgroundColor, canClickBackground}) => {
    setZIndex(zIndex || 21);
    setBackgroundColor(backgroundColor || css`rgba(0, 0, 0, 0.7)`);
    setCanClickBackground(!!canClickBackground);
  }

  return (
    <Provider value={{show, toggleDarkBackground, zIndex, backgroundColor, changeChildComponent, configDarkBackground, canClickBackground}}>
      {children}

      {createPortal((
        <div className="dark-background__container">
          <Consumer>
            {({show, zIndex, backgroundColor}) => show && (
              <Background
                zIndex={zIndex}
                backgroundColor={backgroundColor}
                canClickBackground={canClickBackground}
                onClick={canClickBackground ? toggleDarkBackground : () => {}}>
                <ChildComponent />
              </Background>
            )}
          </Consumer>
        </div>
      ), document.body)}
    </Provider>
  )
}

export const useDarkenBackground  = () => {
  const context = useContext(DarkBackgroundContext);

  return {
    changeChildComponent: context.changeChildComponent,
    configDarkBackground: context.configDarkBackground,
    toggleDarkBackground: context.toggleDarkBackground,
    isShowDarkBackground: context.show
  };
}