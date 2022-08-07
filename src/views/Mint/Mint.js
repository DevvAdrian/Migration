import React, { useState, useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { useWallet } from 'use-wallet';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TokenInput from '../../components/TokenInput';
import useTombFinance from '../../hooks/useTombFinance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useMigrate from '../../hooks/useMigrate';
import useSwapFee from '../../hooks/useSwapFee';
import useSwapEnabled from '../../hooks/useSwapEnabled';
import useTotalMigrated from '../../hooks/useTotalMigrated';
import useUserInfo from '../../hooks/useUserInfo';
import useApprove, { ApprovalState } from '../../hooks/useApprove';

import { getDisplayBalance } from '../../utils/formatBalance';
// import HomeImage from '../../assets/img/background.jpeg';
import NewTokenImg from '../../assets/img/tomb.png';
import OldTokenImg from '../../assets/img/logo.png';
import { white, red1 } from '../../theme/colors';
import WalletProviderModal from '../../components/WalletProviderModal';


const BackgroundImage = createGlobalStyle`
  body {
    background-color: #0b114c;
    background-image: radial-gradient(circle at left 60%,rgba(20,44,255,.4),rgba(20,44,255,0),rgba(20,44,255,0),rgba(20,44,255,0)),radial-gradient(circle at right 60%,rgba(20,44,255,.4),rgba(20,44,255,0),rgba(20,44,255,0),rgba(20,44,255,0));
    background-attachment: fixed;
  }
`;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Mint = () => {

  const [tokenAmount, setTokenAmount] = useState();
  const [color, setColor] = useState(white);
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  const { balance, account } = useWallet();

  const tombFinance = useTombFinance();
  const newTokenBalance = useTokenBalance(tombFinance.NEW);
  const oldTokenBalance = useTokenBalance(tombFinance.OLD);
  const { Migration } = tombFinance.contracts;
  const [approveStatus, approve] = useApprove(tombFinance.OLD, Migration.address); 
  const { onMigrate } = useMigrate();
  
  const swapFee = useSwapFee();
  const swapEnabled = useSwapEnabled();
  const totalMigrated = useTotalMigrated();
  const userinfo = useUserInfo();
  const allowedamount = useMemo(() => (userinfo ? String(userinfo.amount) : 0), [userinfo]);
  const wl = useMemo(() => (userinfo ? userinfo.iswl : false), [userinfo]);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };
  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  
  const bnbBalance = balance;
  

  const handleChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setTokenAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)){
      setTokenAmount(0);
      return;
    } 
    setTokenAmount(e.currentTarget.value);

    if(e.currentTarget.value>(Number(oldTokenBalance)/ 1e10)){
      setColor(red1)
    }
    else{
      setColor(white)
    }    
  };

  const handleSelectMax = async () => {
    setColor(white)
    setTokenAmount(new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 10,
        minimumFractionDigits: 0,
    }).format(Number(getDisplayBalance(oldTokenBalance, 10, 2))));
  };

  return (
    <Page>
      <BackgroundImage />
      <Grid container justify="center">
        <Box className='Boxes'>
          <Typography color="textPrimary" className='redeem' align="left" variant="h5" gutterBottom>
            Swap to new DGTL
          </Typography>
          {(!wl || !swapEnabled) ?
            <Alert  variant="filled" severity="warning" style={{marginBottom: "10px"}}>
              {swapEnabled ? 'YOU ARE NOT QUALIFIED' :  'Swap is not available at the moment'}
            </Alert>
            :
            <Alert  variant="filled" severity="success" style={{marginBottom: "10px"}}>
              YOU ARE QUALIFIED
            </Alert>
          }
          <Grid item xs={12} sm={12}>
            <Paper style={{ borderRadius: 18 }}>
              <Box style={{backgroundColor:'transparent'}}>
                <Grid className='boxes' item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box style={{padding: '15px 15px 18px'}}>
                    <Grid container className='redeem-content'>
                      <Grid className='inputbox' item xs={12}>
                        <TokenInput
                          onSelectMax={handleSelectMax}
                          onChange={handleChange}
                          value={tokenAmount || ''}
                          max={getDisplayBalance(oldTokenBalance, 10, 2)}
                          symbol={'OLD DGTL'}
                          images={OldTokenImg}
                          disabled={false} 
                          style={{color:color}}
                        />
                      </Grid>
                      <Grid align="center" item xs={12} style={{ margin: 20 }}>
                        <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="m13.368 9.724-6.684 5.968L0 9.724h13.368zm0-9.724L6.684 5.968 0 0h13.368z" fill="#FFF" fillRule="evenodd" />
                        </svg>
                      </Grid>
                      <Grid className='inputbox nd' item xs={12}>
                        <TokenInput
                          onSelectMax={handleSelectMax}
                          onChange={handleChange}
                          value={tokenAmount || ''}
                          max={getDisplayBalance(newTokenBalance, 9, 2)}
                          symbol={'NEW DGTL'}
                          images={NewTokenImg}
                          disabled={true}
                          style={{color:color}}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} className="content">
                        {/* <p>Swap Fee</p> */}
                        <p>Allowed Amount</p>
                        <p>Total Swaped Amount</p>
                      </Grid>
                      <Grid item xs={6} sm={6} className="content" style={{ textAlign: 'right'}}>
                        {/* <p>{swapFee} BNB</p> */}
                        <p>{new Intl.NumberFormat("en-US", {
                                  maximumFractionDigits: 6,
                                  minimumFractionDigits: 0,
                              }).format(allowedamount/1e10)} OLD DGTL</p>
                        <p>{new Intl.NumberFormat("en-US", {
                                  maximumFractionDigits: 6,
                                  minimumFractionDigits: 0,
                              }).format(totalMigrated)} OLD DGTL</p>
                      </Grid>
                      <Grid item xs={12} justifycontent="center" style={{ textAlign: 'center' }}>
                        { account ?
                          approveStatus !== ApprovalState.APPROVED ?
                          <Button
                            disabled={
                              approveStatus === ApprovalState.PENDING ||
                              approveStatus === ApprovalState.UNKNOWN
                            }
                            onClick={approve}
                            color="primary"
                            variant="contained"
                            className='wallectButton'
                          >
                            {`Approve Old DGTL`}
                          </Button>
                        :
                          <Button
                            variant="contained"
                            onClick={() => onMigrate(tokenAmount)}
                            disabled={Number(tokenAmount) > Number(oldTokenBalance / 1e10) || Number(tokenAmount) > Number(allowedamount / 1e10)  || Number(oldTokenBalance) <= 0 || Number(tokenAmount)===0 || !tokenAmount || swapFee > Number(bnbBalance) / 1e18 || !wl || !swapEnabled}
                            color="primary"
                            className='wallectButton'
                          >
                            { Number(tokenAmount) > Number(oldTokenBalance / 1e10) ? "Insufficient Old DGTL Balance" : Number(tokenAmount) > Number(allowedamount / 1e10) ? "You Exceed Allowed Amount" : (swapFee > Number(bnbBalance) / 1e18) ? "Insufficient BNB Balance For Swap Fee" : (Number(tokenAmount)===0 || !tokenAmount) ? "Input Amount" :  (!wl || !swapEnabled) ? "Swap is not allowed" : "Swap"}
                          </Button>
                        :
                          <Button
                            variant="contained"
                            onClick={handleWalletProviderOpen}
                            color="primary"
                            className='wallectButton'
                          >
                            Connect Wallet
                          </Button> 
                        }
                          <WalletProviderModal
                            open={isWalletProviderOpen}
                            handleClose={handleWalletProviderClose}
                          />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default Mint;
