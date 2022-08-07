import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
  size?: 'vs' | 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext<{ siteWidth: number }>(ThemeContext);
  let width: number;
  switch (size) {
    case 'vs':
      width = siteWidth / 4;
    case 'sm':
      width = siteWidth / 2;
      break;
    case 'md':
      width = (siteWidth * 2) / 3;
      break;
    case 'lg':
    default:
      width = siteWidth;
  }
  return <StyledContainer width={width}>{children}</StyledContainer>;
};

interface StyledContainerProps {
  width: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${(props) => props.width}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  width: 100%;
`;

export default Container;
