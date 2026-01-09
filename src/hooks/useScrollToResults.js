import { useEffect, useRef } from 'react';

const useScrollToResults = (ref, trigger) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    
    if (ref.current) {
      const timer = setTimeout(() => {
         ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [ref, trigger]);
};

export default useScrollToResults;
