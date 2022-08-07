import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { UserInfo } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useUserInfo = () => {
  const [value, setValue] = useState<UserInfo>();
  const tombFinance = useTombFinance();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        setValue(await tombFinance.getUserInfo());
      } catch(err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, [setValue, fastRefresh, tombFinance]);

  return value;
};

export default useUserInfo;
