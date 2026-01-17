import { BrowserRouter } from 'react-router-dom';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <BrowserRouter>
      <AppNavigator />
    </BrowserRouter>
  );
}

export default App;
