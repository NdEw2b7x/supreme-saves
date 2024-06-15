import { useSelector } from 'react-redux';
import { State, dispatch } from '../store';
import { changePage, everyPage } from '../slice/grobalSlice';

export default function Navigation() {
  const page = useSelector((state: State) => state.grobalSlice.page);
  let innerNav = [];
  for (const i of everyPage) {
    let isSelected: boolean = false;
    if (i === page) {
      isSelected = true;
    }
    innerNav.push(
      <div
        key={i}
        data-selected={isSelected}
        onClick={() => {
          dispatch(changePage(i));
        }}
      >
        <div className='nav_indicator'></div>
        <div>
          <span>{i}</span>
        </div>
      </div>
    );
  }
  return (
    <footer>
      <nav>{innerNav}</nav>
    </footer>
  );
}
