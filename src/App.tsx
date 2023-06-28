import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';
import { MyTimer } from './components/Timer';
import { usePrevious } from './hooks/usePrevious';
import MyButton from './components/MyButton';
import { useMyCallback } from './hooks/useMyCallback';

function App() {
  const [showTime, setShowTime] = useState(true);
  const previousShowTime = usePrevious(showTime);
  const btnContent = useMemo(() => <>show time</>, []);

  const changeShowTime = useMyCallback(() => {
    setShowTime((prevValue) => !prevValue);
  }, []);

  return (
    <div>
      {String(showTime)} / {String(previousShowTime)}
      <br />
      <MyButton onClick={changeShowTime}>{btnContent}</MyButton>
      {showTime && <MyTimer />}
    </div>
  );
}

export default App;
