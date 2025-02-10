import React, { useState } from 'react';
import './App.css';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const [powerON, setPowerOn] = useState("off");
  const [substanceTop, setSubstanceTop] = useState("Vacuum");
  const [substanceBottom, setSubstanceBottom] = useState("Vacuum");

  return (
    <div className='App'>
      <Header powerON={powerON} setPowerOn={setPowerOn} />
      <Home powerON={powerON} substanceTop={substanceTop} substanceBottom={substanceBottom} />
      <Footer setSubstanceTop={setSubstanceTop} setSubstanceBottom={setSubstanceBottom} />
    </div>
  );
}

export default App;
