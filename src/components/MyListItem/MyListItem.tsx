import { User } from 'models/user';
import './MyListItem.css';
import { MouseEvent, memo, useCallback, useRef } from 'react';

const sideButtonWidth = 70;
interface MyListProps {
  user: User;
  setUserActivity: (name: string, isActive: boolean) => void;
}

function MyListItem(props: MyListProps): JSX.Element {
  const { isActive, name, age, organization } = props.user;
  const { setUserActivity } = props;
  const inactivateButton = useRef<HTMLButtonElement>(null);
  const activateButton = useRef<HTMLButtonElement>(null);
  const lastClientX = useRef<number | undefined>();
  const className = `item`;

  const setActive = useCallback(() => {
    if (!activateButton.current) return;
    if (!inactivateButton.current) return;

    activateButton.current.style.flexBasis = '0px';
    inactivateButton.current.style.flexBasis = '0px';
    setUserActivity(name, true);
  }, [setUserActivity, name]);

  const setInactive = useCallback(() => {
    if (!activateButton.current) return;
    if (!inactivateButton.current) return;

    activateButton.current.style.flexBasis = '0px';
    inactivateButton.current.style.flexBasis = '0px';
    setUserActivity(name, false);
  }, [setUserActivity, name]);

  const onDragStart = (e: MouseEvent) => {
    lastClientX.current = e.clientX;
  };

  const onDragEnd = (e: MouseEvent) => {
    if (!activateButton.current) return;
    if (!inactivateButton.current) return;

    const activateStyle = activateButton.current.style;
    const inactivateStyle = inactivateButton.current.style;

    const activateWidth = Number(activateStyle.flexBasis.replace('px', ''));
    const inactivateWidth = Number(inactivateStyle.flexBasis.replace('px', ''));

    if (activateWidth / sideButtonWidth > 0.7)
      activateStyle.flexBasis = `${sideButtonWidth}px`;
    else activateStyle.flexBasis = '0px';

    if (inactivateWidth / sideButtonWidth > 0.7)
      inactivateStyle.flexBasis = `${sideButtonWidth}px`;
    else inactivateStyle.flexBasis = '0px';

    lastClientX.current = undefined;
  };

  const onDrag = (e: MouseEvent) => {
    if (!activateButton.current) return;
    if (!inactivateButton.current) return;
    if (!lastClientX.current) return;
    if (!e.clientX) return;

    let delta = e.clientX - lastClientX.current;
    const activateStyle = activateButton.current.style;
    const inactivateStyle = inactivateButton.current.style;

    const activateWidth = Number(activateStyle.flexBasis.replace('px', ''));
    const inactivateWidth = Number(inactivateStyle.flexBasis.replace('px', ''));

    if (delta > 0) {
      if (activateWidth > 0)
        activateStyle.flexBasis = `${Math.max(activateWidth - delta, 0)}px`;
      else
        inactivateStyle.flexBasis = `${Math.min(
          inactivateWidth + delta,
          sideButtonWidth
        )}px`;
    } else {
      if (inactivateWidth > 0)
        inactivateStyle.flexBasis = `${Math.max(inactivateWidth + delta, 0)}px`;
      else
        activateStyle.flexBasis = `${Math.min(
          activateWidth - delta,
          sideButtonWidth
        )}px`;
    }

    lastClientX.current = e.clientX;
  };

  return (
    <tr onMouseDown={onDragStart} onMouseMove={onDrag} onMouseUp={onDragEnd}>
      <td className={className}>
        <div className="button-div">
          <button ref={inactivateButton} onClick={setInactive}>
            Disable
          </button>
          <div className="icon">{isActive ? <>&#9989;</> : <>&#9940;</>}</div>
        </div>
      </td>
      <td className={className}>{name}</td>
      <td className={className}>{age}</td>
      <td className={className}>
        <div className="button-div">
          <div className="icon">{organization}</div>
          <button ref={activateButton} onClick={setActive}>
            Activate
          </button>
        </div>
      </td>
    </tr>
  );
}

export default memo(MyListItem);
