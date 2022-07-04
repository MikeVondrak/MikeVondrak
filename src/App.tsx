//import { PlayerEvents } from '@lottiefiles/lottie-player';
import React, { LegacyRef, MouseEventHandler, useRef, useState } from 'react';

//import Lottie from 'react-lottie-player';
//import Lottie, { EventListener, LottieProps, Options } from 'react-lottie';
import { Player, PlayerDirection, Controls, PlayerEvent } from '@lottiefiles/react-lottie-player';


import './App.scss';
import logo from './assets/images/mv_logo.svg';
import emailAnimation from './assets/lottie/email.sifz.json'

function App() {
  //const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(true);
  const [animationPosition, setAnimationPosition] = useState(0);
  const [direction, setDirection] = useState(1 as PlayerDirection);

  let completeCallback = (ref: React.RefObject<Player>) => {
    let newDirection = direction > 0 ? -1 as PlayerDirection : 1 as PlayerDirection;
    console.log('***** COMPLETE', {direction}, {newDirection});
    setDirection(newDirection);
    if (ref && ref.current) {
      //ref.current.setPlayerSpeed(direction);
      //ref.current.setPlayerDirection(direction);
    }
  }

  const playLottie = (ref: React.RefObject<Player>) => {
    // setStop(false);
    // setPause(false);
    console.log('PLAY: ', ref?.current?.props?.speed, ref?.current?.props?.direction);
    if (ref && ref.current) {
      //ref.current.stop();
      //ref.current.setPlayerSpeed(direction);
      ref.current.setPlayerDirection(direction);
      ref.current.setSeeker(direction > 0 ? 0 : 42, true);
      ref.current.play();
    }
  };

  const handleEvent = (event: PlayerEvent, ref: React.RefObject<Player>) => {
    console.log({event});
    switch(event) {
      case PlayerEvent.Complete: completeCallback(ref); break;
    }
    
  };

  const playerRef: React.RefObject<Player> = React.createRef();
  const playerDirection: PlayerDirection = 1;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Player
          ref={playerRef}
          src={emailAnimation}
          keepLastFrame={true}
          style={{ width: '120px', height: '200px' }}
          direction={direction}
          speed={1}
          onEvent={(event) => handleEvent(event, playerRef)}
        />
        <button onClick={(event) => playLottie(playerRef) }>Play</button>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
