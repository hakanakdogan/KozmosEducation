import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {CiMenuBurger} from "react-icons/ci";
import {AiOutlineUser} from "react-icons/ai"
import {useDisplayName} from "../../hooks/useDisplayName";
import { batch, useDispatch } from 'react-redux';
import {setDisplayName, setEmail, setRole, setUsername, setId, setAddress, setProvider, setSigner, setAccount, setIsWalletConnected} from "../../store/slices/userInfo";
import CategoriesDropdown from './CategoriesDropdown';
import ConnectWithWallet from '../wallet/ConnectWithWallet';
import { setTransferContract } from '../../store/slices/contractInfo';
import { CONTRACT_ADDRESS } from '../../constants/addresses';
import { CONTRACT_ABI } from '../../constants/abi';
import { ethers } from 'ethers';

const StudentHeader = () => {
  const displayName = useDisplayName();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = () => {
    localStorage.removeItem("token");
    batch(() => {
      dispatch(setDisplayName(null));
      dispatch(setEmail(null));
      dispatch(setUsername(null));
      dispatch(setRole(null));
      dispatch(setId(null));
      dispatch(setAddress(null));
      dispatch(setSigner(null));
      dispatch(setAccount(null));
      dispatch(setIsWalletConnected(false));
    })

    const { ethereum } = window;
    if (!ethereum) {
      batch(() => {
        dispatch(setProvider(null));
        dispatch(setTransferContract(null));
      })
    }

    else {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const transferContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      batch(() => {
        dispatch(setProvider(provider));
        dispatch(setTransferContract(transferContract));
      })
    }

    navigate("/");
  }

  return (
    <>
    <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><Link to={"/"}>KozmosEdu</Link></h1>

      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <ConnectWithWallet />
          <CategoriesDropdown />

          <li className="cursor-pointer"><Link className="black" to="/courses">Tüm Kurslar</Link></li>
          
          <li className="dropdown cursor-pointer"><span className="mx-2">{displayName}</span> <AiOutlineUser size={24} />
            <ul>
              <Link className="black" to="/courses/attended"><li>Kurslarım</li></Link>
              <Link className="black" to="/user/me"><li>Profilim</li></Link>
              <Link className="black" to="/user/options"><li>Ayarlar</li></Link>
              <li onClick={() => exit()}>Çıkış Yap</li>
            </ul>
          </li>

        </ul>
        <CiMenuBurger className="mobile-nav-toggle"></CiMenuBurger>
      </nav>

    </div>
  </header>
  </>
  )
}

export default StudentHeader