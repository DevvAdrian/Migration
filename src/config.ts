import { ChainId } from '@pancakeswap/sdk';
import { Configuration } from './tomb-finance/config';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.TESTNET,
    networkName: 'BSC Testnet',
    ftmscanUrl: 'https://testnet.bscscan.com',
    defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WBNB: ['0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18],
      BUSD: ['0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7', 18],
      'BUSD-BNB-LP': ['0xe0e92035077c39594793e61802a350347c320cf2', 18],
      'NEW-BNB-LP': ['0x20B5865c6c102320091cc7C95FB58cE575e2F035', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      'BUSD-BNB-LP': ['0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 18],
      'NEW-BNB-LP': ['0x1bDE5daa50deD1C07192E07cadB6f081158ce85A', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export default configurations['production'];
