import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardContent from '../CardContent';
// import Container from '../Container';

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledContainer>
      <StyledModal>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </StyledModal>
    </StyledContainer>
  );
};

const StyledModal = styled.div`
  border-radius: 10px;
  position: relative;
`;

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 520px;
  padding: 0 20px;
  width: 100%;
`;

export default Modal;
