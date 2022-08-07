import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useTotalMigrated = () => {
  const [value, setValue] = useState('0');
  const tombFinance = useTombFinance();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    async function fetchTotalMigrated() {
      try {
        setValue(await tombFinance.getTotalMigrated());
      } catch(err) {
        console.error(err);
      }
    }

    fetchTotalMigrated();
  }, [setValue, fastRefresh, tombFinance]);

  return value;
};

export default useTotalMigrated;
