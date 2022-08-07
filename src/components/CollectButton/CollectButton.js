import React, { useEffect, useMemo, useState } from 'react';
import { Button/*, Grid, Typography, Link*/ } from '@material-ui/core';
import btnImg from '../../assets/img/btn.png'
import TokenSymbol from '../TokenSymbol';
import usePoolUserInfo from '../../hooks/usePoolUserInfo';
import usePoolCollect from '../../hooks/usePoolCollect';

const CollectButton = () => {
  const [show, toggleShow] = useState(false)
  const [ balanceflg, setbalanceflg ] = useState(false);
  const PoolUserInfo = usePoolUserInfo();
  const { onPoolCollect } = usePoolCollect();

  const xTokenBalance = useMemo(() => (PoolUserInfo ? new Intl.NumberFormat("en-US", {
                                                                                maximumFractionDigits: 3,
                                                                                minimumFractionDigits: 0,
                                                                            }).format(Number(PoolUserInfo.xTokenBalance/1e18)) : null), [PoolUserInfo]);
  const yTokenBalance = useMemo(() => (PoolUserInfo ? new Intl.NumberFormat("en-US", {
                                                                                maximumFractionDigits: 3,
                                                                                minimumFractionDigits: 0,
                                                                            }).format(Number(PoolUserInfo.yTokenBalance/1e18)) : null), [PoolUserInfo]);
  const ethBalance = useMemo(() => (PoolUserInfo ? new Intl.NumberFormat("en-US", {
                                                                                maximumFractionDigits: 3,
                                                                                minimumFractionDigits: 0,
                                                                            }).format(Number(PoolUserInfo.ethBalance/1e18)) : null), [PoolUserInfo]);
  useEffect(() => {
    if(xTokenBalance==null || yTokenBalance==null || ethBalance==null) return;

    if(xTokenBalance > 0 || yTokenBalance > 0 || ethBalance > 0){
      toggleShow(true);
      setbalanceflg(true);
    }
    else{
      toggleShow(false);
      setbalanceflg(false);
    }
  }, [xTokenBalance, yTokenBalance, ethBalance]);



  return (
    <div className={balanceflg ? 'collectbutton-show' : 'collectbutton-hide'}>
      <div className={ (show || (!show&&!balanceflg)) ? 'collect-msg-show' : 'collect-msg-hide'}>
        You have some unclaimed tokens!
      </div>
      <div className={show ? 'collect-btn-show' : 'collect-btn-hide'}>
        <div className={show ? 'iOsgBg' : 'iOdgBg'}></div>
        <div className={show ? 'glsbck' : 'gldbck'}></div>
        <Button onClick={() => toggleShow(!show)}>
          <img src={btnImg} width='28px' alt="img"></img>
        </Button>
      </div>
      <div className={show ? 'collect-pannel-show' : 'collect-pannel-hide'}>
        <button className='collect-pannel-xbtn' onClick={() => toggleShow(!show)}></button>
        <div className='collect-pannel-item'>
          <TokenSymbol symbol={'WBNB'} size={32} />
          {ethBalance?ethBalance===0?'0':ethBalance:'-'}
          <span>BNB</span>
        </div>
        <div className='collect-pannel-item'>
          <TokenSymbol symbol={'OLD'} size={32} />
          {yTokenBalance?yTokenBalance===0?'0':yTokenBalance:'-'}
          <span>KANDY</span>
        </div>
        <div className='collect-pannel-item'>
          <TokenSymbol symbol={'NEW'} size={32} />
          {xTokenBalance?xTokenBalance===0?'0':xTokenBalance:'-'}
          <span>LAND</span>
        </div>
        <Button onClick={onPoolCollect} className='collect-button'>Collect</Button>
      </div>
    </div>
  );
};

export default CollectButton;
