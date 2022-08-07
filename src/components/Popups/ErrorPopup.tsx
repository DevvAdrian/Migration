import React, { useCallback } from 'react';
import { AlertCircle } from 'react-feather';
import styled from 'styled-components';

const RowNoFlex = styled.div`
  flex-wrap: nowrap;
`;

export default function ErrorPopup({ message, stack }: { message: string; stack: string }) {
  const copyErrorDetails = useCallback(async () => {
    await navigator.clipboard.writeText(`${message}\n${stack}`);
  }, [message, stack]);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16, display: 'flex' }}>
        <AlertCircle color="#FF6871" size={24} />
        <StyledPopupDesc>{message}</StyledPopupDesc>
      </div>
      <div>
        <StyledLink onClick={copyErrorDetails} href="#">
          Copy error details
        </StyledLink>
      </div>
    </RowNoFlex>
  );
}

const StyledPopupDesc = styled.span`
  margin-left: 10px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.color.grey[100]};
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[200]};
`;
