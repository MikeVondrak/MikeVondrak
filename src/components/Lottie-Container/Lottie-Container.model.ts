export interface LottieContainerConfig {
  id: string, // ID to filter animation events
  animationData: any, // TODO: how to type imported JSON?
  introStart: number,
  introEnd: number,
  loopStart: number,
  loopEnd: number,
}

