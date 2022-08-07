import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../tomb-finance';

const useResetCollecFlg  = (bank: Bank) => {
  const tombFinance = useTombFinance();

  const handleResetCollectFlg = tombFinance.ResetCollectFlg();

  return { onResetCollectFlg: handleResetCollectFlg };
};

export default useResetCollecFlg
;
