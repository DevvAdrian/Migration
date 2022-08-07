import { useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../state/transactions/hooks';
import { useAddPopup } from '../state/application/hooks';
import useTombFinance from './useTombFinance';

function useHandleTransactionReceipt(): (promise: Promise<TransactionResponse>, summary: string) => void {
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const tombFinance = useTombFinance();

  return useCallback(
    (promise: Promise<TransactionResponse>, summary: string) => {
      promise
        .then((tx) => {
          addTransaction(tx, { summary })
          console.log('debug_tx', tx)
        })
        .catch((err) => {
          tombFinance.TsFailFlg = true;
          console.log('debug_err', err)
          if (err.message.includes('User denied')) {
            // User denied transaction signature on MetaMask.
            return;
          }
          const message = `Unable to ${summary[0].toLowerCase()}${summary.slice(1)}`;
          console.error(`${message}: ${err.message || err.stack}`);
          addPopup({ error: { message, stack: err.message || err.stack } });
        });
    },
    [addPopup, addTransaction],
  );
}

export default useHandleTransactionReceipt;
