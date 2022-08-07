import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/tomb.png';
import tShareLogo from '../../assets/img/tshare.png';

// import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
// import tshareFtmLpLogo from '../../assets/img/tshare_ftm_lp.png';

import wftmLogo from '../../assets/img/avax.png';
import booLogo from '../../assets/img/blank.svg';
import zooLogo from '../../assets/img/zoo_logo.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  NEW: tombLogo,
  LAND: tShareLogo,
  KANDY: tombLogo,
  OLD: tShareLogo,
  WBNB: wftmLogo,
  BOO: booLogo,
  ZOO: zooLogo,
  // 'NEW-BNB-LP': tombFtmLpLogo,
  // 'OLD-BNB-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 52 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
