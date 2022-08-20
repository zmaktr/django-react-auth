import './App.css';

import { Route, Routes } from "react-router-dom";
import PrivateRoute from './utilities/PrivateRoute'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>

        {/* private routes*/}
        <Route element={<PrivateRoute/>}>
          <Route element={<HomePage/>} path='/' exact/>
        </Route>

        {/* public routes*/}
        <Route element={<LoginPage/>} path='/login' />
      
      </Routes>
    </div>
  );
}

export default App;
