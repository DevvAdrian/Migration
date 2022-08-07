import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link } from '@material-ui/core';
import TwitterImage from '../../assets/img/twitter.svg';
import TelegramImage from '../../assets/img/telegram.svg';
import YoutubeImage from '../../assets/img/youtube.svg';
import FacebookImage from '../../assets/img/facebook.svg';
import InstagramImage from '../../assets/img/instagram.svg';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    height: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      // display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" align="left">
              {'Copyright © '}
              <Link color="inherit" href="/">
                DGTL Migartion
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <a href="https://www.facebook.com/Digitalatto-107486488347349" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="facebook" src={FacebookImage} className={classes.img} />
            </a>
            <a href="https://twitter.com/DigitalattoDGTL" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="twitter" src={TwitterImage} className={classes.img} />
            </a>
            <a href="https://www.instagram.com/digitalatto_dgtl/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="instagram" src={InstagramImage} className={classes.img} />
            </a>
            <a href="https://t.me/digitalatto" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="telegram" src={TelegramImage} className={classes.img} />
            </a>
            <a href="https://www.youtube.com/channel/UC2RVsh5CNGhRk5_Oj8lfnlA" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="youtube" src={YoutubeImage} className={classes.img} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
