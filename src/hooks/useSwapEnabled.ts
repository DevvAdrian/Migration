import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useSwapEnabled = () => {
  const [value, setValue] = useState(false);
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchSwapStatus() {
      try {
        setValue(await tombFinance.getSwapStatus());
      } catch(err) {
        console.error(err);
      }
    }

    fetchSwapStatus();
  }, [setValue, slowRefresh, tombFinance]);

  return value;
};

export default useSwapEnabled;
