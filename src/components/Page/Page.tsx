import React from 'react';
import { Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';
import Footer from '../Footer';
import Nav from '../Nav';
const Page: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <div>
      <Nav />
      <Container maxWidth="lg" style={{ paddingBottom: '5rem'}}>
        {children}
      </Container>
      <Footer/>
    </div>
  );
};

export default Page;
