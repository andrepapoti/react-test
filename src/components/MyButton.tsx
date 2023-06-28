import { ReactElement, memo } from 'react';

interface MyButtonProps {
  onClick: () => void;
  children: ReactElement;
}

function MyButton(props: MyButtonProps) {
  const { onClick, children } = props;
  console.log('render btn');
  return <button onClick={onClick}> {children} </button>;
}

export default memo(MyButton);
