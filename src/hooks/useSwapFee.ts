import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import useRefresh from './useRefresh';

const useSwapFee = () => {
  const [swapFee, setSwapFee] = useState('');
  const tombFinance = useTombFinance();
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchSwapFee() {
      try {
        setSwapFee(await tombFinance.getSwapFee());
      } catch(err) {
        console.error(err);
      }
    }
    fetchSwapFee();
  }, [setSwapFee, slowRefresh, tombFinance]);

  return swapFee;
};

export default useSwapFee;
