// App.jsx
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './compenent/Homepage/homepage.jsx';
import './compenent/Homepage/Homepage.css';
import Register from "./compenent/Register/register.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path={'/user/register'} element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
