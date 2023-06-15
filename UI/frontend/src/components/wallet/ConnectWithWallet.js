import React from "react";
import { AiFillWallet, AiOutlineWallet } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useProvider } from "../../hooks/useProvider";
import { toast } from "react-toastify";
import { setAccount, setAddress, setIsWalletConnected, setProvider, setSigner } from "../../store/slices/userInfo";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../constants/addresses";
import { CONTRACT_ABI } from "../../constants/abi";
import { batch } from "react-redux";
import { setTransferContract } from "../../store/slices/contractInfo";
import {useIsWalletConnected} from "../../hooks/useİsWalletConnected";

const ConnectWithWallet = () => {
  const dispatch = useDispatch();
  const provider = useProvider();
  const isWalletConnected = useIsWalletConnected();

  const connectWithWallet = async () => {
    try {
      if (!provider) {
        const { ethereum } = window;
        if (!ethereum) {
          toast.error(
            "Metamask yüklü değil, lütfen satın alma işlemleri için metamask eklentisini edinin!"
          );
          return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const transferContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );
        batch(() => {
          dispatch(setProvider(provider));
          dispatch(setTransferContract(transferContract));
        });
        toast.error("Lütfen metamask üzerinde oturum açınız!");
        return;
      }

      provider
        .send("eth_requestAccounts", [])
        .then((accounts) => dispatch(setAccount(accounts[0])))
        .catch((err) => console.log(err));

      const signer = provider.getSigner();
      const transferContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const address = await signer.getAddress();
      batch(() => {
        dispatch(setSigner(signer));
        dispatch(setAddress(address));
        dispatch(setTransferContract(transferContract));
        dispatch(setIsWalletConnected(true));
      });
      toast.success("Metamask cüzdanı başarıyla bağlandı!");
    } catch (error) {
      toast.error("Metamask cüzdanına bağlanılamadı!");
    }
  };


  const disconnectWallet = () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error(
        "Metamask yüklü değil, lütfen satın alma işlemleri için metamask eklentisini edinin!"
      );
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const transferContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );
    batch(() => {
        dispatch(setProvider(provider));
        dispatch(setSigner(null));
        dispatch(setAddress(null));
        dispatch(setAccount(null));
        dispatch(setTransferContract(transferContract));
        dispatch(setIsWalletConnected(false));
    })
    toast.success("Metamask cüzdanı bağlantısı başarıyla kesildi!");
  }

  return isWalletConnected ? (
    <li onClick={() => disconnectWallet()} className="cursor-pointer">
      Bağlı <AiFillWallet className="mx-2" size={24} />
    </li>
  ) : (
    <li onClick={() => connectWithWallet()} className="cursor-pointer">
      Bağlan <AiOutlineWallet className="mx-2" size={24} />
    </li>
  );
};

export default ConnectWithWallet;
