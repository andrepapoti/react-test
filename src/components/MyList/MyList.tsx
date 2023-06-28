import { memo, useMemo } from 'react';
import { User } from 'models/user';
import { MyListItem } from 'components/MyListItem/MyListItem';
import './MyList.css';

export interface MyListProps {
  data?: User[];
  loading: boolean;
  error?: string;
}

function MyList(props: MyListProps): JSX.Element {
  const { data, loading, error } = props;
  const listItems = useMemo(() => {
    return data?.map((user) => {
      return <MyListItem key={user.name} user={user} />;
    });
  }, [data]);

  if (loading) return <> Loading </>;
  if (error) return <> Error: {error} </>;

  return (
    <table>
      <thead>
        <tr>
          <td className="header">Is Active</td>
          <td className="header">Name</td>
          <td className="header">Age</td>
          <td className="header">Organization</td>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
}

export default memo(MyList);
