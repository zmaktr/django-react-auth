import './App.css';

import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route element={<HomePage/>} path='/' exact />
        <Route element={<LoginPage/>} path='/login' />
      </Routes>
    </div>
  );
}

export default App;
