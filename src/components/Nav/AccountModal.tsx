import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import { Button, Grid } from '@material-ui/core';
import Modal, { ModalProps } from '../Modal';
import { useWallet } from "use-wallet";
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const tombFinance = useTombFinance();

  const tombBalance = useTokenBalance(tombFinance.NEW);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance, 9, 2), [tombBalance]);

  const tshareBalance = useTokenBalance(tombFinance.OLD);
  const displayTshareBalance = useMemo(() => getDisplayBalance(tshareBalance, 10, 2), [tshareBalance]);

  const wallet = useWallet()

  return (
    <Modal>
      <Grid item xs={12} md={12} container style={{paddingBottom: '20px'}}>
        <Grid item xs={9} md={9} style={{fontSize: '20px'}}>My Wallet</Grid>
        <Grid item xs={3} md={3} style={{textAlign: 'right'}}>
          <Button className='dismiss-button' onClick={onDismiss} />
        </Grid>
      </Grid>

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="NEW" />
          <StyledBalance>
            <StyledValue>{displayTombBalance}</StyledValue>
            <Label color='normal' text="NEW DGTL" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="OLD" />
          <StyledBalance>
            <StyledValue>{displayTshareBalance}</StyledValue>
            <Label color='normal' text="OLD DGTL" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
      <Button color="primary" variant="contained" href={`https://bscscan.com/address/${wallet.account}`} style={{margin: '20px 0 0'}} target='_blank' className='buy-button'>
        View on Explorer
      </Button>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  // font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
