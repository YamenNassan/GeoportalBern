import React, {useState} from 'react';
import ReMap from './ReMap';
import './App.css';
import PermanentDrawerLeft from './PermanentDrawerLeft';
import PermanentDrawerRight from './PermanentDrawerRight';
import DiscreteSlider from './DiscreteSlider';
import SpeedDial from './SpeedDial';
import LandingPage from './PopupFenster';



function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleDrawerOpen = () => {
    setIsVisible(!isVisible);
  };

 return (
    <div className="App">
      <ReMap />
    
    </div>
  );
}

export default App;


/*
function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleDrawerOpen = () => {
    setIsVisible(!isVisible);
  };

 return (
    <div className="App">
      <ReMap/>
      <div className="mobile-drawer">
        <PermanentDrawerRight variant="temporary" />
        <PermanentDrawerLeft variant="temporary" />
        <LandingPage />
      </div>
      <div className="desktop-drawer">
        <PermanentDrawerRight isVisible={isVisible}/>
        <PermanentDrawerLeft handleDrawerOpen={handleDrawerOpen}/>
        <LandingPage />
        <SpeedDial />
      </div>
    </div>
  );
}

export default App;
*/