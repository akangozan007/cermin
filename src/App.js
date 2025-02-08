import React, { useState } from 'react';
import './App.css';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  // State dikelola di App.js agar bisa digunakan oleh banyak komponen
  const [powerON, setPowerOn] = useState("off");

  return (
    <div className='App'>
      {/* Meneruskan state dan updater ke Header */}
      <Header powerON={powerON} setPowerOn={setPowerOn} /> 
      {/* Meneruskan state ke Home */}
      <Home powerON={powerON} />
      <Footer />
    </div>
  );
}

export default App;
