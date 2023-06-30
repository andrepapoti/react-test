import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [listData, setListData] = useState<
    Omit<MyListProps, 'setUserActivity'>
  >({
    data: undefined,
    loading: true,
    error: undefined,
  });

  const setUserActivity = useCallback((name: string, isActive: boolean) => {
    setListData((prevState) => {
      if (!prevState.data) return prevState;

      const index = prevState.data.findIndex((user) => user.name === name);
      if (index === -1) return prevState;

      const newData = [...prevState.data];
      newData[index] = {
        ...newData[index],
        isActive,
      };
      return { ...prevState, data: newData };
    });
  }, []);

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
      <MyList {...listData} setUserActivity={setUserActivity} />
    </div>
  );
}

export default App;
