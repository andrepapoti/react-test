import { User } from 'models/user';
import './MyListItem.css';
import { MouseEvent, memo, useCallback, useRef } from 'react';

interface MyListProps {
  user: User;
  setUserActivity: (name: string, isActive: boolean) => void;
}

function MyListItem(props: MyListProps): JSX.Element {
  const { isActive, name, age, organization } = props.user;
  const { setUserActivity } = props;
  const className = `item`;

  const setActive = useCallback(() => {
    setUserActivity(name, true);
  }, [setUserActivity, name]);

  const setDisabled = useCallback(() => {
    setUserActivity(name, false);
  }, [setUserActivity, name]);

  return (
    <tr>
      <td className={`${className} icon`}>
        {isActive ? <>&#9989;</> : <>&#9940;</>}
      </td>
      <td className={className}>{name}</td>
      <td className={className}>{age}</td>
      <td className={className}>{organization}</td>
    </tr>
  );
}

export default memo(MyListItem);
