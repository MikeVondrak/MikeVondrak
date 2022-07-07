//import { PlayerEvents } from '@lottiefiles/lottie-player';
import React, { LegacyRef, MouseEventHandler, useRef, useState } from 'react';

//import Lottie, { EventListener, LottieProps, Options } from 'react-lottie';
import { Player, PlayerDirection, Controls, PlayerEvent } from '@lottiefiles/react-lottie-player';
//import Lottie from 'react-lottie-player';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight'



import './App.scss';
import logo from './assets/images/mv_logo.svg';
import emailAnimation from './assets/lottie/email_segments.sifz.json'

function App() {
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(true);
  const [frameStart, setFrameStart] = useState(0);
  const [frameEnd, setFrameEnd] = useState(0);
  const [loop, setLoop] = useState(false);
  const [direction, setDirection] = useState(1 as PlayerDirection);
  const [frames, setFrames] = useState(new Map<string, number>());
  const [buttonText, setButtonText] = useState('Open');
  const segments = [frameStart, frameEnd];

  frames.set('openStart', 0);
  frames.set('openEnd', 42);
  frames.set('hoverStart', 60);
  frames.set('hoverEnd', 180);

  let completeCallback = (ref: React.RefObject<Player>) => {
    let newDirection = direction > 0 ? -1 as PlayerDirection : 1 as PlayerDirection;
    console.log('***** COMPLETE', {direction}, {newDirection});
    setDirection(newDirection);
    if (ref && ref.current) {

    }
  }

  const playLottie = (ref: React.RefObject<Player>) => {
    console.log('PLAY: ', ref?.current?.props?.speed, ref?.current?.props?.direction);
    if (ref && ref.current) {
      ref.current.setPlayerDirection(direction);
      ref.current.setSeeker(direction > 0 ? 0 : 42, true);
      ref.current.play();
    }

    setButtonText(direction < 0 ? 'Open' : 'Close');
  };

  const handleEvent = (event: PlayerEvent, ref: React.RefObject<Player>) => {
    if (event !== 'frame') {
      console.log({event});
    }
    switch(event) {
      case PlayerEvent.Complete: completeCallback(ref); break;
    }
    
  };

  const playerRef: React.RefObject<Player> = React.createRef();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div className="animated-link-container">
        
          {/* <Player
            ref={playerRef}
            src={emailAnimation}
            renderer
            keepLastFrame={true}
            style={{ width: '120px', height: '148px' }}
            direction={direction}
            speed={1}
            loop={loop}
            onEvent={(event) => handleEvent(event, playerRef)}
          /> */}
          
          <Lottie 
            animationData={emailAnimation}
            play
            loop
            style={{ width: '120px', height: '148px' }}
          />

        </div>
        
        <button onClick={(event) => playLottie(playerRef) }>{buttonText}</button>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
