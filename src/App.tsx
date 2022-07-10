//import { PlayerEvents } from '@lottiefiles/lottie-player';
import React, { LegacyRef, MouseEventHandler, useRef, useState } from 'react';

//import Lottie, { EventListener, LottieProps, Options } from 'react-lottie';
import { Player, PlayerDirection, Controls, PlayerEvent } from '@lottiefiles/react-lottie-player';
//import Lottie from 'react-lottie-player';
//import Lottie from 'react-lottie-player/dist/LottiePlayerLight'



import './App.scss';
import logo from './assets/images/mv_logo.svg';
import emailAnimationData from './assets/lottie/email_segments.sifz.json';
import portfolioAnimationData from './assets/lottie/portfolio_segments.sifz.json';
import aboutMeAnimationData from './assets/lottie/about_segments.sifz.json';
import LottieContainer from './components/Lottie-Container/Lottie-Container';

function App() {
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(true);
  const [frameStart, setFrameStart] = useState(0);
  const [frameEnd, setFrameEnd] = useState(0);
  const [loop, setLoop] = useState(false);
  const [direction, setDirection] = useState(1 as PlayerDirection);
  const [frames, setFrames] = useState(new Map<string, number>());
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div className="animated-links-container">
          <div className="animated-link">
            <div className="email-animation">
              <LottieContainer
                id={'EmailAnimation'}
                animationData={emailAnimationData}
                introStart={0}
                introEnd={90}
                loopStart={90}
                loopEnd={180}
              />
            </div>
          </div>
          <div className="animated-link">
            <div className="about-animation">
              <LottieContainer
                id={'AboutMeAnimation'}
                animationData={aboutMeAnimationData}
                introStart={0}
                introEnd={46}
                loopStart={47}
                loopEnd={180}
              />
            </div>
          </div>
          <div className="animated-link">
            <div className="portfolio-animation">
              <LottieContainer
                id={'PortfolioAnimation'}
                animationData={portfolioAnimationData}
                introStart={0}
                introEnd={62}
                loopStart={62}
                loopEnd={180}
              />
            </div>
          </div>
        </div>
      </main>      
      <footer>
      </footer>
    </div>
  );
}

export default App;
