import { User } from 'models/user';
import './MyListItem.css';

interface MyListProps {
  user: User;
}

export function MyListItem(props: MyListProps): JSX.Element {
  const { isActive, name, age, organization } = props.user;
  const className = `item`;

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
