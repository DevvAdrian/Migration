import { Fetcher, Route, Token } from '@pancakeswap/sdk';
import { Configuration } from './config';
import { TokenStat, LPStat, UserInfo } from './types';
import { BigNumber, Contract, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getBalance, getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import config from '../config';
import { parseUnits, formatEther } from 'ethers/lib/utils';
// import MintModal from '../views/Mint/MintModal';
// import { faThList } from '@fortawesome/free-solid-svg-icons';
/**
 * An API module of DGTL Migartion contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class TombFinance {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  masonryVersionOfUser?: string;

  NEWWBNB_LP: Contract;
  NEW: ERC20;
  OLD: ERC20;
  BNB: ERC20;
  CollectFlg: string;
  CollectedFlg: string;
  TsFailFlg: boolean;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal);
    }
    this.NEW = new ERC20(deployments.new.address, provider, 'NDGTL', 9);
    this.OLD = new ERC20(deployments.old.address, provider, 'ODGTL', 10);
    this.BNB = this.externalTokens['WBNB'];

    // Uniswap V2 Pair
    this.NEWWBNB_LP = new Contract(externalTokens['NEW-BNB-LP'][0], IUniswapV2PairABI, provider);

    this.config = cfg;
    this.provider = provider;
    this.CollectFlg = "NO";
    this.CollectedFlg = "NO";
    this.TsFailFlg = false;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.NEW, this.OLD, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.NEWWBNB_LP = this.NEWWBNB_LP.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  ResetCollectFlg() {
    this.CollectFlg = "YES";
    return ;
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  //===================================================================
  //===================== GET ASSET STATS =============================
  //===================FROM SPOOKY TO DISPLAY =========================
  //=========================IN HOME PAGE==============================
  //===================================================================

  async getTombStat(): Promise<TokenStat> {
    const supply = await this.NEW.totalSupply();
    const tombCirculatingSupply = supply;
    const priceInBNB = await this.getTokenPriceFromPancakeswap(this.NEW);
    const priceOfOneBNB = await this.getWBNBPriceFromPancakeswap();
    const priceOfTombInDollars = (Number(priceInBNB) * Number(priceOfOneBNB)).toFixed(18);

    return {
      tokenInFtm: priceInBNB,
      priceInDollars: priceOfTombInDollars,
      totalSupply: getDisplayBalance(supply, this.NEW.decimal, 0),
      circulatingSupply: getDisplayBalance(tombCirculatingSupply, this.NEW.decimal, 0),
    };
  }

  /**
   * Calculates various stats for the requested LP
   * @param name of the LP token to load stats for
   * @returns
   */
  async getLPStat(name: string): Promise<LPStat> {
    const lpToken = this.externalTokens[name];
    const lpTokenSupplyBN = await lpToken.totalSupply();
    const lpTokenSupply = getDisplayBalance(lpTokenSupplyBN, 18);
    const token0 = name.startsWith('NEW') ? this.NEW : this.OLD;
    const isTomb = name.startsWith('NEW');
    const tokenAmountBN = await token0.balanceOf(lpToken.address);
    const tokenAmount = getDisplayBalance(tokenAmountBN, 18);

    const ftmAmountBN = await this.BNB.balanceOf(lpToken.address);
    const ftmAmount = getDisplayBalance(ftmAmountBN, 18);
    const tokenAmountInOneLP = Number(tokenAmount) / Number(lpTokenSupply);
    const ftmAmountInOneLP = Number(ftmAmount) / Number(lpTokenSupply);
    const lpTokenPrice = await this.getLPTokenPrice(lpToken, token0, isTomb);
    const lpTokenPriceFixed = Number(lpTokenPrice).toFixed(18).toString();
    const liquidity = (Number(lpTokenSupply) * Number(lpTokenPrice)).toFixed(2).toString();
    return {
      tokenAmount: tokenAmountInOneLP.toString(),
      ftmAmount: ftmAmountInOneLP.toString(),
      priceOfOne: lpTokenPriceFixed,
      totalLiquidity: liquidity,
      totalSupply: Number(lpTokenSupply).toFixed(2).toString(),
    };
  }

  /**
   * @returns TokenStat for OLD
   * priceInBNB
   * priceInDollars
   * TotalSupply
   * CirculatingSupply (always equal to total supply for bonds)
   */
  async getShareStat(): Promise<TokenStat> {
    const supply = await this.OLD.totalSupply();

    return {
      tokenInFtm: '0',
      priceInDollars: '0',
      totalSupply: getDisplayBalance(supply, this.OLD.decimal, 0),
      circulatingSupply: '0',
    };
  }

  /**
   * Calculates the price of an LP token
   * Reference https://github.com/DefiDebauchery/discordpricebot/blob/4da3cdb57016df108ad2d0bb0c91cd8dd5f9d834/pricebot/pricebot.py#L150
   * @param lpToken the token under calculation
   * @param token the token pair used as reference (the other one would be BNB in most cases)
   * @param isTomb sanity check for usage of tomb token or tShare
   * @returns price of the LP token
   */
  async getLPTokenPrice(lpToken: ERC20, token: ERC20, isTomb: boolean): Promise<string> {
    const totalSupply = await lpToken.totalSupply();
    //Get amount of tokenA
    const tokenSupply = await token.balanceOf(lpToken.address);
    const stat = isTomb === true ? await this.getTombStat() : await this.getShareStat();
    const priceOfToken = stat.priceInDollars;
    const tokenInLP = Number(tokenSupply) / Number(totalSupply) / Math.pow(10, token.decimal) * Math.pow(10, lpToken.decimal);
    const tokenPrice = (Number(priceOfToken) * tokenInLP * 2) //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total
      .toString();
    return tokenPrice;
  }


  async getTokenPriceFromPancakeswap(tokenContract: ERC20): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { chainId } = this.config;
    const { WBNB } = this.config.externalTokens;
    const wbnb = new Token(chainId, WBNB[0], WBNB[1], 'WBNB');
    const token = new Token(chainId, tokenContract.address, tokenContract.decimal, 'DGTL');
    try {
      const wbnbToToken = await Fetcher.fetchPairData(wbnb, token, this.provider);
      const priceInBUSD = new Route([wbnbToToken], token);
      return priceInBUSD.midPrice.toFixed(10);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  // async getTokenPriceFromSpiritswap(tokenContract: ERC20): Promise<string> {
  //   const ready = await this.provider.ready;
  //   if (!ready) return;
  //   const { chainId } = this.config;

  //   const { WBNB } = this.externalTokens;

  //   const wftm = new TokenSpirit(chainId, WBNB.address, WBNB.decimal);
  //   const token = new TokenSpirit(chainId, tokenContract.address, tokenContract.decimal, tokenContract.symbol);
  //   try {
  //     const wftmToToken = await FetcherSpirit.fetchPairData(wftm, token, this.provider);
  //     const liquidityToken = wftmToToken.liquidityToken;
  //     let ftmBalanceInLP = await WBNB.balanceOf(liquidityToken.address);
  //     let ftmAmount = Number(getFullDisplayBalance(ftmBalanceInLP, WBNB.decimal));
  //     let shibaBalanceInLP = await tokenContract.balanceOf(liquidityToken.address);
  //     let shibaAmount = Number(getFullDisplayBalance(shibaBalanceInLP, tokenContract.decimal));
  //     const priceOfOneFtmInDollars = await this.getWBNBPriceFromPancakeswap();
  //     let priceOfShiba = (ftmAmount / shibaAmount) * Number(priceOfOneFtmInDollars);
  //     return priceOfShiba.toString();
  //   } catch (err) {
  //     console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
  //   }
  // }

  async getWBNBPriceFromPancakeswap(): Promise<string> {
    const ready = await this.provider.ready;
    if (!ready) return;
    const { WBNB, BUSD } = this.externalTokens;
    try {
      const busd_wftm_lp_pair = this.externalTokens['BUSD-BNB-LP'];
      let ftm_amount_BN = await WBNB.balanceOf(busd_wftm_lp_pair.address);
      let ftm_amount = Number(getBalance(ftm_amount_BN, WBNB.decimal));
      let busd_amount_BN = await BUSD.balanceOf(busd_wftm_lp_pair.address);
      let busd_amount = Number(getBalance(busd_amount_BN, BUSD.decimal));
      return (busd_amount / ftm_amount).toString();
    } catch (err) {
      console.error(`Failed to fetch token price of WBNB: ${err}`);
    }
  }


  async watchAssetInMetamask(assetName: string): Promise<boolean> {
    const { ethereum } = window as any;
    const host = window.location.origin;
    if (ethereum && ethereum.networkVersion === config.chainId.toString()) {
      let asset;
      let assetUrl;
      if (assetName === 'NEW') {
        asset = this.NEW;
        assetUrl = `${host}/tomb.png`;
      } else if (assetName === 'OLD') {
        asset = this.OLD;
        assetUrl = `${host}/tshare.png`;
      }
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: asset.address,
            symbol: asset.symbol,
            decimals: 18,
            image: assetUrl,
          },
        },
      });
    }
    return true;
  }

  async provideTombFtmLP(ftmAmount: string, tombAmount: BigNumber): Promise<TransactionResponse> {
    const { TaxOffice } = this.contracts;
    let overrides = {
      value: parseUnits(ftmAmount, 18),
    };
    return await TaxOffice.addLiquidityETHTaxFree(tombAmount, tombAmount.mul(992).div(1000), parseUnits(ftmAmount, 18).mul(992).div(1000), overrides);
  }

  async migrate(oldAmount: string): Promise<TransactionResponse> {
    const { Migration } = this.contracts;
    const swapFee = await Migration.swapFee();
    console.log('log->swapfee', swapFee.toString())
    console.log('log->swapfee', oldAmount)
    return await Migration.migrate( parseUnits(String(oldAmount), 10) , {value: swapFee} );
  }
 
  async quoteFromSpooky(tokenAmount: string, tokenName: string): Promise<string> {
    const { DexRouter } = this.contracts;
    const { _reserve0, _reserve1 } = await this.NEWWBNB_LP.getReserves();
    let quote;
    if (tokenName === 'NEW') {
      quote = await DexRouter.quote(parseUnits(tokenAmount), _reserve1, _reserve0);
    } else {
      quote = await DexRouter.quote(parseUnits(tokenAmount), _reserve0, _reserve1);
    }
    return (quote / 1e18).toString();
  }

  async getSwapFee(): Promise<string> {
    const { Migration } = this.contracts;
    const swapFee = await Migration.swapFee();
    return formatEther(swapFee);
  }

  async getSwapStatus(): Promise<boolean> {
    const { Migration } = this.contracts;
    const status = await Migration.swapEnabled();
    return status;
  }

  async getTotalMigrated(): Promise<string> {
    const { Migration } = this.contracts;
    const totalNum = await Migration.totalMigrationed();
    return getDisplayBalance(totalNum, 10, 2);
  }

  async getUserInfo(): Promise<UserInfo> {
    const { Migration } = this.contracts;
    const userinfo = await Migration.userinfo(this.myAccount);
    return {
      iswl: userinfo.isWL,
      amount: userinfo.amount,
    };
  }
}
