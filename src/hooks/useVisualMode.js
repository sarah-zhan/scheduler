import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(pre => [...pre.slice(0, pre.length - 1), newMode]); //if true, replace the previous mode
    } else {
      setHistory(pre => [...pre, newMode]); //if false, add new mode
    }
    setMode(newMode);
  }
  function back() {
    const pre = [...history];
    if (history.length > 1) {
      pre.pop(); //remove the last mode
    }
    setHistory(pre);
    setMode(pre[pre.length - 1]);

  }
  return { mode, transition, back };
}

export default useVisualMode;