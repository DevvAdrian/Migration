import React, { useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import KANDY from '../../assets/img/tomb.png';
import BNB from '../../assets/img/avax.png';
import logo from '../../assets/img/logo.png';
import { Button } from '@material-ui/core';

import TwitterImage from '../../assets/img/twitter.svg';
import TelegramImage from '../../assets/img/telegram.svg';
import YoutubeImage from '../../assets/img/youtube.svg';
import FacebookImage from '../../assets/img/facebook.svg';
import InstagramImage from '../../assets/img/instagram.svg';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  ListItem,
  Divider,
  Grid,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AccountButton from './AccountButton';
import useTombStats from '../../hooks/useTombStats';
import useGetFtmPrice from '../../hooks/useGetFtmPrice';
import AccountButtonNav from './AccountButtonNav';
import Spacer from '../Spacer';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottom: `1px solid #415d9f`,
    padding: '10px',
    marginBottom: '25px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '60px',
    },
  },
  active: {
    color: 'white',
    textTransform: 'capitalize',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
  },
  activeSpider: {
    position: 'absolute',
    top: '50px',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  tokenPrice: {
    paddingTop: '16px',
    paddingLeft: '20px',
    fontSize: '16px',
    color: 'white',
  },
  activeSmallSpider: {
    position: 'absolute',
    top: '0',
    right: '10px',
    bottom: 0,
    margin: 'auto',
  },
  box: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '80%',
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: ' left bottom',
    backgroundColor: '#000',
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Amarante", cursive',
    fontSize: '30px',
    // flexGrow: 1,
  },
  link: {
    color: '#77a7ee',
    textTransform: 'capitalize',
    fontSize: '18px',
    margin: '0 20px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#fff !important',
    },
    '&:focus': {
      color: '#fff !important',
    },
  },
  mobileLink: {
    color: 'rgb(140, 159, 162)',
    textTransform: 'capitalize',
    fontSize: '16px',
    textDecoration: 'none',
    padding: "6px",
    '&:hover': {
      textDecoration: 'none',
      color: '#fff',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  brandLink: {
    display: 'flex',
    textDecoration: 'none',
    margin: '0 20px 0 0',
    color: '#fff',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  resLogo: {
    padding: '20px',
    display: 'grid',
    placeItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
    },
    // placeItems: "center",
  },
  blackBg: {
    borderRadius: '10px!important',
    backgroundColor: 'transparent',
    padding: '6px 10px',
    color: 'white!important',
    height: '46px',
    marginRight: '10px',
    fontFamily: "'Lean', sans-serif !important",
    fontSize: '16px',
    border: '1px solid #415d9f',
  },
  blackBgNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.09);',
    border: 'none',
    borderRadius: '10px!important',
    padding: '6px 10px ',
    margin: '10px 20px',
    color: 'white!important',
    height: '46px',
    fontFamily: "'Lean', sans-serif !important",
    fontSize: '16px',
    width: '100%',
    justifyContent: 'space-between',
  },
  img: {
    width: '24px',
    height: '24px',
  },
}));

const Nav = () => {

  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const tombStats = useTombStats();
  const tombPrice = useMemo(() => (tombStats ? Number(tombStats.priceInDollars).toFixed(3) : '-'), [tombStats]);
  const ftmStats = useGetFtmPrice();
  const ftmPrice = useMemo(() => (ftmStats ? ftmStats.toFixed(2) : '-'), [ftmStats]);

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={logo} alt="" width={60} height={60} style={{marginRight: '10px'}}/>
                <h5>DGTL MIGRATION</h5>
              </Link>
            </Typography>
            <Box className={classes.box}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* <div style={{ display: 'flex' }}>
                  <a color="textPrimary" href="https://digitalatto.com/" className={classes.link}>Home</a>
                </div> */}
                <Grid container className="price-buttons">
                  <Button className={classes.blackBg} disabled>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={KANDY} width="30px" alt="img"/>
                      &nbsp;&nbsp;
                      <span> ${tombPrice}</span>
                    </div>
                  </Button>
                  <Button className={classes.blackBg} disabled>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={BNB} width="30px" alt="img"/>
                      &nbsp;&nbsp; <span> ${ftmStats.toFixed(2)}</span>
                    </div>
                  </Button>
                </Grid>
              </div>
            </Box>
            <AccountButton text="Connect Wallet" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={logo} alt="" width={50} height={50} style={{marginRight: '10px'}}/>
                <h5>DGTL MIGRATION</h5>
              </Link>
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Link to="/" color="inherit" className={classes.resLogo}>
                <img src={logo} alt="" width={50} height={50}/>
                <h5>DGTL MIGRATION</h5>
              </Link>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AccountButtonNav text="Connect wallet" />
              </ListItem>
              <Spacer />
              {/* <a color="textPrimary" href="https://digitalatto.com/" style={{fontSize: '16px', marginTop: '10px'}} className={classes.link}>Home</a> */}
              <br/>
              <Divider />
              <div className={classes.tokenPrice}>TOKEN PRICE</div>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'center',
                  padding: '0px 0px',
                }}
              >
                <Button className={classes.blackBgNav} disabled>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={KANDY} width="36px" alt="img"/>
                    &nbsp;&nbsp;
                    <span> ${tombPrice}</span>
                  </div>
                </Button>
              </ListItem>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'center',
                  padding: '0px 0px',
                }}
              >
                <Button className={classes.blackBgNav} disabled>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={BNB} width="36px" alt="img"/>
                    &nbsp;&nbsp; <span> ${ftmPrice}</span>
                  </div>
                </Button>
              </ListItem>

              <Grid style={{ textAlign: 'center', marginTop: "12px" }}>
                <a href="https://www.facebook.com/Digitalatto-107486488347349" rel="noopener noreferrer" target="_blank" className={classes.mobileLink}>
                  <img alt="facebook" src={FacebookImage} className={classes.img} />
                </a>
                <a href="https://twitter.com/DigitalattoDGTL" rel="noopener noreferrer" target="_blank" className={classes.mobileLink}>
                  <img alt="twitter" src={TwitterImage} className={classes.img} />
                </a>
                <a href="https://www.instagram.com/digitalatto_dgtl/" rel="noopener noreferrer" target="_blank" className={classes.link}>
                  <img alt="instagram" src={InstagramImage} className={classes.img} />
                </a>
                <a href="https://t.me/digitalatto" rel="noopener noreferrer" target="_blank" className={classes.mobileLink}>
                  <img alt="telegram" src={TelegramImage} className={classes.img} />
                </a>
                <a href="https://www.youtube.com/channel/UC2RVsh5CNGhRk5_Oj8lfnlA" rel="noopener noreferrer" target="_blank" className={classes.mobileLink}>
                  <img alt="youtube" src={YoutubeImage} className={classes.img} />
                </a>
              </Grid>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
