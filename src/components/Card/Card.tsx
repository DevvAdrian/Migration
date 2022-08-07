import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard className='styled-card'>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: #1b225f; //${(props) => props.theme.color.grey[800]};
  color: #fff !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 20px;
`;

export default Card;
