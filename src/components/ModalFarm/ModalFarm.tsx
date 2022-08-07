import React from 'react';
// import styled from 'styled-components';

// import Card from '../Card';
// import CardContent from '../CardContent';
// import Container from '../Container';

export interface ModalFarmProps {
  onDismiss?: () => void;
}

const ModalFarm: React.FC = ({ children }) => {
  return (
    // <Container size="sm">
    //   <StyledModalFarm>
    //     <Card>
    //       <CardContent>{children}</CardContent>
    //     </Card>
    //   </StyledModalFarm>
    // </Container>
    <div>{children}</div>
  );
};

// const StyledModalFarm = styled.div`
//   border-radius: 12px;
//   position: relative;
// `;

export default ModalFarm;
