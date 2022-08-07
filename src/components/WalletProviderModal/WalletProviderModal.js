import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { Modal, List, Grid, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import coingBaseLogo from '../../assets/img/coinbase_logo.jpeg';
import { useWallet } from 'use-wallet';


const WalletProviderModal = ({ open, handleClose }) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={handleClose}
    >
      <div className='wallet-modal'>
        <Grid item xs={12} md={12} container style={{paddingBottom: '20px'}}>
          <Grid item xs={9} md={9} style={{fontSize: '20px'}}>Connect Wallet</Grid>
          <Grid item xs={3} md={3} style={{textAlign: 'right'}}>
            <Button className='dismiss-button' onClick={handleClose} />
          </Grid>
        </Grid>
        <List component="nav" aria-label="main mailbox folders" className='wallet-list'>
          <WalletCard
            icon={<img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} />}
            onConnect={() => {
              connect('injected');
            }}
            title="Metamask"
          />
          <Grid
            item
            xs={12}
            md={12}
            style={{ borderBottom: " 1px solid rgb(39, 92, 138)" }}
          ></Grid>
          <WalletCard
            icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{ height: 24 }} />}
            onConnect={() => {
              connect('walletconnect');
            }}
            title="WalletConnect"
          />
          <Grid
            item
            xs={12}
            md={12}
            style={{ borderBottom: " 1px solid rgb(39, 92, 138)" }}
          ></Grid>
          <WalletCard
            icon={<img src={coingBaseLogo} alt="Coinbase wallet logo" style={{ height: 32 }} />}
            onConnect={() => {
              connect('walletlink');
            }}
            title="Coinbase Wallet"
          />
        </List>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
