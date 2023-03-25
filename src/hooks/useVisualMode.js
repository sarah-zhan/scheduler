import { useState } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) { setMode(setHistory(replace)); }
  function back() { setMode(history); }
  return { mode, transition, back };
}

export default useVisualMode;