import { useEffect, useState, useRef } from 'react';

import lottie, { AnimationItem, AnimationSegment } from 'lottie-web';

import { LottieContainerConfig } from './Lottie-Container.model';
import './Lottie-Container.scss';

enum LottieAnimationDirection {
  FORWARD = 1,
  REVERSE = -1,
}

function LottieContainer(config: LottieContainerConfig) {
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(true);
  const [frameStart, setFrameStart] = useState(0);
  const [frameEnd, setFrameEnd] = useState(0);
  const [loop, setLoop] = useState(false);
  const [direction, setDirection] = useState(1);
  const [frames, setFrames] = useState(new Map<string, number>());
  const [aniRef, setAniRef] = useState<AnimationItem>();

  const segments: AnimationSegment = [frameStart, frameEnd];
  const lottieAnimationDivRef = useRef<HTMLDivElement>(null);

  const play = () => {
    if (!!aniRef) {
      console.log('PLAY', segments, { frameStart }, { frameEnd });
      //aniRef.playSegments(segments, true);
      if (direction === LottieAnimationDirection.FORWARD) {
        aniRef.playSegments(segments, true);
      } else {
        //const segs = [frameEnd, frameStart];
        aniRef.playSegments(segments, true);
      }
    }
  };

  const handleEventComplete = (aniRef: AnimationItem) => {
    const hoverSegs: AnimationSegment = [config.loopStart, config.loopEnd];
    const openSegs: AnimationSegment = [config.introStart, config.introEnd];
    const closeSegs: AnimationSegment = [config.introEnd, config.introStart];

    console.log('COMPLETE ' + config.id, direction, hoverSegs, aniRef);
    if (direction === LottieAnimationDirection.FORWARD) {
      setLoop(true);
      setDirection(LottieAnimationDirection.REVERSE);
      aniRef?.playSegments(hoverSegs);
      console.log('HOVER', {direction}, {loop});
    } else {
      setLoop(false);
      setDirection(LottieAnimationDirection.FORWARD);
      aniRef.playSegments(closeSegs);
      console.log('RESET', {direction}, {loop});
    }
  }
  const handleEventLoopComplete = (aniRef: AnimationItem) => {
    console.log('LOOP COMPLETE ' + config.id);
  }
  const handleEventSegmentStart = (aniRef: AnimationItem) => {
    console.log('SEGMENT START ' + config.id);
  }

  useEffect(() => {
    setFrameStart(config.introStart);
    setFrameEnd(config.introEnd);
    if (!!lottieAnimationDivRef.current) {
      const lottieAnimation = lottie.loadAnimation({
        animationData: config.animationData,
        container: lottieAnimationDivRef.current!,
        loop: loop,
        // rendererSettings: {
        //   viewBoxSize: '0 0 200 200'
        // },
        autoplay: false,
      });
      setAniRef(lottieAnimation);

      lottieAnimation.addEventListener('complete', () => { handleEventComplete(lottieAnimation); });
      lottieAnimation.addEventListener('loopComplete', () => { handleEventLoopComplete(lottieAnimation); });
      lottieAnimation.addEventListener('segmentStart', () => { handleEventSegmentStart(lottieAnimation); });

      // Return clean up function here to avoid multiple instances on screen
      return () => lottieAnimation.destroy();
    }
  }, [lottieAnimationDivRef]);

  return (
    <div>
      <div ref={lottieAnimationDivRef} className='lottie-container'>
        Lottie Container
      </div>
      <button onClick={() => play()}>Play</button>
    </div>
  )
}

export default LottieContainer;