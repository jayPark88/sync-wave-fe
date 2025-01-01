import logo from './assets/logo.svg';
import './styles/App.css';

function App() {
  const hello ="Welcome reactJs world Parker-pen~! 😎"
  const element = <h1>{hello}</h1>
  return (
    <div>
      {element}
    </div>
  );
}

export default App;
