import { useCallback/*, useEffect, useMemo*/ } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useMigrate = () => {
  const tombFinance = useTombFinance();


  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleMigrate = useCallback(
    (oldAmount: string) => {
      handleTransactionReceipt(
        tombFinance.migrate(oldAmount),
        `Migrate ${oldAmount} Old DGTL To New Ones `,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );

  return { onMigrate: handleMigrate };
};

export default useMigrate;
