import FlagBackgroundImgSrcs from '../games/constants/FlagBackgroundImgSrcs';
const PickFlagBackgroundImgSrcOne = (seed: number = 0): string => {
  const modNumber = FlagBackgroundImgSrcs.length;
  const imgNumber = seed % modNumber;
  return FlagBackgroundImgSrcs[imgNumber];
};

export { PickFlagBackgroundImgSrcOne };
