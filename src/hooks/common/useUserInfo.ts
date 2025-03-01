import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import useStorage, { STORAGE_KEYS } from './useStorage';

type TokenClaims = {
  id: string;
  exp: number;
};

type UserInfo = {
  id: number;
  exp: number;
};

const useUserInfo = () => {
  const { getValue: getAccessToken } = useStorage(
    STORAGE_KEYS.ACCESS_TOKEN,
    null,
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setUserInfo(null);
      return;
    }

    try {
      const decoded = jwtDecode<TokenClaims>(accessToken);
      console.log('decoded', decoded);
      setUserInfo({ ...decoded, id: parseInt(decoded.id) });
    } catch (e) {
      setUserInfo(null);
    }
  }, [getAccessToken]);

  return { userInfo };
};

export default useUserInfo;
