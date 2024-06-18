import Contents from './components/Contents';
import Navigation from './components/Navigation';
import Empty from './Empty';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Contents />
      <Empty />
      <Navigation />
    </Provider>
  );
}
