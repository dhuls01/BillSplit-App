import service from './service';
import { getHeadersWithAuth } from './auth';

// Get groups
const getUserInfo = async (id) => {
  const config = {
    method: 'get',
    url: '/userInfo',
    headers: getHeadersWithAuth(),
  };
  try {
    const {
      data: { userInfo },
    } = await service.request(config);
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};

export { getUserInfo };
