import React from "react";
import styled from "styled-components";

import { Button } from "@material-ui/core";
import Input, { InputProps } from "../StakingInput";
import img from "../../assets/img/tshare.png";
interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
  symbolshow?: boolean;
  style?:{}
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  style,
  symbolshow = true,
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
            color: "rgb(255, 255, 255)",
          }}
        >
          Amount
        </p>
        <StyledMaxText>
          Balance: {max.toLocaleString()} {symbolshow ? symbol : ""}
        </StyledMaxText>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 20px",
          alignItems: "center",
          marginTop: "-20px",
          // justifyContent: 'center'
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
                    style={{zIndex: 'auto'}}
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
          style={style}
        />
      </div>
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
