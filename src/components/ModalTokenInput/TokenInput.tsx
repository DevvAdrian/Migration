import React from "react";
import styled from "styled-components";

import { Button, Grid } from "@material-ui/core";
import Input, { InputProps } from "../StakingInput";
import img from "../../assets/img/tshare.png";
import TokenSymbol from '../TokenSymbol';
import { BigNumber } from 'ethers';
import { getDisplayBalance, getFullDisplayBalance } from '../../utils/formatBalance'

interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
  symbolshow?: boolean;
  claimableBalance: BigNumber;
  earnedBalance: BigNumber;
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  symbolshow = true,
  claimableBalance,
  earnedBalance
}) => {
  return (
    <StyledTokenInput>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px",
        }}
      >
        <p
          style={{
            textAlign: "left",
            fontSize: "14px",
            color: "rgb(255, 255, 255)"
          }}
        >
          Amount
        </p>
        <StyledMaxText>
          Max Claimable: {max.toLocaleString()} {symbolshow ? symbol : ""}
        </StyledMaxText>
      </div>
      <div
        style={{
          display: "flex",
          margin: "10px 20px",
          alignItems: "center",
          background: '#fff',
          border: '1px solid #ada',
          borderRadius: '20px',
          paddingLeft: '15px'
        }}
      >
        <img src={img} width="30px" height="30px" alt="img"/>
        <Input
          endAdornment={
            <StyledTokenAdornmentWrapper>
              {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
              <StyledSpacer />

              <div>
                {max > 0 && !value && (
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    className="max-button"
                    onClick={onSelectMax}
                  >
                    Max
                  </Button>
                )}
              </div>
            </StyledTokenAdornmentWrapper>
          }
          onChange={onChange}
          placeholder="0"
          value={value}
        />
      </div>
      <Grid
        xs={12}
        md={12}
        style={{ borderBottom: " 1px dotted rgb(39, 92, 138)", padding: '10px 0' }}
      ></Grid>
      <Grid container justify="center" style={{padding: '0px 20px 10px', fontSize: '14px', display: 'flex', alignItems: 'center'}}>
        <Grid xs={8} md={8} style={{padding: '15px 0 0'}}>
          Released LAND(vested, Staked)
        </Grid>
        <Grid  xs={4} md={4} style={{padding: '15px 0 0', justifyContent: 'end', display: 'flex'}}>
          {new Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 0,
                    }).format(Number(getDisplayBalance(claimableBalance)))} LAND
        </Grid>
        <Grid xs={8} md={8} style={{padding: '15px 0 0'}}>
          Vesting LAND
        </Grid>
        <Grid  xs={4} md={4} style={{padding: '15px 0 0', justifyContent: 'end', display: 'flex'}}>
          {new Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 0,
                    }).format(Number(getDisplayBalance(earnedBalance)))} LAND
        </Grid>
        <Grid xs={8} md={8} style={{padding: '15px 0 0'}}>
          Early Claimed Penalty
        </Grid>
        <Grid  xs={4} md={4} style={{padding: '15px 0 0', justifyContent: 'end', display: 'flex'}}>
          {Number(value) > Number(getFullDisplayBalance(claimableBalance)) ? `-${
            new Intl.NumberFormat("en-US", {
              maximumFractionDigits: 3,
              minimumFractionDigits: 0,
          }).format(Number(value) - Number(getFullDisplayBalance(claimableBalance)))}`
            :
            0
          } LAND
        </Grid>
        <Grid xs={8} md={8} style={{padding: '15px 0 0', display: 'flex', alignItems: 'center'}}>
          You Will Receive
        </Grid>
        <Grid  xs={4} md={4} container style={{ display: "flex", alignItems: "center", justifyContent: 'end', paddingTop: '15px' }}>
          <TokenSymbol symbol={"OLD"} size={24}></TokenSymbol>
            <span style={{ padding: '0 5px', fontSize: '20px', color: '#ffeb3b'}}>
              {Number(value)}</span>
        </Grid>
      </Grid>
    </StyledTokenInput>
  );
};

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`
  width: 100%;
  background-color: #45583a9c;
  border-radius: 15px;
  border: 1px solid #ada;
`;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledTokenAdornmentWrapper = styled.div`
  // align-items: center;
  display: flex;
  flexdirection: column;
`;

const StyledMaxText = styled.div`
  // align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  // display: flex;
  font-size: 14px;
  // height: 44px;
  // justify-content: flex-end;
`;

export default TokenInput;
