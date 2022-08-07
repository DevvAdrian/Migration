import React from 'react';

import styled from 'styled-components';

interface ValueProps {
  value: string;
}

const Value: React.FC<ValueProps> = ({ value }) => {
  return <StyledValue>{value}</StyledValue>;
};

const StyledValue = styled.div`
  font-size: 15px;
  // font-weight: 600;
`;

export default Value;
