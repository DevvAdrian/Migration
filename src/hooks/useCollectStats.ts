import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useCollectStats = () => {
  const [stat, setStat] = useState<String>();
  const { fastRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
        setStat(tombFinance.CollectFlg);
  }, [setStat, tombFinance.CollectFlg, fastRefresh]);


  return stat;
};

export default useCollectStats;
