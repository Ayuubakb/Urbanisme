import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Demands from './Pages/Demands';
import AddEmployee from './Pages/AddEmployee';
import OneDemand from './Pages/OneDemand';
import Affectations from './Pages/Affectations';
import OneAffectation from './Pages/OneAffectation';
import Reclamations from './Pages/Reclamations';
import MqademLayout from './Layouts/MqademLayout';
import CaidLayout from './Layouts/CaidLayout';
import DemandForm from './Pages/DemandForm';
import History from './Pages/History';
import ReclamationForm from './Pages/ReclamationForm';
import store from './stores';
import { Provider } from 'react-redux';
import Avancement from './Pages/Avancement';
import CitizenLayout from './Layouts/CitizenLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<CitizenLayout/>}>
            <Route path='/demand' element={<DemandForm/>}/>
            <Route path='/Reclamation' element={<ReclamationForm/>}/>
            <Route path='/suivie/:code' element={<Avancement/>}/>
            <Route index element={<LandingPage/>}/>
          </Route>
          <Route path='/Mqadem' element={<MqademLayout/>}>
            <Route path='Tasks' element={<Affectations/>}/>
            <Route path='Tasks/:id' element={<OneAffectation/>}/>
          </Route>
          <Route path='/Caid' element={<CaidLayout/>}>
            <Route path='Demands' element={<Demands/>}/>
            <Route path='Ressources' element={<AddEmployee/>}/>
            <Route path='History' element={<History/>}/>
            <Route path='Demands/:id' element={<OneDemand/>}/>
            <Route path='Reclamations' element={<Reclamations/>}/>
          </Route>
        </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
