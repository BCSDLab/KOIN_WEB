import { useState, useLayoutEffect } from 'react';

export default function useMobileFlag() {
  const [mobileFlag, setMobileFlag] = useState(true);

  useLayoutEffect(() => {
    function updateSize () {
      setMobileFlag(window.innerWidth < 576)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize)
  }, []);

  return mobileFlag;
}