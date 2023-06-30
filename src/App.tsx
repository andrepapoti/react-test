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
import UserData from './mock/userdata';
import MyList, { MyListProps } from './components/MyList/MyList';

function App() {
  const [showTime, setShowTime] = useState(true);
  const previousShowTime = usePrevious(showTime);
  const btnContent = useMemo(() => <>show time</>, []);
  const [listData, setListData] = useState<MyListProps>({
    data: undefined,
    loading: true,
    error: undefined,
  });

  const changeShowTime = useMyCallback(() => {
    setShowTime((prevValue) => !prevValue);
  }, []);

  useEffect(() => {
    // Fake fetching
    const timeout = setTimeout(() => {
      setListData({ data: UserData, loading: false, error: undefined });
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="app-root">
      {String(showTime)} / {String(previousShowTime)}
      <MyButton onClick={changeShowTime}>{btnContent}</MyButton>
      {showTime && <MyTimer />}
      <MyList {...listData} />
    </div>
  );
}

export default App;
