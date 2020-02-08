import React, { useEffect, useRef }from 'react'

function useOutsideClickHandler (ref, onOutsideClick) {
  function handleClickOutside (e) {
    if (ref.current && !ref.current.contains(e.target)) {
      onOutsideClick();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });
}

export default function OutsideClickHandler({
  children,
  Container,
  onOutsideClick,
  dropdown
}) {
  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef, onOutsideClick);
  return (
    <Container
      ref={wrapperRef}
      dropdown={dropdown}>
      {children}
    </Container>
  )
}
