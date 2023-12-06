import axios from 'axios';
import DateCalculation from '../../utils/DateCalculation';

const getTodaysLunaInfo = async () => {
  const today = DateCalculation.getTodaysYMD();
  try {
    const response = await axios.get(
      'https://apis.data.go.kr/B090041/openapi/service/LunPhInfoService/getLunPhInfo',
      {
        params: {
          serviceKey: process.env.NEST_PUBLIC_DATA_LUNA_KEY,
          solYear: today.year,
          solMonth: today.month,
          solDay: today.date,
        },
      },
    );
    return response.data.response.body.items.item;
  } catch (e) {
    throw new Error('서비스 제공에 문제가 있습니다.');
  }
};

export default getTodaysLunaInfo;
