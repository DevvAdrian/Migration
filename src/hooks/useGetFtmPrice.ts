import { useCallback, useEffect, useState } from 'react';

// import { BigNumber, utils } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useGetFtmPrice = () => {
  const [balance, setBalance] = useState('0');
  const tombFinance = useTombFinance();

  const fetchBalance = useCallback(async () => {
    const balance = await tombFinance.getWBNBPriceFromPancakeswap();
    setBalance(balance);
  }, [tombFinance]);

  useEffect(() => {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
  }, [setBalance, tombFinance, fetchBalance]);

  return Number(balance);
};

export default useGetFtmPrice;
