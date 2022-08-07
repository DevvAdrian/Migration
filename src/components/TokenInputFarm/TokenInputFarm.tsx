import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import Input, { InputProps } from '../Input';

interface TokenInputFarmProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
  symbolshow?:boolean;
}

const TokenInputFarm: React.FC<TokenInputFarmProps> = ({ max, symbol, onChange, onSelectMax, value, symbolshow = true }) => {
  return (
    <Styledinput>
     {/*  <StyledMaxText>
        //Balance: {max.toLocaleString()} {symbolshow?symbol:''}
      </StyledMaxText>*/}
      <Input
        endAdornment={
          <div>
              {max > 0 && !value && <Button size="small" color="primary" variant="outlined" className='max-button' onClick={onSelectMax}>
                Max
              </Button>}
          </div>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />

    </Styledinput>
  );
};


const Styledinput = styled.div`
  border-radius: 15px;
  border: 1px solid #ada;
  background-color: #fff;
`;


export default TokenInputFarm;
