import { useEffect, useState, useRef } from 'react';

import lottie, { AnimationItem, AnimationSegment } from 'lottie-web';

import { LottieContainerConfig } from './Lottie-Container.model';
import './Lottie-Container.scss';

enum LottieAnimationDirection {
  FORWARD = 1,
  REVERSE = -1,
}
enum LottieAnimationState {  
  CLOSED,
  OPENING,
  HOVERING,
  CLOSING,
}
enum LottieAnimationPhase {
  OPEN,
  CLOSE,
  HOVER,
}

function LottieContainer(config: LottieContainerConfig) {
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(true);
  const [frameStart, setFrameStart] = useState(0);
  const [frameEnd, setFrameEnd] = useState(0);
  //const [loop, setLoop] = useState(false);
  const [aniDir, setAniDir] = useState(1 as LottieAnimationDirection);
  const [frames, setFrames] = useState(new Map<string, number>());
  const [aniRef, setAniRef] = useState<AnimationItem>();
  const [buttonText, setButtonText] = useState('Start');

  const [updateState, setUpdateState] = useState(false);

  const segments: AnimationSegment = [frameStart, frameEnd];
  const lottieAnimationDivRef = useRef<HTMLDivElement>(null);

  let animationState2: LottieAnimationState = LottieAnimationState.CLOSED;
  const [animationState, setAnimationState] = useState(LottieAnimationState.CLOSED);

  let animationPhase: LottieAnimationPhase = LottieAnimationPhase.OPEN;
  let animationDirection: LottieAnimationDirection = LottieAnimationDirection.FORWARD;
  let animationLoop: boolean = false;

  const openSegs: AnimationSegment = [config.introStart, config.introEnd];
  const closeSegs: AnimationSegment = [config.introEnd, config.introStart];
  const hoverSegs: AnimationSegment = [config.loopStart, config.loopEnd];
  

  const play = () => {
    if (!!aniRef) {
      //setFrameStart(config.introStart);
      //setFrameEnd(config.introEnd);
      console.log('PLAY');
      //aniRef.playSegments(segments, true);
      // if (aniDir === LottieAnimationDirection.FORWARD) {
      //   aniRef.playSegments(segments, true);
      // } else {
      //   const segs: AnimationSegment = [frameEnd, frameStart];
      //   aniRef.playSegments(segs, true);
      //   setLoop(false);
      // }



      if (animationState === LottieAnimationState.CLOSED) {        
        // if icon is currently closed, run the open animation segments and wait for complete event
        console.log('PLAY -> OPEN', {openSegs});
        animationState2 = LottieAnimationState.OPENING;
        setAnimationState(LottieAnimationState.OPENING);
        
      } else if (animationState === LottieAnimationState.HOVERING) {
        // if icon is currently open (hovering), run the close animation segments (without cancelling) and wait for complete event
        console.log('PLAY -> CLOSE', {closeSegs});
        setAnimationState(LottieAnimationState.CLOSING);
      } else {
        console.log('!!! PLAY CLICKED DURING ANIMATION');
      }
    }
  };


  useEffect(() => {
    console.log('ANIM STATE EFFECT:', {animationState});

    if (!!aniRef) {
      switch (animationState) {
        case LottieAnimationState.CLOSED: 
          console.log('+++ CLOSED');
          setButtonText('Start');
          break;
        case LottieAnimationState.CLOSING: 
          console.log('+++ CLOSING');
          aniRef.loop = false;
          aniRef.playSegments(closeSegs, true);
          setAnimationState(LottieAnimationState.CLOSED);
          break;
        case LottieAnimationState.HOVERING: 
          console.log('+++ HOVERING');
          aniRef.loop = true;
          aniRef.playSegments(hoverSegs, false);
          setButtonText('Stop');
          break;
        case LottieAnimationState.OPENING: 
          console.log('+++ OPENING');
          aniRef.loop = false;
          aniRef.playSegments(openSegs, true);
          setAnimationState(LottieAnimationState.HOVERING);
          break;
      }
    }
  }, [animationState, updateState]);




  const handleEventComplete = (aniRef: AnimationItem, state: LottieAnimationState) => {    
    // aniRef.setDirection(aniDir);

    console.log('COMPLETE ' + config.id, {state}, {animationState}, {animationState2}, {animationPhase}, {animationDirection}, {animationLoop});

    setUpdateState(!updateState);





    // if (animationState === LottieAnimationState.CLOSED) {
    //   console.log('GOTO HOVERING');
    //   // when opening animation is complete begin looping the hover animation
    //   animationState2 = LottieAnimationState.HOVERING;
    //   setAnimationState(LottieAnimationState.HOVERING);
    //   animationLoop = true;
    //   aniRef.loop = false;      
    // } else {
    //   console.log('GOTO CLOSED');
    //   aniRef.loop = true;
    // }





    //if (aniDir === LottieAnimationDirection.FORWARD) {
    // if (animationDirection === LottieAnimationDirection.FORWARD) {
    //   setLoop(true);
    //   setAniDir(LottieAnimationDirection.REVERSE);

      
    //   animationDirection = LottieAnimationDirection.REVERSE;
    //   animationLoop = true;


    //   aniRef?.playSegments(closeSegs);
    //   console.log('HOVER', {aniDir}, {loop});
    // } else {
    //   setLoop(false);
    //   setAniDir(LottieAnimationDirection.FORWARD);      


    //   animationDirection = LottieAnimationDirection.FORWARD;
    //   animationLoop = false;


    //   aniRef.playSegments(hoverSegs);
    //   aniRef.stop();
    //   console.log('RESET', {aniDir}, {loop});
    // }
  }
  const handleEventLoopComplete = (aniRef: AnimationItem) => {
    console.log('LOOP COMPLETE ' + config.id);
  }
  const handleEventSegmentStart = (aniRef: AnimationItem) => {
    // const newDir = aniDir * -1;
    // setAniDir(newDir);
    // console.log('SEGMENT START ' + config.id, {aniDir}, {newDir});
  }

  /**
   * Effect on Lottie containing <div> reference that runs when ref updates
   * - Loads animation JSON data
   * - Adds event listeners
   * - Prepares state for first open animation
   * @returns function to destroy Lottie animation (to prevent multiple instances on-screen)
   */ 
  useEffect(() => {
    // setFrameStart(config.introStart);
    // setFrameEnd(config.introEnd);
    
    if (!!lottieAnimationDivRef.current) {
      console.log('INITIALIZING LOTTIE');
      const lottieAnimation = lottie.loadAnimation({
        animationData: config.animationData,
        container: lottieAnimationDivRef.current!,
        loop: animationLoop,
        // rendererSettings: {
        //   viewBoxSize: '0 0 200 200'
        // },
        autoplay: false,
      });
      setAniRef(lottieAnimation);

      lottieAnimation.addEventListener('complete', () => { handleEventComplete(lottieAnimation, animationState); });
      lottieAnimation.addEventListener('loopComplete', () => { handleEventLoopComplete(lottieAnimation); });
      lottieAnimation.addEventListener('segmentStart', () => { handleEventSegmentStart(lottieAnimation); });

      // Return clean up function here to avoid multiple instances on screen
      return () => lottieAnimation.destroy();
    }
  }, [lottieAnimationDivRef]);

  return (
    <div className='root'>
      <div ref={lottieAnimationDivRef} className='lottie-container'>
        If you're seeing this your browser might not support Lottie
      </div>
      <button onClick={() => play()}>{buttonText}</button>
    </div>
  )
}

export default LottieContainer;