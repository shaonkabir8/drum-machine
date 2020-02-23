import React, { Fragment, useState, useEffect } from 'react';
import '../styles/App.scss';

const App = () => {
  
  
  const [power, setPower] = useState(true)
  const [displayMessage, setDisplayMessage] = useState("Adjust Volume");
  const [volume, setVolume]  = useState(0.3)
  

  // function to controll power
  const togglePower = (e) => {
    setPower(!power);
    
    // check if power is true or not!
    power ? e.target.style = 'float: left' : e.target.style = 'float: right';  
  }



  // function for playing sound on 'keydown' event
  const playSound = (e) => {
    // grab our audio elements
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    
    // check if audio exists or not!
    if (!audio) return;

    // If exists,
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }
  // TODO: 
  // This will be modified later while deploying on Netlify
  // set listener for window Object
  window.addEventListener('keydown', playSound);


  // functionalities to interact with after effects of playing Audio
  useEffect(() => {
    // grab all keys and convert them from [NodeList] to [Array] 
    // Loop through the array & add eventlistener for [transitonend] event
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', e => {
      if (e.propertyName !== 'transform') return;
      e.target.classList.remove('playing');
    }));
  }, [])


  // function for Volume Adjust
  const adjustVolume = (e) => {
    if (power) {
      setVolume(e.target.value);
      setDisplayMessage("Volume: " + Math.round(e.target.value * 100));

      // Clear Display message
      setTimeout(() => clearDisplay(), 1000);
    }
  }
  const clearDisplay = () => {
    setDisplayMessage("Adjust Volume")
  }


  return (
    <Fragment>
      <div className="drum-container">
        <div className="keys">
          <div data-key="81" className="key">
            <kbd>Q</kbd>
            <span className="sound">clap</span>
          </div>
          <div data-key="87" className="key">
            <kbd>W</kbd>
            <span className="sound">hihat</span>
          </div>
          <div data-key="69" className="key">
            <kbd>E</kbd>
            <span className="sound">kick</span>
          </div>
          <div data-key="65" className="key">
            <kbd>A</kbd>
            <span className="sound">openhat</span>
          </div>
          <div data-key="83" className="key">
            <kbd>S</kbd>
            <span className="sound">boom</span>
          </div>
          <div data-key="68" className="key">
            <kbd>D</kbd>
            <span className="sound">ride</span>
          </div>
          <div data-key="90" className="key">
            <kbd>Z</kbd>
            <span className="sound">snare</span>
          </div>
          <div data-key="88" className="key">
            <kbd>X</kbd>
            <span className="sound">tom</span>
          </div>
          <div data-key="67" className="key">
            <kbd>C</kbd>
            <span className="sound">tink</span>
          </div>
        </div>

        <div className="sidebar-controller">
          <div className="control">
            <p>Power</p>
            <div className="select">
              <div className="toggle-power" onClick={e => togglePower(e)} style={{'float': 'right'}}></div>
            </div>
          </div>
          <p id="display">
						{displayMessage}
					</p>
					<div className="volume-slider">
						<input type="range" min="0" max="1" step="0.01" value={volume} onChange={adjustVolume} />
					</div>
        </div>
      </div>

      <audio
        data-key="81"
        src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
      ></audio>
      <audio
        data-key="87"
        src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
      ></audio>
      <audio
        data-key="69"
        src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
      ></audio>
      <audio
        data-key="65"
        src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
      ></audio>
      <audio
        data-key="83"
        src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
      ></audio>
      <audio
        data-key="68"
        src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
      ></audio>
      <audio
        data-key="90"
        src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
      ></audio>
      <audio
        data-key="88"
        src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
      ></audio>
      <audio
        data-key="67"
        src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
      ></audio>
    </Fragment>
  );
}

export default App;