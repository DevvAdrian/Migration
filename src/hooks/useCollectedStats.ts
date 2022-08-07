import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useCollectedStats = () => {
  const [stat, setStat] = useState<String>();
  const { fastRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
        setStat(tombFinance.CollectedFlg);
  }, [setStat, tombFinance.CollectedFlg, fastRefresh]);


  return stat;
};

export default useCollectedStats;
