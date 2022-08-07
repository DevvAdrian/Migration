import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useWallet } from "use-wallet";
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../WalletProviderModal";
import AccountModal from "./AccountModal";
// import walletConnect from "../../assets/img/wallet-connect1.svg";

interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  const buttonText = text ? text : "Unlock";

  return (
    <div>
      {!account ? (
        <Button
          onClick={handleWalletProviderOpen}
          className='buy-button'
          variant="contained"
          style={{backgroundColor:'transparent', padding:'10px'}}
        >
          {/* <img src={walletConnect} alt="" /> &nbsp;&nbsp; */}
          {buttonText}
        </Button>
      ) : (
        <Button variant="contained" onClick={onPresentAccountModal} className='mywallet-button' color="primary">
          {`${account.substring(0, 5)}...${account.substring(account.length - 4)}`}
        </Button>
      )}

      <WalletProviderModal
        open={isWalletProviderOpen}
        handleClose={handleWalletProviderClose}
      />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
