import * as T from '../games/types';

const getTodaysYMD = () => {
  const today = new Date();
  const year = today.getFullYear().toString().padStart(4, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');

  return { year, month, date };
};

const getMoonShapeByLunaAge = (lunAge: number): keyof T.Moon => {
  if (lunAge < 3 || 27 < lunAge) return 'newMoon'; // 초하루
  if (lunAge < 7) return 'waxingCrescent'; // 초승
  if (lunAge < 10) return 'firstQuarter'; // 상현
  if (lunAge < 14) return 'waxingGibbous'; // 상현 -> 보름
  if (lunAge < 16) return 'fullMoon'; // 보름
  if (lunAge < 19) return 'waningGibbous'; // 보름 -> 하현
  if (lunAge < 23) return 'thirdQuarter'; // 하현
  if (lunAge <= 27) return 'waningCrescent'; // 그믐
  return 'newMoon';
};

const DateCalculation = { getTodaysYMD, getMoonShapeByLunaAge };

export default DateCalculation;
