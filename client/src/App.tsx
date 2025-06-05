
import './App.css'
import { RouteProvider } from './context/RouterContext';
import Router from './Router';

function App() {
  return (
    <RouteProvider>
      <Router />
    </RouteProvider>
  )
}

export default App
